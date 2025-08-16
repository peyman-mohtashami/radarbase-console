// import { Component, OnDestroy, OnInit } from '@angular/core';
// import {ActivatedRoute, Router, RouterLink} from '@angular/router';
// import { MatDialog } from '@angular/material/dialog';
// import { ClientDialogComponent } from '../client-dialog/client-dialog.component';
// import { FormFieldType } from '../../../../models/dialog.model';
// import { FilterItem, TableType } from "../../../../models/table.model";
// import { DialogMode } from '../../../../enums/dialog';
// import { AppClient } from "../../models/client";
// import { TABLE_ANIMATION } from "../../../../animation";
// import { ENTITY_NAME } from '../../../../enums/entities';
// import { PROPERTIES} from "../../config";
// import { BaseEntitiesPage } from "../../../../components/base-entities-page/base-entities-page";
// import {
//   EntitiesPageHeaderComponent
// } from "../../../../components/base-entities-page/entities-page-header/entities-page-header.component";
// import {
//   DataTableFilterComponent
// } from "../../../../components/base-entities-page/data-table-filter/data-table-filter.component";
// import {NgClass, NgForOf, NgIf} from "@angular/common";
// import {LoaderComponent} from "../../../../../shared/components/loader/loader.component";
// import {TableQueryReflectorDirective} from "../../../../directives/table-query-reflector.directive";
// import {TranslatePipe} from "@ngx-translate/core";
// import {ClientTableRowComponent} from "../../components/client-table-row/client-table-row.component";
// import {MatCard, MatCardContent} from "@angular/material/card";
// import {MatPaginator} from "@angular/material/paginator";
// import {ClientService} from "../../services/client.service";
// import {EntitiesPageComponent} from "../../../../components/entities-page/entities-page.component";
//
// @Component({
//   selector: 'rb-clients-page',
//   templateUrl: './clients-page.component.html',
//   animations: TABLE_ANIMATION,
//   imports: [
//     EntitiesPageHeaderComponent,
//     DataTableFilterComponent,
//     NgIf,
//     LoaderComponent,
//     NgClass,
//     TableQueryReflectorDirective,
//     NgForOf,
//     TranslatePipe,
//     ClientTableRowComponent,
//     MatCard,
//     MatCardContent,
//     RouterLink,
//     MatPaginator,
//     EntitiesPageComponent
//   ]
// })
// export class ClientsPageComponent
//   extends BaseEntitiesPage<AppClient, ClientDialogComponent>
//   implements OnInit, OnDestroy
// {
//   name = ENTITY_NAME.client
//   protected readonly PROPERTIES = PROPERTIES;
//
//   // override type = TableType.GET_ALL_FROM_STORE;
//   override type = TableType.GET_ALL;
//
//   override filters: FilterItem[] = [
//     {
//       name: 'clientId',
//       label: 'ADMIN.client.clientId.tableLabel',
//       type: FormFieldType.INPUT,
//     },
//   ];
//
//   override gridView = false;
//
//   constructor(
//     router: Router,
//     activatedRoute: ActivatedRoute,
//     dialog: MatDialog,
//     entityService: ClientService, //ClientEntityService,
//   ) {
//     super(router, activatedRoute, dialog, entityService);
//   }
//
//   ngOnInit(): void {
//     this.init();
//     this.gridView = !!this.activatedRoute.snapshot.data['appConfig'];
//   }
//
//   ngOnDestroy() {
//     this.destroy();
//   }
//
//   override getDialogRef(mode: DialogMode, entity?: AppClient) {
//     return this.dialog.open(ClientDialogComponent, {
//       panelClass: 'tailwind-slide-panel',
//       width: '50%',
//       height: '100vh',
//       position: { right: '0' },
//       hasBackdrop: true,
//       data: { mode, entity, entities: this.entities },
//       disableClose: true,
//       autoFocus: false,
//       restoreFocus: false
//     });
//   }
// }
