// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
//
// import {MatDialog, MatDialogRef} from '@angular/material/dialog';
//
// import { SubjectStatus } from '@rb/models';
// import { FilterItem, TableType } from "../../../../models/table.model";
// import { FormFieldType } from '../../../../models/dialog.model';
// import { SubjectService } from '../../services/subject.service';
// import { SubjectDialogComponent } from '../subject-dialog/subject-dialog.component';
// import { DialogMode } from '../../../../enums/dialog';
// import { AdminActions } from "../../../../store/action.types";
// import { Store } from "@ngrx/store";
// import { AppSubject } from "../../models/subject";
// import { AppProject } from "../../../project/models/project";
// import { AppGroup } from "../../../group/models/group";
// import { AppClient } from "../../../client/models/client";
// import { TABLE_ANIMATION } from "../../../../animation";
// import { ENTITY_NAME } from '../../../../enums/entities';
// import {PROPERTIES, TABLE_FIELDS} from "../../config";
// import {BaseEntitiesPage} from "../../../../components/base-entities-page/base-entities-page";
// import {instanceConfig} from "../../../../../core/config/store/config.selectors";
// import {map} from "rxjs/operators";
// import {
//   EntitiesPageHeaderComponent
// } from "../../../../components/base-entities-page/entities-page-header/entities-page-header.component";
// import {
//   DataTableFilterComponent
// } from "../../../../components/base-entities-page/data-table-filter/data-table-filter.component";
// import {LoaderComponent} from "../../../../../shared/components/loader/loader.component";
// import {AssignGroupComponent} from "../../components/assign-group/assign-group.component";
// import {TableQueryReflectorDirective} from "../../../../directives/table-query-reflector.directive";
// import {MatCheckbox} from "@angular/material/checkbox";
// import {AsyncPipe, NgIf} from "@angular/common";
// import {TranslatePipe} from "@ngx-translate/core";
// import {SubjectTableRowComponent} from "../../components/subject-table-row/subject-table-row.component";
// import {MatPaginator} from "@angular/material/paginator";
// import {EntitiesPageComponent} from "../../../../components/entities-page/entities-page.component";
//
//
// @Component({
//   selector: 'rb-subjects-page',
//   templateUrl: './subjects-page.component.html',
//   animations: TABLE_ANIMATION,
//   imports: [
//     EntitiesPageHeaderComponent,
//     DataTableFilterComponent,
//     LoaderComponent,
//     AssignGroupComponent,
//     TableQueryReflectorDirective,
//     MatCheckbox,
//     NgIf,
//     TranslatePipe,
//     SubjectTableRowComponent,
//     MatPaginator,
//     AsyncPipe,
//     EntitiesPageComponent
//   ]
// })
// export class SubjectsPageComponent
//   extends BaseEntitiesPage<AppSubject, SubjectDialogComponent>
//   implements OnInit, OnDestroy
// {
//   protected readonly Math = Math;
//   // [x: string]: any;
//
//   name = ENTITY_NAME.subject;
//   protected readonly ENTITY_NAME = ENTITY_NAME;
//   protected readonly PROPERTIES = PROPERTIES;
//
//   SubjectStatus = SubjectStatus;
//
//   override type = TableType.GET_WITH_QUERY;
//
//   projects: AppProject[] = this.activatedRoute.snapshot.data['projects'];
//   clients: AppClient[] = this.activatedRoute.snapshot.data['clients'];
//   groups: AppGroup[] = this.activatedRoute.snapshot.data['groups'];
//
//   // override displayedColumns: string[] = [
//   //   'select',
//   //   'id',
//   //   'login',
//   //   'externalId',
//   //   'personName',
//   //   'dateOfBirth',
//   //   'status',
//   //   'group',
//   //   // 'sources',
//   //   'actions',
//   // ];
//
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
//       options: this.groups?.map((g) => ({ value: g.id, label: g.name })) || [],
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
//   // @ViewChild(MatPaginator, { static: true }) override paginator!: MatPaginator;
//   // @ViewChild(MatSort, { static: true }) override sort: MatSort = new MatSort();
//   subjectConfig$ = this.store?.select(instanceConfig).pipe(
//     map(config => config.entities[ENTITY_NAME.subject].fields)
//   );
//
//   constructor(
//     router: Router,
//     activatedRoute: ActivatedRoute,
//     dialog: MatDialog,
//     entityService: SubjectService,
//     private store: Store,
//     // private groupService: GroupService,
//   ) {
//     super(router, activatedRoute, dialog, entityService);
//     // const params = this.activatedRoute.snapshot.queryParams;
//     // this.entityService.getWithQuery(params).subscribe(entities => this.entities = entities)
//     // this.groupService.getAll().subscribe(groups => this.groups = groups);
//   }
//
//   ngOnInit(): void {
//     this.init();
//     this.store.dispatch(
//       AdminActions.subjectSelected({ selectedSubject: null })
//     );
//     this.store.dispatch(
//       AdminActions.clientSelected({ selectedClient: null })
//     );
//     this.store.dispatch(
//       AdminActions.clientConfigCategorySelected({ selectedClientConfigCategory: null })
//     );
//   }
//
//   ngOnDestroy(): void {
//     this.destroy();
//   }
//
//   override getDialogRef(mode: DialogMode, entity?: AppSubject) {
//     return this.dialog.open(SubjectDialogComponent, {
//       data: {
//         mode,
//         entity,
//         // projectName: this.projectName,
//         projects: this.projects,
//         groups: this.groups,
//       },
//       panelClass: 'tailwind-slide-panel',
//       width: '50%',
//       height: '100vh',
//       position: { right: '0' },
//       hasBackdrop: true,
//       disableClose: true,
//       autoFocus: false,
//       restoreFocus: false
//     });
//   }
//
//   triggerUpdate($event: string) {
//     this.updateTrigger$.next($event);
//   }
//
//   // switchSort(property: any) {
//   //
//   // }
//   protected readonly TABLE_FIELDS = TABLE_FIELDS;
// }
