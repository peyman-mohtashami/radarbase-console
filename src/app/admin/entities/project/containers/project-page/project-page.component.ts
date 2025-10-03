import {Component, effect, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';

import { DialogMode } from '../../../../enums/dialog';
import {AppProject, ProjectStatus} from "../../models/project";
import { AppOrganization } from "../../../organization/models/organization";
import {ENTITIES} from "../../../../consts/entities";
import {BreadcrumbComponent} from "../../../../components/breadcrumb/breadcrumb.component";
import {RbPermissionDirective} from "../../../../../core/auth/directives/ng-permission.directive";
import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {filter, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ENTITY_NAME, ROLES} from '../../../../enums/entities';
import {ActionsComponent} from '../../components/actions/actions.component';
import {ProjectConfigService} from '../../services/project-config.service';
import {ProjectDialogService} from '../../services/project-dialog.service';
import {BackButtonDirective} from '../../../../directives/back-button.directive';
import {MatButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {MatPrefix} from '@angular/material/input';

interface ILink {
  path: string;
  label: string;
}

@Component({
  selector: 'rb-project-page',
  templateUrl: './project-page.component.html',
  imports: [
    BreadcrumbComponent,
    RbPermissionDirective,
    MatTabNav,
    MatTabLink,
    RouterLink,
    MatTabNavPanel,
    RouterOutlet,
    ActionsComponent,
    BackButtonDirective,
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

  protected readonly ENTITY_NAME = ENTITY_NAME;
  protected readonly ENTITIES = ENTITIES;
  protected readonly DialogMode = DialogMode;
  protected readonly ROLES = ROLES;
  protected readonly ProjectStatus = ProjectStatus;

  entities: AppProject[] = this.activatedRoute.snapshot.data['entities'];
  organizations: AppOrganization[] = this.activatedRoute.snapshot.data['organizations'];
  sourceTypes = this.activatedRoute.snapshot.data['sourceTypes'];

  links: ILink[] = [
    { path: 'subjects', label: 'Subjects' },
    { path: 'groups', label: 'Groups' },
    { path: 'sources', label: 'Sources' },
    // { path: 'app-configs/apps', label: 'App Configs' },
    { path: 'users', label: 'Users' },
    { path: 'details', label: 'Details' },
  ];

  activePath?: string;

  entity$ = signal<AppProject>(this.activatedRoute.snapshot.data['entity']);
  tableFields = this.configService.getTableFields();

  // hasChildren = false;
  hasChildren = !!this.activatedRoute.firstChild?.firstChild?.snapshot?.params?.['id']; //false;

  private _destroy$: Subject<void> = new Subject<void>();

  constructor() {
    this.initializeDialogEffect();
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this._destroy$)
    ).subscribe(() => {
      // Check current route and its children
      console.log('Class: ProjectPageComponent, Function: , Line 77 ' , this.activatedRoute.snapshot.params);
      console.log('Class: ProjectPageComponent, Function: , Line 77 ' , this.activatedRoute.firstChild?.snapshot.params);
      console.log('Class: ProjectPageComponent, Function: , Line 77 ' , this.activatedRoute.firstChild?.firstChild?.snapshot.params);
      this.hasChildren = !!this.activatedRoute.firstChild?.firstChild?.snapshot.params['id'];
      // Or use paramMap for type-safe access
      // const childParams = this.activatedRoute.firstChild?.snapshot?.paramMap;
      // if (childParams) {
      //   console.log('Child route params:', childParams.keys.map(key => ({
      //     [key]: childParams.get(key)
      //   })));
      // }
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
      const updated = this.dialogService.dialogUpdateEvent$();
      if (updated) {
        switch (updated.mode) {
          case DialogMode.EDIT:
            if (updated?.entity) {
              this.entity$.set(updated.entity);
            }
            this.navigateOnUpdateSuccess(updated.entity);
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
    if (entityType === 'project') {
      switch(action) {
        case 'edit':
          this.dialogService.openDialog(DialogMode.EDIT, this.entity$(), this.entities, this.organizations, this.sourceTypes);
          break;
        case 'delete':
          this.dialogService.openDialog(DialogMode.DELETE, this.entity$(), this.entities, this.organizations, this.sourceTypes);
      }
    }
  }

  navigateOnUpdateSuccess(entity: AppProject) {
    this.router
      .navigate(['/admin', 'projects', entity.projectName, 'subjects'])
      .then();
    // this.router
    //   .navigate([
    //     '/admin',
    //     'organizations',
    //     entity.name
    //   ])
    //   .then();
  }

  // navigateOnDeleteSuccess() {
  //   this.router.navigate(['/admin', 'source-types']).then();
  // }


  navigateOnDeleteSuccess() {
    this.router.navigate(['/admin', 'organizations']).then();
  }

  // override navigateOnUpdateSuccess(entity: AppOrganization) {}


  // selectedOrganization$ = this.store.select(organization);
  // selectedProject$ = this.store.select(project);





  // override update(
  //   entity: AppProject,
  //   dialogRef: MatDialogRef<ProjectDialogComponent>
  // ) {
  //   this.entityService.update(entity).subscribe({
  //     next: (_entity) => this.onSuccess(_entity, dialogRef),
  //     error: (err) => this.onError(err, dialogRef),
  //   });
  // }
  //
  // override navigate(entity: AppProject) {
  //   this.router
  //     .navigate(['/admin', 'projects', entity.projectName, 'subjects'])
  //     .then();
  // }


}
