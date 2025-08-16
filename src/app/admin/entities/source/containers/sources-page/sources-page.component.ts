// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
//
// import { MatDialog } from '@angular/material/dialog';
//
// import { FilterItem, TableType } from "../../../../models/table.model";
// import { SourceDialogComponent } from '../source-dialog/source-dialog.component';
// import { SourceService } from '../../services/source.service';
// import { DialogMode } from '../../../../enums/dialog';
// import { AdminActions } from '../../../../store/action.types';
// import { Store } from '@ngrx/store';
// import { AppSource } from "../../models/source";
// import { AppSourceType } from "../../../source-type/models/source-type";
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
// import {SourceTableRowComponent} from "../../components/source-table-row/source-table-row.component";
// import {MatPaginator} from "@angular/material/paginator";
// // import {EntitiesPageComponent} from "../../../../components/entities-page/entities-page.component";
//
// @Component({
//   selector: 'rb-sources-page',
//   templateUrl: './sources-page.component.html',
//   animations: TABLE_ANIMATION,
//   imports: [
//     EntitiesPageHeaderComponent,
//     DataTableFilterComponent,
//     LoaderComponent,
//     TableQueryReflectorDirective,
//     NgIf,
//     TranslatePipe,
//     SourceTableRowComponent,
//     MatPaginator,
//     // EntitiesPageComponent
//   ]
// })
// export class SourcesPageComponent
//   extends BaseEntitiesPage<AppSource, SourceDialogComponent>
//   implements OnInit, OnDestroy
// {
//   name = ENTITY_NAME.source;
//   protected readonly PROPERTIES = PROPERTIES;
//
//   override type = TableType.GET_WITH_QUERY;
//
//   sourceTypes: AppSourceType[] =
//     this.activatedRoute.snapshot.data['sourceTypes'];
//
//   // override displayedColumns: string[] = [
//   //   'id',
//   //   'expectedSourceName',
//   //   'sourceName',
//   //   'sourceId',
//   //   'assigned',
//   //   'sourceType',
//   //   'actions',
//   // ];
//
//   override filters: FilterItem[] = [];
//
//   // @ViewChild(MatPaginator, { static: true }) override paginator!: MatPaginator;
//   // @ViewChild(MatSort, { static: true }) override sort: MatSort = new MatSort();
//
//   constructor(
//     router: Router,
//     activatedRoute: ActivatedRoute,
//     dialog: MatDialog,
//     entityService: SourceService,
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
//     this.store.dispatch(
//       AdminActions.clientSelected({ selectedClient: null })
//     );
//     this.store.dispatch(
//       AdminActions.clientConfigCategorySelected({ selectedClientConfigCategory: null })
//     );
//   }
//
//   ngOnDestroy() {
//     this.destroy();
//   }
//
//   override getDialogRef(mode: DialogMode, entity?: AppSource) {
//     return this.dialog.open(SourceDialogComponent, {
//       data: {
//         mode,
//         entity,
//         sourceTypes: this.sourceTypes,
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
//   // switchSort(property: any) {
//   //
//   // }
// }
