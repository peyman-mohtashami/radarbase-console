import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';


import { SubjectService } from '../../services/subject.service';
import { SubjectDialogComponent } from '../subject-dialog/subject-dialog.component';
import { DialogMode } from '../../../../enums/dialog';
import { GroupService } from '../../../group/services/group.service';
import { Store } from '@ngrx/store';
import { BaseEntityPage } from '../../../../components/base-entity-page/base-entity-page';
import { AppSubject } from "../../models/subject";
import { AppProject } from "../../../project/models/project";
import { AppGroup } from "../../../group/models/group";
import { AppClient } from "../../../client/models/client";

@Component({
    selector: 'rb-subject-download-page',
    templateUrl: './subject-download-page.component.html',
})
export class SubjectDownloadPageComponent
  // extends BaseEntityPage<AppSubject, SubjectDialogComponent>
  // implements OnInit, OnDestroy
{
  // projectName?: string = this.entity.project?.projectName;
  // organizationName?: string = this.entity.project?.organization.name;
  // projects: AppProject[] = this.activatedRoute.snapshot.data['projects'];
  // project?: AppProject;
  // clients: AppClient[] = this.activatedRoute.snapshot.data['clients'];
  //
  // groups?: AppGroup[] = this.activatedRoute.snapshot.data['groups'];

  constructor(
    // router: Router,
    // dialog: MatDialog,
    // activatedRoute: ActivatedRoute,
    // location: Location,
    // entityService: SubjectService,
    // private groupService: GroupService,
    // private store: Store
  ) {
    // super(router, activatedRoute, dialog, location, entityService);
  }

  // ngOnInit() {
  //   // this.store.dispatch(
  //   //   AdminActions.organizationSelected({
  //   //     selectedOrganization: this.entity.project
  //   //       ?.organization as RadarOrganizationDef,
  //   //   })
  //   // );
  //   // this.store.dispatch(
  //   //   AdminActions.projectSelected({
  //   //     selectedProject: this.entity.project as RadarProjectDef,
  //   //   })
  //   // );
  //   // this.store.dispatch(
  //   //   AdminActions.subjectSelected({ selectedSubject: this.entity })
  //   // );
  // }

  // ngOnDestroy() {
  //   this.destroy();
  // }

  // override getDialogRef(
  //   mode: DialogMode,
  //   entity: AppSubject
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
  // override navigateOnUpdateSuccess(entity: AppSubject) {
  //   super.navigateOnUpdateSuccess(entity);
  // }
  //
  // override navigateOnDeleteSuccess() {
  //   super.navigateOnDeleteSuccess();
  // }
}
