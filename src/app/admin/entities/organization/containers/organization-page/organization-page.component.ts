import {Component, effect, inject, OnDestroy, OnInit, signal, untracked} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';

import {AppOrganization} from "../../models/organization";
import {DialogMode} from "../../../../enums/dialog";
import {PermissionDirective} from "../../../../../core/auth/directives/show-if-has-role.directive";
import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {takeUntil} from 'rxjs/operators';
import {filter, Subject} from 'rxjs';
import {OrganizationConfigService} from '../../services/organization-config.service';
import {OrganizationDialogService} from '../../services/organization-dialog.service';
import {OrganizationActionsComponent} from '../../components/organization-actions/organization-actions.component';
import {TranslatePipe} from '@ngx-translate/core';
import {MatPrefix} from '@angular/material/input';
import {ROLES} from "../../../../../shared/enums/roles";
import {ENTITY_REGISTRY} from "../../../../../shared/consts/entity-registry";
import {TabLink} from "../../../../models/tab-link";

@Component({
  selector: 'app-organization-page',
  templateUrl: './organization-page.component.html',
  imports: [
    PermissionDirective,
    MatTabNav,
    MatTabLink,
    RouterLink,
    MatTabNavPanel,
    RouterOutlet,
    OrganizationActionsComponent,
    MatPrefix,
    TranslatePipe,
  ]
})
export class OrganizationPageComponent implements OnInit, OnDestroy {
  private configService = inject(OrganizationConfigService);
  private dialogService = inject(OrganizationDialogService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  protected readonly DialogMode = DialogMode;
  protected readonly ROLES = ROLES;
  protected readonly ENTITY_REGISTRY = ENTITY_REGISTRY;

  entityName = this.configService.getEntityMetadata().name;
  entities: AppOrganization[] = this.activatedRoute.snapshot.data['entities'];

  entity = signal<AppOrganization>(this.activatedRoute.snapshot.data['organization']);
  tableFields = this.configService.getTableFields();

  links: TabLink[] = [
    {path: 'projects', label: `ADMIN.${ENTITY_REGISTRY.project.name}.title.plural`},
    {
      path: 'users',
      label: `ADMIN.${ENTITY_REGISTRY.user.name}.title.plural`,
      permissions: [{role: ROLES.SYS_ADMIN}, {role: ROLES.ORGANIZATION_ADMIN, entityName: this.entity().name}]
    },
    {path: 'details', label: `ADMIN.${this.entityName}.details`},
  ];

  activePath?: string;

  hasChildren = !!this.activatedRoute.firstChild?.firstChild?.snapshot?.params?.['id'];

  private _destroy$: Subject<void> = new Subject<void>();

  constructor() {
    this.initializeDialogEffect();
  }

  ngOnInit(): void {
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
      if (updated) untracked(() => this.handleDialogUpdate(updated));
    });
  }

  private handleDialogUpdate(updated: { mode: DialogMode | string, entity?: AppOrganization }) {
    switch (updated.mode) {
      case DialogMode.EDIT:
        if (updated?.entity) {
          this.entity.set(updated.entity);
          this.navigateOnUpdateSuccess(updated.entity);
        }
        break;
    }
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
      switch (action) {
        case 'edit':
          this.dialogService.openDialog(DialogMode.EDIT, {entity: this.entity(), entities: this.entities});
          break;
      }
    }
  }

  navigateOnUpdateSuccess(entity: AppOrganization) {
    const lastSegment = this.activatedRoute.firstChild?.snapshot.url[this.activatedRoute.firstChild?.snapshot.url.length - 1].path;
    this.router.navigate(['/admin', 'organizations', entity.name, lastSegment], {fragment: undefined}).then();
  }
}
