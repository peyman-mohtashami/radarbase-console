// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
//
// import { MatDialog } from '@angular/material/dialog';
//
// import { FilterItem, TableType } from "../../../../models/table.model";
// import { SourceDataService } from '../../services/source-data.service';
// import { SourceDataDialogComponent } from '../source-data-dialog/source-data-dialog.component';
// import { DialogMode } from '../../../../enums/dialog';
// import { AppSourceData } from "../../models/source-data";
// import { AppSourceType } from "../../../source-type/models/source-type";
// import { TABLE_ANIMATION } from "../../../../animation";
// import { ENTITY_NAME } from '../../../../enums/entities';
// // import { PROPERTIES } from "../../source-data.module";
// import { PROPERTIES} from "../../config";
//
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
// import {SourceDataTableRowComponent} from "../../components/source-data-table-row/source-data-table-row.component";
// import {MatPaginator} from "@angular/material/paginator";
// import {EntitiesPageComponent} from "../../../../components/entities-page/entities-page.component";
//
// @Component({
//   selector: 'rb-sources-data-page',
//   templateUrl: './sources-data-page.component.html',
//   animations: TABLE_ANIMATION,
//   imports: [
//     EntitiesPageHeaderComponent,
//     DataTableFilterComponent,
//     LoaderComponent,
//     TableQueryReflectorDirective,
//     NgIf,
//     TranslatePipe,
//     SourceDataTableRowComponent,
//     MatPaginator,
//     EntitiesPageComponent
//   ]
// })
// export class SourcesDataPageComponent
//   extends BaseEntitiesPage<AppSourceData, SourceDataDialogComponent>
//   implements OnInit, OnDestroy
// {
//   name = ENTITY_NAME.sourceData
//   protected readonly PROPERTIES = PROPERTIES;
//
//   override type = TableType.GET_WITH_QUERY;
//
//   sourceTypes: AppSourceType[] =
//     this.activatedRoute.snapshot.data['sourceTypes'];
//
//   override filters: FilterItem[] = [];
//
//   constructor(
//     router: Router,
//     activatedRoute: ActivatedRoute,
//     dialog: MatDialog,
//     entityService: SourceDataService
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
//   override getDialogRef(mode: DialogMode, entity?: AppSourceData) {
//     return this.dialog.open(SourceDataDialogComponent, {
//       data: { mode, entity, sourceTypes: this.sourceTypes },
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
// }
