// // import { Component, OnDestroy, OnInit } from '@angular/core';
// // import { ActivatedRoute, Router } from '@angular/router';
// //
// // import { MatDialog } from '@angular/material/dialog';
// //
// // import { Observable } from "rxjs";
// // import {Store} from "@ngrx/store";
// // import {map} from "rxjs/operators";
// // import {TABLE_ANIMATION} from "../../animation";
// // import { BaseEntitiesPage } from '../base-entities-page/base-entities-page';
// // import {FormFieldType} from "../../models/dialog.model";
// // import {FilterItem} from "../../models/table.model";
// // import {TableType} from "../../enums/table";
// // import {ENTITY_NAME} from "../../enums/entities";
// // import {AdminActions} from "../../store/action.types";
// // import {DialogMode} from "../../enums/dialog";
// // import {EntitiesPageHeaderComponent} from "../base-entities-page/entities-page-header/entities-page-header.component";
// // import {DataTableFilterComponent} from "../base-entities-page/data-table-filter/data-table-filter.component";
// // import {LoaderComponent} from "../../../shared/components/loader/loader.component";
// // import {TableQueryReflectorDirective} from "../../directives/table-query-reflector.directive";
// // import {TranslatePipe} from "@ngx-translate/core";
// // import {MatPaginator} from "@angular/material/paginator";
// //
// import {Component, input, output} from "@angular/core";
// import {EntitiesPageHeaderComponent} from "../base-entities-page/entities-page-header/entities-page-header.component";
// import {
//   DataTableFilterComponent,
//   FilterEvent
// } from "../base-entities-page/data-table-filter/data-table-filter.component";
// import {LoaderComponent} from "../../../shared/components/loader/loader.component";
// import {RbPageSortEvent, RbSort, TableQueryReflectorDirective} from "../../directives/table-query-reflector.directive";
// import {TranslatePipe} from "@ngx-translate/core";
// import {MatPaginator, PageEvent} from "@angular/material/paginator";
// import {ENTITY_NAME, ROLES} from "../../enums/entities";
// import {DialogMode} from "../../enums/dialog";
// import {FilterItem, TableElement} from "../../models/table.model";
// import {
//   OrganizationTableRowComponent
// } from "../../entities/organization/components/organization-table-row/organization-table-row.component";
// import {
//   OrganizationCardComponent
// } from "../../entities/organization/components/organization-card/organization-card.component";
// import {
//   ProjectTableRowComponent
// } from "../../entities/project/components/project-table-row/project-table-row.component";
// import {
//   SourceDataTableRowComponent
// } from "../../entities/source-data/components/source-data-table-row/source-data-table-row.component";
// import {
//   SourceTypeTableRowComponent
// } from "../../entities/source-type/components/source-type-table-row/source-type-table-row.component";
// import {UserTableRowComponent} from "../../entities/user/components/user-table-row/user-table-row.component";
// import {ProjectCardComponent} from "../../entities/project/components/project-card/project-card.component";
// import {
//   SubjectTableRowComponent
// } from "../../entities/subject/components/subject-table-row/subject-table-row.component";
// import {GroupTableRowComponent} from "../../entities/group/components/group-table-row/group-table-row.component";
// import {SourceTableRowComponent} from "../../entities/source/components/source-table-row/source-table-row.component";
// import {LogTableRowComponent} from "../../entities/log/components/log-table-row/log-table-row.component";
// import {AuditTableRowComponent} from "../../entities/audit/components/audit-table-row/audit-table-row.component";
// import {ClientTableRowComponent} from "../../entities/client/components/client-table-row/client-table-row.component";
//
// @Component({
//   selector: 'rb-entities-page',
//   templateUrl: './entities-page.component.html',
//   imports: [
//     EntitiesPageHeaderComponent,
//     DataTableFilterComponent,
//     LoaderComponent,
//     TableQueryReflectorDirective,
//     TranslatePipe,
//     MatPaginator,
//     OrganizationTableRowComponent,
//     OrganizationCardComponent,
//     ProjectTableRowComponent,
//     SourceDataTableRowComponent,
//     SourceTypeTableRowComponent,
//     UserTableRowComponent,
//     ProjectCardComponent,
//     SubjectTableRowComponent,
//     GroupTableRowComponent,
//     SourceTableRowComponent,
//     LogTableRowComponent,
//     AuditTableRowComponent,
//     ClientTableRowComponent
//   ],
//   // animations: TABLE_ANIMATION,
//   // imports: [
//   //   EntitiesPageHeaderComponent,
//   //   DataTableFilterComponent,
//   //   LoaderComponent,
//   //   TableQueryReflectorDirective,
//   //   TranslatePipe,
//   //   MatPaginator
//   // ]
// })
// export class EntitiesPageComponent {
//   $name = input.required<ENTITY_NAME>()
//   $page = input.required<PageEvent>()
//   $sort = input.required<RbSort>()
//   $filters = input.required<FilterItem[]>()
//   $entities = input.required<any[]>()
//   $entitiesToShow = input.required<any[]>()
//   $filteredAndSortedEntities = input.required<any[]>()
//   $loading = input.required<boolean>()
//   tableProperties = input.required<TableElement[]>()
//   $updated = input<string | number>()
//   $expandedElement = input<any>()
//   $selection = input<any>()
//   $gridViewEnabled = input<boolean>(false)
//
//   action = output<{dialogMode: DialogMode, entity: any, id: any, temp: any}>()
//   filterChange = output<FilterEvent>()
//   filterEnabledChanged = output<boolean>()
//   activeQueryChange = output<RbPageSortEvent>()
//   switchSortAction = output<TableElement>()
//   switchPageAction = output<PageEvent>()
//
//   gridView= true
//   isFilterOpened = true;
//
//
//   protected readonly ROLES = ROLES;
//   protected readonly DialogMode = DialogMode;
//
//   MIN_ENTITIES_FOR_FILTERS = 0
//   MIN_ENTITIES_FOR_PAGINATION = 0
//   pageSizeOptions = [5, 10, 20, 50, 100];
//
//   onAction(dialogMode: DialogMode, entity?: any, id?: any, temp?: any) {
//     this.action.emit({dialogMode, entity, id, temp});
//   }
//
//   handleFilterChange($event: FilterEvent) {
//     this.filterChange.emit($event)
//   }
//
//   onFilterEnabledChanged($event: boolean) {
//     this.filterEnabledChanged.emit($event)
//   }
//
//   handleActiveQueryChange($event: RbPageSortEvent) {
//     this.activeQueryChange.emit($event)
//   }
//
//   switchSort(property: TableElement) {
//     this.switchSortAction.emit(property)
//   }
//
//   switchPage($event: PageEvent) {
//     this.switchPageAction.emit($event)
//   }
// }
//
// // export class EntitiesPageComponent
// //   extends BaseEntitiesPage<AppOrganization, OrganizationDialogComponent>
// //   implements OnInit, OnDestroy {
// //
// //   protected readonly name = ENTITY_NAME.organization
// //   protected readonly PROPERTIES = PROPERTIES;
// //   protected readonly ROLES = ROLES;
// //
// //   override type = TableType.GET_ALL_FROM_STORE;
// //
// //   override filters: FilterItem[] = [
// //     { name: 'name', label: 'Name', type: FormFieldType.INPUT },
// //     {
// //       name: 'location',
// //       label: 'Location',
// //       type: FormFieldType.INPUT,
// //     },
// //   ];
// //
// //   gridView = true;
// //
// //   constructor(
// //     router: Router,
// //     activatedRoute: ActivatedRoute,
// //     dialog: MatDialog,
// //     entityService: OrganizationEntityService,
// //     private store: Store
// //   ) {
// //     super(router, activatedRoute, dialog, entityService);
// //   }
// //
// //   ngOnInit(): void {
// //     this.store.dispatch(
// //       AdminActions.projectSelected({ selectedProject: null })
// //     );
// //     this.init();
// //   }
// //
// //   ngOnDestroy() {
// //     this.destroy();
// //   }
// //
// //   override getDialogRef(mode: DialogMode, entity?: AppOrganization) {
// //     return this.dialog.open(OrganizationDialogComponent, {
// //       data: { mode, entity, entities: this.entities },
// //       panelClass: 'tailwind-slide-panel',
// //       width: '50%',
// //       height: '100vh',
// //       position: { right: '0' },
// //       hasBackdrop: true,
// //       disableClose: true,
// //       autoFocus: false,
// //       restoreFocus: false
// //     });
// //   }
// //
// //   override delete(entity: AppOrganization): Observable<string | number> {
// //     return this.entityService.update({...entity, name: `@DEL_${entity.name}`}).pipe(
// //       map(o => o.name)
// //     );
// //     // if (this.type === TableType.GET_ALL_FROM_STORE) {
// //     //   return this.entityService.delete(`${entity['name']},${entity['id']}`);
// //     // }
// //     // return this.entityService.delete(entity['name']);
// //     // // throw new Error('BaseListPageComponent "delete" method not implemented');
// //   }
// // }
