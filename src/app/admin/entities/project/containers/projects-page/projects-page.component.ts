// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { MatDialog } from '@angular/material/dialog';
//
// import { FilterItem, TableType } from "../../../../models/table.model";
// import { FormFieldType } from '../../../../models/dialog.model';
// import { ProjectDialogComponent } from '../project-dialog/project-dialog.component';
// // import { ProjectEntityService } from '../../store/services/project.entity.service';
// import { skip } from 'rxjs/operators';
//
// import { DialogMode } from '../../../../enums/dialog';
// import { Store } from '@ngrx/store';
// import { AdminActions } from '../../../../store/action.types';
// import { AppProject } from "../../models/project";
// import { AppOrganization } from "../../../organization/models/organization";
// import { AppSourceType } from "../../../source-type/models/source-type";
// import { TABLE_ANIMATION } from "../../../../animation";
// // import { PROPERTIES } from '../../project.module';
// import {PROPERTIES} from "../../config";
// import { BaseEntitiesPage } from "../../../../components/base-entities-page/base-entities-page";
// import {ENTITY_NAME, ROLES} from "../../../../enums/entities";
// import {
//   EntitiesPageHeaderComponent
// } from "../../../../components/base-entities-page/entities-page-header/entities-page-header.component";
// import {
//   DataTableFilterComponent
// } from "../../../../components/base-entities-page/data-table-filter/data-table-filter.component";
// import {LoaderComponent} from "../../../../../shared/components/loader/loader.component";
// import {ProjectCardComponent} from "../../components/project-card/project-card.component";
// import {TranslatePipe} from "@ngx-translate/core";
// import {MatPaginator} from "@angular/material/paginator";
// import {TableQueryReflectorDirective} from "../../../../directives/table-query-reflector.directive";
// import {ProjectTableRowComponent} from "../../components/project-table-row/project-table-row.component";
// import {ProjectService} from "../../services/project.service";
// import {EntitiesPageComponent} from "../../../../components/entities-page/entities-page.component";
//
//
// @Component({
//   selector: 'rb-projects-page',
//   templateUrl: './projects-page.component.html',
//   animations: TABLE_ANIMATION,
//   imports: [
//     EntitiesPageHeaderComponent,
//     DataTableFilterComponent,
//     LoaderComponent,
//     ProjectCardComponent,
//     TranslatePipe,
//     MatPaginator,
//     TableQueryReflectorDirective,
//     ProjectTableRowComponent,
//     EntitiesPageComponent
//   ]
// })
// export class ProjectsPageComponent
//   extends BaseEntitiesPage<AppProject, ProjectDialogComponent>
//   implements OnInit, OnDestroy
// {
//   name = ENTITY_NAME.project
//   // protected readonly ROLES = ROLES;
//   protected readonly PROPERTIES = PROPERTIES;
//
//   // override type = TableType.GET_ALL_FROM_STORE;
//   override type = TableType.GET_ALL
//
//   organizationName?: string =
//     this.activatedRoute.snapshot.parent?.parent?.params['id'];
//   organizations: AppOrganization[] =
//     this.activatedRoute.snapshot.data['organizations'];
//   sourceTypes: AppSourceType[] =
//     this.activatedRoute.snapshot.data['sourceTypes'];
//
//   override filters: FilterItem[] = [
//     {
//       name: 'search:projectName,description',
//       label: 'Search ...',//'ADMIN.project.projectName.tableLabel',
//       type: FormFieldType.INPUT,
//     },
//   ];
//
//   override gridView = true;
//
//   constructor(
//     router: Router,
//     activatedRoute: ActivatedRoute,
//     dialog: MatDialog,
//     entityService: ProjectService, //ProjectEntityService,
//     private store: Store
//   ) {
//     super(router, activatedRoute, dialog, entityService);
//   }
//
//   ngOnInit(): void {
//     console.log('Class: ProjectsPageComponent, Function: ngOnInit, Line 67 ' , );
//     this.store.dispatch(
//       AdminActions.projectSelected({ selectedProject: null })
//     );
//     if (this.organizationName) {
//       this.entities = this.entities.filter(
//         (v) => v.organization.name === this.organizationName
//       );
//     }
//     this.init();
//   }
//
//   ngOnDestroy() {
//     this.destroy();
//   }
//
//   override subscribeToStoreEntities() {
//     this.entityService.entities$?.pipe(skip(1)).subscribe({
//       next: (value) => {
//         this.entities = value;
//         if (this.organizationName) {
//           this.entities = this.entities.filter(
//             (v) => v.organization.name === this.organizationName
//           );
//         }
//         this.filteredAndSortedEntities = this.entities;
//         //! this.filteredAndSortedEntities = this.entities.filter((i: any) => !i['name'].startsWith("@DEL_") );
//         this.applyFilter();
//         this.applySort();
//         this.applyPage();
//       },
//     });
//   }
//
//   override getDialogRef(mode: DialogMode, entity?: AppProject) {
//     return this.dialog.open(ProjectDialogComponent, {
//       data: {
//         mode,
//         entity,
//         entities: this.entities,
//         organizations: this.organizations,
//         organizationName: this.organizationName,
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
// }
