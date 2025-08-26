import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe, Location, NgForOf, NgIf} from '@angular/common';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProjectDialogComponent } from '../project-dialog/project-dialog.component';
// import { ProjectEntityService } from '../../store/services/project.entity.service';
import { DialogMode } from '../../../../enums/dialog';
// import { ProjectStatus } from '@rb/models';
import { BaseEntityPageComponent } from '../../../../components/base-entity-page/base-entity-page.component';
import { Store } from '@ngrx/store';
import { AppProject } from "../../models/project";
import { AppOrganization } from "../../../organization/models/organization";
import {ENTITIES} from "../../../../consts/entities";
// import {project} from "../../../../store/admin.selectors";
import {BreadcrumbComponent} from "../../../../components/breadcrumb/breadcrumb.component";
import {LoaderComponent} from "../../../../../shared/components/loader/loader.component";
import {TranslatePipe} from "@ngx-translate/core";
import {RbPermissionDirective} from "../../../../../core/auth/directives/ng-permission.directive";
import {ActionsComponent} from "../../components/actions/actions.component";
import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {ProjectService} from "../../services/project.service";
import {ProjectStatus} from '../../../../../shared/models/radar-project.model';

interface ILink {
  path: string;
  label: string;
}

@Component({
  selector: 'rb-project-page',
  templateUrl: './project-page.component.html',
  imports: [
    BreadcrumbComponent,
    LoaderComponent,
    NgIf,
    TranslatePipe,
    AsyncPipe,
    RbPermissionDirective,
    ActionsComponent,
    MatTabNav,
    NgForOf,
    MatTabLink,
    RouterLink,
    MatTabNavPanel,
    RouterOutlet
  ]
})
export class ProjectPageComponent
  extends BaseEntityPageComponent<AppProject, ProjectDialogComponent>
  implements OnInit, OnDestroy
{
  ProjectStatus = ProjectStatus;

  entities: AppProject[] = this.activatedRoute.snapshot.data['entities'];
  organizations: AppOrganization[] =
    this.activatedRoute.snapshot.data['organizations'];
  sourceTypes = this.activatedRoute.snapshot.data['sourceTypes'];

  organizationName?: string = this.entity.organization.name;

  private store = inject(Store)

  // selectedOrganization$ = this.store.select(organization);
  // selectedProject$ = this.store.select(project);

  constructor(
    router: Router,
    activatedRoute: ActivatedRoute,
    dialog: MatDialog,
    location: Location,
    // private store: Store,
    private entityService: ProjectService, //ProjectEntityService // private uiService: UiService
  ) {
    super(router, activatedRoute, dialog, location);
    console.log('ProjectSinglePageComponent constructor')
    // this.store.dispatch(
    //   AdminActions.organizationSelected({
    //     selectedOrganization: this.entity.organization as RadarOrganizationDef,
    //   })
    // );
    // this.store.dispatch(
    //   AdminActions.projectSelected({ selectedProject: this.entity })
    // );
    activatedRoute.firstChild?.url.subscribe(url =>{
      console.log('Class: , Function: , Line 26 url' , url);
      this.activePath = url[0].path;
    })
  }

  links: ILink[] = [
    { path: 'subjects', label: 'Subjects' },
    { path: 'groups', label: 'Groups' },
    { path: 'sources', label: 'Sources' },
    { path: 'app-configs/apps', label: 'App Configs' },
    { path: 'users', label: 'Users' },
    { path: 'details', label: 'Details' },
  ];

  activePath?: string ;// = this.links[0].path;

  ngOnInit() {
    console.log('ProjectSinglePageComponent ngOnInit (before dispatch')
    // this.store.dispatch(
    //   AdminActions.organizationSelected({
    //     selectedOrganization: this.entity.organization as RadarOrganizationDef,
    //   })
    // );
    // this.store.dispatch(
    //   AdminActions.projectSelected({ selectedProject: this.entity })
    // );
    console.log('ProjectSinglePageComponent ngOnInit (after dispatch)')

    // this.uiService.selectProject(this.entity.projectName);
    // this.uiService.selectOrganization(this.entity.organization.name);
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }

  override getDialogRef(
    mode: DialogMode,
    entity: AppProject
  ): MatDialogRef<ProjectDialogComponent> {
    console.log(this.organizations);
    return this.dialog.open(ProjectDialogComponent, {
      data: {
        mode,
        entity,
        entities: this.entities,
        organizations: this.organizations,
        organizationName: this.organizationName,
        sourceTypes: this.sourceTypes,
      },
      panelClass: ['scrollable', 'full-width-dialog'],
      disableClose: true,
    });
  }

  override update(
    entity: AppProject,
    dialogRef: MatDialogRef<ProjectDialogComponent>
  ) {
    this.entityService.update(entity).subscribe({
      next: (_entity) => this.onSuccess(_entity, dialogRef),
      error: (err) => this.onError(err, dialogRef),
    });
  }

  override navigate(entity: AppProject) {
    this.router
      .navigate(['/admin', 'projects', entity.projectName, 'subjects'])
      .then();
  }

  protected readonly ENTITIES = ENTITIES;
}
