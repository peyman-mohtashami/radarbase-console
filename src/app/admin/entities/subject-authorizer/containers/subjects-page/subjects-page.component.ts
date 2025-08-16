// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
//
// import { MatDialog } from '@angular/material/dialog';
//
// import {
//   SubjectStatus,
// } from '@rb/models';
// import { FilterItem, TableType } from '../../../../models/table.model';
// import { FormFieldType } from '../../../../models/dialog.model';
// import { SubjectDialogComponent } from '../subject-dialog/subject-dialog.component';
// import { DialogMode } from '../../../../enums/dialog';
// import { SubjectService } from '../../../subject/services/subject.service';
// import { AppSubject } from "../../../subject/models/subject";
// import { AppProject } from "../../../project/models/project";
// import { AppClient } from "../../../client/models/client";
// import { AppGroup } from "../../../group/models/group";
// import {BaseEntitiesPage} from "../../../../components/base-entities-page/base-entities-page";
// import {TABLE_ANIMATION} from "../../../../animation";
//
// @Component({
//   selector: 'rb-subjects-authorizer-page',
//   templateUrl: './subjects-page.component.html',
//   animations: TABLE_ANIMATION
// })
// export class SubjectsPageComponent
//   extends BaseEntitiesPage<AppSubject, SubjectDialogComponent>
//   implements OnInit, OnDestroy
// {
//   SubjectStatus = SubjectStatus;
//
//   override type = TableType.GET_WITH_QUERY;
//
//   projects: AppProject[] = this.activatedRoute.snapshot.data['projects'];
//   clients: AppClient[] = this.activatedRoute.snapshot.data['clients'];
//   groups: AppGroup[] = this.activatedRoute.snapshot.data['groups'];
//
//   override filters: FilterItem[] = [
//     {
//       name: 'login',
//       label: 'ADMIN.subject.login.tableLabel',
//       placeHolder: '',
//       type: FormFieldType.INPUT,
//     },
//     {
//       name: 'externalId',
//       label: 'ADMIN.subject.externalId.tableLabel',
//       placeHolder: '',
//       type: FormFieldType.INPUT,
//     },
//     {
//       name: 'personName',
//       label: 'ADMIN.subject.personName.tableLabel',
//       type: FormFieldType.INPUT,
//     },
//     {
//       name: 'dateOfBirth.is',
//       advanced: true,
//       label: 'ADMIN.subject.dateOfBirth.tableLabel',
//       type: FormFieldType.DATEPICKER,
//     },
//     {
//       name: 'groupId',
//       advanced: true,
//       label: 'ADMIN.subject.group.tableLabel',
//       type: FormFieldType.SELECT,
//       options: this.groups.map((g) => ({ value: g.id, label: g.name })) || [],
//     },
//     {
//       name: '',
//       advanced: true,
//       names: ['enrollmentDate.from', 'enrollmentDate.to'],
//       label: 'ADMIN.subject.enrollmentDate.tableLabel',
//       type: FormFieldType.RANGE_PICKER,
//     },
//   ];
//
//   constructor(
//     router: Router,
//     activatedRoute: ActivatedRoute,
//     dialog: MatDialog,
//     entityService: SubjectService
//   ) {
//     super(router, activatedRoute, dialog, entityService);
//   }
//
//   ngOnInit(): void {
//     this.init();
//   }
//
//   ngOnDestroy() {
//     this.destroy();
//   }
//
//   override getDialogRef(mode: DialogMode, entity?: AppSubject) {
//     return this.dialog.open(SubjectDialogComponent, {
//       data: {
//         mode,
//         entity,
//         projects: this.projects,
//         groups: this.groups,
//       },
//       panelClass: ['scrollable', 'w-full'],
//       disableClose: true,
//     });
//   }
// }
