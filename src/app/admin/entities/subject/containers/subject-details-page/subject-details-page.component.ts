import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {JsonPipe, Location, NgIf} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

// import { MatDialog, MatDialogRef } from '@angular/material/dialog';


// import { SubjectService } from '../../services/subject.service';
// import { SubjectDialogComponent } from '../subject-dialog/subject-dialog.component';
// import { DialogMode } from '../../../../enums/dialog';
// import { GroupService } from '../../../group/services/group.service';
import { Store } from '@ngrx/store';
// import { BaseEntityPage } from '../../../../components/base-entity-page/base-entity-page';
// import { AppSubject } from "../../models/subject";
import { AppProject } from "../../../project/models/project";
// import { AppGroup } from "../../../group/models/group";
// import { AppClient } from "../../../client/models/client";
import {LoaderComponent} from "../../../../../shared/components/loader/loader.component";
import {MatCard, MatCardContent} from "@angular/material/card";
import {SubjectDetailsComponent} from "../../components/subject-details/subject-details.component";
import {TranslatePipe} from "@ngx-translate/core";
// import {BaseEntityPageComponent} from "../../../../components/base-entity-page/base-entity-page.component";
import {
  OrganizationDetailsComponent
} from "../../../organization/components/organization-details/organization-details.component";
import {entitiesConfig} from "../../../../../core/config/store/config.selectors";
import {map} from "rxjs/operators";
import {ENTITY_NAME} from "../../../../enums/entities";
import {DetailType} from "../../../../enums/detail-type";
import {PROPERTIES} from "../../config";
import {AppSubject} from "../../models/subject";

@Component({
  selector: 'rb-subject-details-page',
  templateUrl: './subject-details-page.component.html',
  imports: [
    LoaderComponent,
    // NgIf,
    MatCard,
    MatCardContent,
    SubjectDetailsComponent,
    TranslatePipe,
    JsonPipe,
    OrganizationDetailsComponent
  ]
})
export class SubjectDetailsPageComponent
  // extends BaseEntityPageComponent<AppSubject, SubjectDialogComponent>
  // implements OnInit, OnDestroy
{
  protected readonly ENTITY_NAME = ENTITY_NAME;
  protected readonly PROPERTIES = PROPERTIES;
  protected readonly DetailType = DetailType;

  private activatedRoute = inject(ActivatedRoute);
  private store = inject(Store);

  loading = false;
  entity = this.activatedRoute.snapshot.parent?.data['entity'] as AppSubject;

  config$ = this.store?.select(entitiesConfig).pipe(
    map(config => config?.[ENTITY_NAME.subject]?.fields ?? {})
  )

  // constructor(private activatedRoute: ActivatedRoute, private store: Store) {}
  // projectName?: string = this.entity.project?.projectName;
  // organizationName?: string = this.entity.project?.organization.name;
  // projects: AppProject[] = this.activatedRoute.snapshot.data['projects'];
  // project?: AppProject;
  // clients: AppClient[] = this.activatedRoute.snapshot.data['clients'];
  //
  // groups?: AppGroup[] = this.activatedRoute.snapshot.data['groups'];

  // constructor(
  //   router: Router,
  //   dialog: MatDialog,
  //   activatedRoute: ActivatedRoute,
  //   location: Location,
  //   // entityService: SubjectService,
  //   // private groupService: GroupService,
  //   // private store: Store
  // ) {
  //   super(router, activatedRoute, dialog, location);//, entityService);
  //   console.log('Class: SubjectDetailsPageComponent, Function: constructor, Line 58 this.entity' , this.entity);
  // }
  //
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
  //
  // // ngOnDestroy() {
  // //   this.destroy();
  // // }
  //
  // override getDialogRef(
  //   mode: DialogMode,
  //   entity: AppSubject
  // ): MatDialogRef<SubjectDialogComponent> {
  //   return this.dialog.open(SubjectDialogComponent, {
  //     data: {
  //       mode,
  //       entity,
  //       // projectName: this.projectName,
  //       // projects: this.projects,
  //       // groups: this.groups,
  //     },
  //     // data: { mode, entity },
  //     panelClass: ['scrollable', 'full-width-dialog'],
  //     disableClose: true,
  //   });
  // }
  //
  // // override navigateOnUpdateSuccess(entity: AppSubject) {
  // //   super.navigateOnUpdateSuccess(entity);
  // // }
  // //
  // // override navigateOnDeleteSuccess() {
  // //   super.navigateOnDeleteSuccess();
  // // }
}
