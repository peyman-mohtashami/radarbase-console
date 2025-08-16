import { Component, OnDestroy, OnInit } from '@angular/core';
import {Location, NgForOf, NgIf} from '@angular/common';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { SubjectService } from '../../services/subject.service';
import { SubjectDialogComponent } from '../subject-dialog/subject-dialog.component';
import { DialogMode } from '../../../../enums/dialog';
import { GroupService } from '../../../group/services/group.service';
import { Store } from '@ngrx/store';
import { AdminActions } from '../../../../store/action.types';
// import { BaseEntityPage } from '../../../../components/base-entity-page/base-entity-page';
import {ENTITIES} from "../../../../consts/entities";
import {BaseEntityPageComponent} from "../../../../components/base-entity-page/base-entity-page.component";
import {AppProject} from "../../../project/models/project";
import {ProjectDialogComponent} from "../../../project/containers/project-dialog/project-dialog.component";
import {AppSubject} from "../../models/subject";
import {ILink} from "../../../organization/containers/organization-page/organization-page.component";
import {BreadcrumbComponent} from "../../../../components/base-entity-page/breadcrumb/breadcrumb.component";
import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {RbPermissionDirective} from "../../../../../core/auth/directives/ng-permission.directive";

@Component({
  selector: 'rb-subject-page',
  templateUrl: './subject-page.component.html',
  imports: [
    BreadcrumbComponent,
    MatTabNav,
    MatTabLink,
    RouterLink,
    MatTabNavPanel,
    RouterOutlet,
    RbPermissionDirective
  ]
})
//extends BaseEntityPage<RadarSubjectDef, SubjectDialogComponent>
//implements OnInit, OnDestroy
export class SubjectPageComponent extends BaseEntityPageComponent<AppSubject, SubjectDialogComponent>
  implements OnDestroy {
  // projectName?: string = this.entity.project?.projectName;
  // organizationName?: string = this.entity.project?.organization.name;
  // projects: RadarProjectDef[] = this.activatedRoute.snapshot.data['projects'];
  // project?: RadarProjectDef;
  // clients: RadarClientDef[] = this.activatedRoute.snapshot.data['clients'];
  //
  // groups?: RadarGroupDef[] = this.activatedRoute.snapshot.data['groups'];

  constructor(
    router: Router,
    dialog: MatDialog,
    activatedRoute: ActivatedRoute,
    location: Location,
    entityService: SubjectService,
    private groupService: GroupService,
    private store: Store
  ) {
    super(router, activatedRoute, dialog, location);
    activatedRoute.firstChild?.url.subscribe(url =>{
      this.activePath = url[0].path;
    })
    // activatedRoute.url.subscribe((e) => {
    //   if(activatedRoute.snapshot.firstChild?.url[0].path !== 'projects') {
    //     // this.projectSelected = false;
    //     this.store.dispatch(
    //       AdminActions.projectSelected({ selectedProject: null })
    //     );
    //   } else {
    //     // this.projectSelected = true;
    //   }
    // });
    //super(router, activatedRoute, dialog, location, entityService);
  }

  // ngOnInit() {
  //   this.store.dispatch(
  //     AdminActions.organizationSelected({
  //       selectedOrganization: this.entity.project
  //         ?.organization as RadarOrganizationDef,
  //     })
  //   );
  //   this.store.dispatch(
  //     AdminActions.projectSelected({
  //       selectedProject: this.entity.project as RadarProjectDef,
  //     })
  //   );
  //   this.store.dispatch(
  //     AdminActions.subjectSelected({ selectedSubject: this.entity })
  //   );
  // }
  //
  // ngOnDestroy() {
  //   this.destroy();
  // }
  //
  // override getDialogRef(
  //   mode: DialogMode,
  //   entity: RadarSubjectDef
  // ): MatDialogRef<SubjectDialogComponent> {
  //   return this.dialog.open(SubjectDialogComponent, {
  //     data: {
  //       mode,
  //       entity,
  //       projectName: this.projectName,
  //       projects: this.projects,
  //       groups: this.groups,
  //     },
  //     // data: { mode, entity },
  //     panelClass: ['scrollable', 'full-width-dialog'],
  //     disableClose: true,
  //   });
  // }
  //
  // override navigateOnUpdateSuccess(entity: RadarSubjectDef) {
  //   super.navigateOnUpdateSuccess(entity);
  // }
  //
  // override navigateOnDeleteSuccess() {
  //   super.navigateOnDeleteSuccess();
  // }
  protected readonly ENTITIES = ENTITIES;

  links: ILink[] = [
    { path: 'download', label: 'Download' },
    { path: 'data', label: 'Data' },
    { path: 'compliance', label: 'Compliance' },
    { path: 'app-configs', label: 'App Configs' },
    { path: 'details', label: 'Details' },
  ];

  activePath?: string ;// = this.links[0].path;


  override ngOnDestroy() {
    super.ngOnDestroy();
  }
}
