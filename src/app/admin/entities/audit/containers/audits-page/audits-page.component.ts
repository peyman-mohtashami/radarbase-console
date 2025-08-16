// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { MatDialog } from '@angular/material/dialog';
// import { AuditService } from '../../services/audit.service';
// import { FilterItem, TableType } from "../../../../models/table.model";
// import { FormFieldType } from '../../../../models/dialog.model';
// import { TABLE_ANIMATION } from "../../../../animation";
// import { ENTITY_NAME } from "../../../../enums/entities";
// import { PROPERTIES} from "../../config";
// import {BaseEntitiesPage} from "../../../../components/base-entities-page/base-entities-page";
// import {AppAudit} from "../../models/audit";
// import {
//   EntitiesPageHeaderComponent
// } from "../../../../components/base-entities-page/entities-page-header/entities-page-header.component";
// import {
//   DataTableFilterComponent
// } from "../../../../components/base-entities-page/data-table-filter/data-table-filter.component";
// import {LoaderComponent} from "../../../../../shared/components/loader/loader.component";
// import {TableQueryReflectorDirective} from "../../../../directives/table-query-reflector.directive";
// import {AuditTableRowComponent} from "../../components/audit-table-row/audit-table-row.component";
// import {TranslatePipe} from "@ngx-translate/core";
// import {MatPaginator} from "@angular/material/paginator";
// import {EntitiesPageComponent} from "../../../../components/entities-page/entities-page.component";
//
// @Component({
//   selector: 'rb-audits-page',
//   templateUrl: './audits-page.component.html',
//   animations: TABLE_ANIMATION,
//   imports: [
//     EntitiesPageHeaderComponent,
//     DataTableFilterComponent,
//     LoaderComponent,
//     TableQueryReflectorDirective,
//     AuditTableRowComponent,
//     TranslatePipe,
//     MatPaginator,
//     EntitiesPageComponent
//   ]
// })
// export class AuditsPageComponent
//   extends BaseEntitiesPage<AppAudit, never>
//   implements OnInit, OnDestroy
// {
//   name = ENTITY_NAME.audit
//   protected readonly PROPERTIES = PROPERTIES;
//
//   override type = TableType.GET_WITH_QUERY;
//
//   override filters: FilterItem[] = [
//     {
//       name: '',
//       names: ['fromDate', 'toDate'],
//       label: 'ADMIN.audit.timestamp.tableLabel',
//       type: FormFieldType.RANGE_PICKER,
//     },
//   ];
//
//   constructor(
//     router: Router,
//     activatedRoute: ActivatedRoute,
//     dialog: MatDialog,
//     entityService: AuditService
//   ) {
//     super(router, activatedRoute, dialog, entityService);
//   }
//
//   ngOnInit(): void {
//     this.init();
//   }
//   ngOnDestroy(): void {
//     this.destroy();
//   }
// }
