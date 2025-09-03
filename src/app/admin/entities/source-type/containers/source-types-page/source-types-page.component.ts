// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
//
// import { MatDialog } from '@angular/material/dialog';
//
// import { FilterItem, TableType } from "../../../../models/table.model";
// import { FormFieldType } from '../../../../models/dialog.model';
// import { SourceTypeDialogComponent } from '../source-type-dialog/source-type-dialog.component';
// // import { SourceTypeEntityService } from '../../store/services/sourceType.entity.service';
// import { DialogMode } from '../../../../enums/dialog';
// import { AppSourceType } from "../../models/source-type";
// import { TABLE_ANIMATION } from "../../../../animation";
// import { ENTITY_NAME } from '../../../../enums/entities';
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
// import {SourceTypeTableRowComponent} from "../../components/source-type-table-row/source-type-table-row.component";
// import {MatPaginator} from "@angular/material/paginator";
// import {SourceTypeService} from "../../services/sourceType.service";
//
// @Component({
//   selector: 'rb-source-types-page',
//   templateUrl: './source-types-page.component.html',
//   animations: TABLE_ANIMATION,
//   imports: [
//     EntitiesPageHeaderComponent,
//     DataTableFilterComponent,
//     LoaderComponent,
//     TableQueryReflectorDirective,
//     NgIf,
//     TranslatePipe,
//     SourceTypeTableRowComponent,
//     MatPaginator
//   ]
// })
// export class SourceTypesPageComponent
//   extends BaseEntitiesPage<AppSourceType, SourceTypeDialogComponent>
//   implements OnInit, OnDestroy
// {
//   name = ENTITY_NAME.sourceType
//   protected readonly PROPERTIES = PROPERTIES;
//
//   // override type = TableType.GET_ALL_FROM_STORE;
//   override type = TableType.GET_ALL;
//
//   override filters: FilterItem[] = [
//     {
//       name: 'name',
//       label: 'Name', //'ADMIN.sourceType.producerModelCatalogVersion.tableLabel',
//       type: FormFieldType.INPUT,
//     },
//     {
//       name: 'canRegisterDynamically',
//       advanced: true,
//       label: 'ADMIN.sourceType.canRegisterDynamically.tableLabel',
//       type: FormFieldType.SELECT,
//       options: [
//         {
//           label: 'ADMIN.sourceType.canRegisterDynamically.manual',
//           value: 'false',
//         },
//         {
//           label: 'ADMIN.sourceType.canRegisterDynamically.dynamic',
//           value: 'true',
//         },
//       ],
//     },
//     {
//       name: 'sourceTypeScope',
//       advanced: true,
//       label: 'ADMIN.sourceType.sourceTypeScope.tableLabel',
//       type: FormFieldType.SELECT,
//       options: [
//         { label: 'ADMIN.sourceType.sourceTypeScope.ACTIVE', value: 'ACTIVE' },
//         { label: 'ADMIN.sourceType.sourceTypeScope.PASSIVE', value: 'PASSIVE' },
//       ],
//     },
//   ];
//
//   constructor(
//     router: Router,
//     activatedRoute: ActivatedRoute,
//     dialog: MatDialog,
//     entityService: SourceTypeService, //SourceTypeEntityService
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
//   override getDialogRef(mode: DialogMode, entity?: AppSourceType) {
//     return this.dialog.open(SourceTypeDialogComponent, {
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
// }
