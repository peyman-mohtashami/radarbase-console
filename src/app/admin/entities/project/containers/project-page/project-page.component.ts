import {Component, effect, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';

import { DialogMode } from '../../../../enums/dialog';
import {AppProject} from "../../models/project";
import { AppOrganization } from "../../../organization/models/organization";
import {PermissionDirective} from "../../../../../core/auth/directives/show-if-has-role.directive";
import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {filter, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ROLES} from "../../../../../shared/enums/roles";
import {ActionsComponent} from '../../components/actions/actions.component';
import {ProjectConfigService} from '../../services/project-config.service';
import {ProjectDialogService} from '../../services/project-dialog.service';
import {MatButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {MatPrefix} from '@angular/material/input';
import {ENTITY_REGISTRY} from "../../../../../shared/consts/entity-registry";
import {TabLink} from "../../../../models/tab-link";
import {AppSourceType} from "../../../source-type/models/source-type";

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  imports: [
    PermissionDirective,
    MatTabNav,
    MatTabLink,
    RouterLink,
    MatTabNavPanel,
    RouterOutlet,
    ActionsComponent,
    MatButton,
    MatPrefix,
    TranslatePipe,
  ]
})
export class ProjectPageComponent implements OnInit, OnDestroy {
  private configService = inject(ProjectConfigService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private dialogService = inject(ProjectDialogService);

  protected readonly DialogMode = DialogMode;
  protected readonly ROLES = ROLES;
  protected readonly ENTITY_REGISTRY = ENTITY_REGISTRY;

  entityName = this.configService.getEntityMetadata().name;

  entity = signal<AppProject>(this.activatedRoute.snapshot.data['project']);
  projectFullList: AppProject[] = this.activatedRoute.snapshot.data['projectFullList'];
  organizationFullList: AppOrganization[] = this.activatedRoute.snapshot.data['organizationFullList'];
  sourceTypeFullList: AppSourceType[] = this.activatedRoute.snapshot.data['sourceTypeFullList'];

  tableFields = this.configService.getTableFields();

  links: TabLink[] = [
    { path: 'subjects', label: `ADMIN.${ENTITY_REGISTRY.subject.name}.title.plural` },
    { path: 'groups', label: `ADMIN.${ENTITY_REGISTRY.group.name}.title.plural` },
    { path: 'sources', label: `ADMIN.${ENTITY_REGISTRY.source.name}.title.plural` },
    { path: 'app-config', label: `ADMIN.${ENTITY_REGISTRY.appConfig.name}.title.plural` },
    { path: 'protocols', label: `ADMIN.${ENTITY_REGISTRY.protocol.name}.title.plural` },
    { path: 'users', label: `ADMIN.${ENTITY_REGISTRY.permission.name}.title.plural`},
    { path: 'details', label: `ADMIN.${this.entityName}.details` },
  ];

  activePath?: string;

  hasChildren = !!this.activatedRoute.firstChild?.firstChild?.snapshot?.params?.['id'];

  private _destroy$: Subject<void> = new Subject<void>();

  constructor() {
    this.initializeDialogEffect();
  }

  ngOnInit(): void {
    // if (this.sourceTypes.find(sourceType => sourceType._name === '') === undefined &&) {

    // }

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this._destroy$)
    ).subscribe(() => {
      this.hasChildren = !!this.activatedRoute.firstChild?.firstChild?.snapshot.params['id'];
    });

    this.handleDialogUrlFragment();
    this.activePath = this.activatedRoute.firstChild?.snapshot?.url?.[0]?.path;
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private initializeDialogEffect() {
    effect(() => {
      const updated = this.dialogService.dialogUpdateEvent();
      if (updated) {
        switch (updated.mode) {
          case DialogMode.EDIT:
            if (updated?.entity) {
              this.entity.set(updated.entity);
              this.navigateOnUpdateSuccess(updated.entity);
            }
            break;
          case DialogMode.DELETE:
            this.navigateOnDeleteSuccess();
            break;
        }
      }
    })
  }

  private handleDialogUrlFragment() {
    this.activatedRoute.fragment
      .pipe(takeUntil(this._destroy$))
      .subscribe(fragment => {
        if (fragment) this.processUrlFragment(fragment);
      });
  }

  private processUrlFragment(fragment: string) {
    const [_, action, entityType] = fragment.split('/');
    if (entityType === this.entityName) {
      switch(action) {
        case 'edit':
          this.dialogService.openDialog(DialogMode.EDIT, {entity: this.entity(), entities: this.projectFullList, organizations: this.organizationFullList, sourceTypes: this.sourceTypeFullList});
          break;
        case 'delete':
          this.dialogService.openDialog(DialogMode.DELETE, {entity: this.entity(), entities: this.projectFullList, organizations: this.organizationFullList, sourceTypes: this.sourceTypeFullList});
      }
    }
  }

  navigateOnUpdateSuccess(entity: AppProject) {
    this.router
      .navigate(['/admin', 'projects', entity.projectName, 'subjects'])
      .then();
  }

  navigateOnDeleteSuccess() {
    this.router.navigate(['/admin', 'organizations']).then();
  }
}
