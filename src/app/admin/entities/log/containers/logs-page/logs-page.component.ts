// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
//
// import { MatDialog } from '@angular/material/dialog';
//
// import { LogService } from '../../services/log.service';
// import { FilterItem, TableType } from "../../../../models/table.model";
// import { FormFieldType } from '../../../../models/dialog.model';
// import { AppLog } from "../../models/log";
// import { TABLE_ANIMATION } from "../../../../animation";
// import {BaseEntitiesPage} from "../../../../components/base-entities-page/base-entities-page";
// import {ENTITY_NAME} from "../../../../enums/entities";
// import { PROPERTIES} from "../../config";
// import {
//   EntitiesPageHeaderComponent
// } from "../../../../components/base-entities-page/entities-page-header/entities-page-header.component";
// import {
//   DataTableFilterComponent
// } from "../../../../components/base-entities-page/data-table-filter/data-table-filter.component";
// import {LoaderComponent} from "../../../../../shared/components/loader/loader.component";
// import {TableQueryReflectorDirective} from "../../../../directives/table-query-reflector.directive";
// import {NgForOf, NgIf} from "@angular/common";
// import {TranslatePipe} from "@ngx-translate/core";
// import {LogTableRowComponent} from "../../components/log-table-row/log-table-row.component";
// import {MatPaginator} from "@angular/material/paginator";
// import {EntitiesPageComponent} from "../../../../components/entities-page/entities-page.component";
//
// @Component({
//   selector: 'rb-logs-page',
//   templateUrl: './logs-page.component.html',
//   animations: TABLE_ANIMATION,
//   imports: [
//     EntitiesPageHeaderComponent,
//     DataTableFilterComponent,
//     LoaderComponent,
//     TableQueryReflectorDirective,
//     NgForOf,
//     NgIf,
//     TranslatePipe,
//     LogTableRowComponent,
//     MatPaginator,
//     EntitiesPageComponent
//   ]
// })
// export class LogsPageComponent
//   extends BaseEntitiesPage<AppLog, never>
//   implements OnInit, OnDestroy
// {
//   name = ENTITY_NAME.log
//   protected readonly PROPERTIES = PROPERTIES;
//
//   override type = TableType.GET_ALL;
//
//   override filters: FilterItem[] = [
//     {
//       name: 'name',
//       label: 'ADMIN.log.name.tableLabel',
//       type: FormFieldType.INPUT,
//     },
//   ];
//
//   constructor(
//     router: Router,
//     activatedRoute: ActivatedRoute,
//     dialog: MatDialog,
//     entityService: LogService
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
//   updateAction(log: AppLog, level: string) {
//     const updatedLog = {
//       id: log.id,
//       name: log.name,
//       level,
//     };
//     this.update(updatedLog).subscribe({
//       next: () => this.updateTrigger$.next(updatedLog.name || '0'),
//       error: (err) => console.log(err),
//     });
//   }
// }
