// import { Component, OnDestroy, OnInit } from "@angular/core";
// import { ActivatedRoute, Router } from "@angular/router";
//
// import { MatDialog } from "@angular/material/dialog";
//
// import {FilterItem, TableType} from "../../../../models/table.model";
// import { FormFieldType } from "../../../../models/dialog.model";
// import { UserDialogComponent } from "../user-dialog/user-dialog.component";
// import { UserEntityService } from "../../store/services/user.entity.service";
// import { DialogMode } from "../../../../enums/dialog";
// import { AppUser } from "../../models/user";
// import { AppProject } from "../../../project/models/project";
// import { AppOrganization } from "../../../organization/models/organization";
// import { TABLE_ANIMATION } from "../../../../animation";
// import { ENTITY_NAME } from "../../../../enums/entities";
// import { PROPERTIES } from "../../user.module";
// import {AuthState} from "../../../../../core/auth/store/reducers";
// import {Store} from "@ngrx/store";
// import {user} from "../../../../../core/auth/store/auth.selectors";
// import {BaseEntitiesPage} from "../../../../components/base-entities-page/base-entities-page";
//
// @Component({
//     selector: 'rb-users-page',
//   templateUrl: '../../../../components/entities-page/entities-page.component.html',
//     animations: TABLE_ANIMATION,
// })
// export class UsersPageComponent
//   extends BaseEntitiesPage<AppUser, UserDialogComponent>
//   implements OnInit, OnDestroy
// {
//   name = ENTITY_NAME.user
//   protected readonly PROPERTIES = PROPERTIES;
//
//   override type = TableType.GET_ALL_FROM_STORE;
//
//   user$ = this.store.select(user);
//
//   projects: AppProject[] = this.activatedRoute.snapshot.data['projects'];
//   organizations: AppOrganization[] =
//     this.activatedRoute.snapshot.data['organizations'];
//
//   override filters: FilterItem[] = [
//     {
//       name: 'login',
//       label: 'ADMIN.user.login.tableLabel',
//       type: FormFieldType.INPUT,
//     },
//     {
//       name: 'email',
//       label: 'ADMIN.user.email.tableLabel',
//       type: FormFieldType.INPUT,
//     },
//     {
//       name: 'authority',
//       advanced: true,
//       label: 'ADMIN.user.authority.tableLabel',
//       type: FormFieldType.SELECT,
//       options: [
//         { value: 'ROLE_SYS_ADMIN', label: 'ROLE_SYS_ADMIN' },
//         { value: 'ROLE_ORGANIZATION_ADMIN', label: 'ROLE_ORGANIZATION_ADMIN' },
//         { value: 'ROLE_PROJECT_ADMIN', label: 'ROLE_PROJECT_ADMIN' },
//       ],
//     },
//     {
//       name: 'projectOrOrganization',
//       advanced: true,
//       label: 'ADMIN.user.projectOrOrganization.tableLabel',
//       type: FormFieldType.INPUT,
//     },
//   ];
//
//   constructor(
//     router: Router,
//     activatedRoute: ActivatedRoute,
//     dialog: MatDialog,
//     entityService: UserEntityService,
//     private store: Store<AuthState>
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
//   override getDialogRef(mode: DialogMode, entity?: AppUser) {
//     return this.dialog.open(UserDialogComponent, {
//       data: {
//         mode,
//         entity: entity,
//         entities: this.entities,
//         projects: this.projects,
//         organizations: this.organizations,
//       },
//       // panelClass: ['scrollable', 'w-full', mode === DialogMode.DELETE ? 'sm:w-1/2': 'sm:w-full'],
//       // disableClose: true,
//       panelClass: 'tailwind-slide-panel',
//       // panelClass: ['scrollable', 'w-full', 'sm:w-1/2'],
//       width: '50%', // adjust as needed
//       height: '100vh',
//       position: { right: '0' },
//       hasBackdrop: true,
//       disableClose: true,
//       autoFocus: false,
//       restoreFocus: false
//     });
//   }
// }
