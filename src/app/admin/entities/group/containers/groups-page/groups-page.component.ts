// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
//
// import { MatDialog } from '@angular/material/dialog';
//
// import { FilterItem, TableType } from "../../../../models/table.model";
// import { FormFieldType } from '../../../../models/dialog.model';
// import { GroupDialogComponent } from '../group-dialog/group-dialog.component';
// import { GroupService } from '../../services/group.service';
// import { DialogMode } from '../../../../enums/dialog';
// import { Store } from '@ngrx/store';
// import { AdminActions } from '../../../../store/action.types';
// import { AppGroup } from "../../models/group";
// import { TABLE_ANIMATION } from "../../../../animation";
// import { ENTITY_NAME } from '../../../../enums/entities';
// import { PROPERTIES} from "../../config";
// import {BaseEntitiesPage} from "../../../../components/base-entities-page/base-entities-page";
// import {
//   EntitiesPageHeaderComponent
// } from "../../../../components/base-entities-page/entities-page-header/entities-page-header.component";
// import {
//   DataTableFilterComponent
// } from "../../../../components/base-entities-page/data-table-filter/data-table-filter.component";
// import {LoaderComponent} from "../../../../../shared/components/loader/loader.component";
// import {TableQueryReflectorDirective} from "../../../../directives/table-query-reflector.directive";
// import {NgIf} from "@angular/common";
// import {TranslatePipe} from "@ngx-translate/core";
// import {MatPaginator} from "@angular/material/paginator";
// import {GroupTableRowComponent} from "../../components/group-table-row/group-table-row.component";
// import {EntitiesPageComponent} from "../../../../components/entities-page/entities-page.component";
//
// @Component({
//   selector: 'rb-groups-page',
//   templateUrl: './groups-page.component.html',
//   animations: TABLE_ANIMATION,
//   imports: [
//     EntitiesPageHeaderComponent,
//     DataTableFilterComponent,
//     LoaderComponent,
//     TableQueryReflectorDirective,
//     NgIf,
//     TranslatePipe,
//     GroupTableRowComponent,
//     MatPaginator,
//     EntitiesPageComponent
//   ]
// })
// export class GroupsPageComponent
//   extends BaseEntitiesPage<AppGroup, GroupDialogComponent>
//   implements OnInit, OnDestroy
// {
//   name = ENTITY_NAME.group
//   protected readonly PROPERTIES = PROPERTIES;
//
//   override type = TableType.GET_WITH_QUERY; //TableType.GET_ALL;
//
//   override filters: FilterItem[] = [
//     {
//       name: 'name',
//       label: 'ADMIN.group.name.tableLabel',
//       type: FormFieldType.INPUT,
//     },
//   ];
//
//   constructor(
//     router: Router,
//     activatedRoute: ActivatedRoute,
//     dialog: MatDialog,
//     entityService: GroupService,
//     private store: Store
//   ) {
//     super(router, activatedRoute, dialog, entityService);
//   }
//
//   ngOnInit(): void {
//     this.init();
//     this.store.dispatch(
//       AdminActions.subjectSelected({ selectedSubject: null })
//     );
//   }
//
//   ngOnDestroy() {
//     this.destroy();
//   }
//
//   override getDialogRef(mode: DialogMode, entity?: AppGroup) {
//     return this.dialog.open(GroupDialogComponent, {
//       data: { mode, entity, entities: this.entities },
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
// }
