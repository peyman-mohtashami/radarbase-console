// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { MatDialog } from '@angular/material/dialog';
//
// import { FilterItem, TableType } from "../../../../models/table.model";
// import { FormFieldType } from '../../../../models/dialog.model';
// import { ProjectDialogComponent } from '../project-dialog/project-dialog.component';
// import { ProjectEntityService } from '../../store/services/project.entity.service';
// import { skip } from 'rxjs/operators';
//
// import { DialogMode } from '../../../../enums/dialog';
// import { Store } from '@ngrx/store';
// import { AdminActions } from '../../../../store/action.types';
// import { AppProject } from "../../models/project";
// import { AppOrganization } from "../../../organization/models/organization";
// import { AppSourceType } from "../../../source-type/models/source-type";
// import { TABLE_ANIMATION } from "../../../../animation";
// import { PROPERTIES } from '../../project.module';
// import { BaseEntitiesPage } from "../../../../components/base-entities-page/base-entities-page";
// import {ENTITY_NAME, ROLES} from "../../../../enums/entities";
//
//
// @Component({
//   selector: 'rb-projects-page',
//   templateUrl: '../../../../components/entities-page/entities-page.component.html',
//   animations: TABLE_ANIMATION,
//   standalone: false
// })
// export class ProjectsPageComponent
//   extends BaseEntitiesPage<AppProject, ProjectDialogComponent>
//   implements OnInit, OnDestroy
// {
//   name = ENTITY_NAME.project
//   // protected readonly ROLES = ROLES;
//   protected readonly PROPERTIES = PROPERTIES;
//
//   override type = TableType.GET_ALL_FROM_STORE;
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
//       name: 'projectName',
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
//     entityService: ProjectEntityService,
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
