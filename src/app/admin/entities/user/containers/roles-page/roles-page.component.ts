// import { Component, OnDestroy, OnInit } from '@angular/core';
// import {ActivatedRoute, Router, RouterLink} from '@angular/router';
// import { map } from 'rxjs/operators';
//
// import { MatDialog } from '@angular/material/dialog';
//
// import { FilterItem } from "../../../../models/table.model";
// import { FormFieldType } from '../../../../models/dialog.model';
// // import { UserEntityService } from '../../store/services/user.entity.service';
// import { RoleDialogComponent } from '../role-dialog/role-dialog.component';
// import { DialogMode } from '../../../../enums/dialog';
// import { Store } from '@ngrx/store';
// import { organization, project } from '../../../../store/admin.selectors';
// import { AppUser } from "../../models/user";
// import { AppOrganization } from "../../../organization/models/organization";
// import { AppProject } from "../../../project/models/project";
// import { TABLE_ANIMATION } from "../../../../animation";
// import { ENTITY_NAME, ROLES } from "../../../../enums/entities";
// // import { PROPERTIES } from "../../user.module";
// import {PROPERTIES} from "../../config";
// import { Observable } from "rxjs";
// import {BaseEntitiesPage} from "../../../../components/base-entities-page/base-entities-page";
// import {user} from "../../../../../core/auth/store/auth.selectors";
// import {
//   EntitiesPageHeaderComponent
// } from "../../../../components/base-entities-page/entities-page-header/entities-page-header.component";
// import {
//   DataTableFilterComponent
// } from "../../../../components/base-entities-page/data-table-filter/data-table-filter.component";
// import {AsyncPipe, NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
// import {LoaderComponent} from "../../../../../shared/components/loader/loader.component";
// import {TableQueryReflectorDirective} from "../../../../directives/table-query-reflector.directive";
// import {TranslatePipe} from "@ngx-translate/core";
// import {UserActivatedComponent} from "../../components/user-activated/user-activated.component";
// import {UserRolesComponent} from "../../components/user-roles/user-roles.component";
// import {UserDetailsComponent} from "../../components/user-details/user-details.component";
// import {MatIconButton} from "@angular/material/button";
// import {MatPaginator} from "@angular/material/paginator";
// import {UserService} from "../../services/user.service";
//
// @Component({
//   selector: 'rb-roles-page',
//   templateUrl: './roles-page.component.html',
//   animations: TABLE_ANIMATION,
//   imports: [
//     EntitiesPageHeaderComponent,
//     DataTableFilterComponent,
//     NgIf,
//     LoaderComponent,
//     TableQueryReflectorDirective,
//     NgForOf,
//     TranslatePipe,
//     NgClass,
//     NgSwitch,
//     NgSwitchCase,
//     UserActivatedComponent,
//     UserRolesComponent,
//     NgSwitchDefault,
//     MatIconButton,
//     AsyncPipe,
//     MatIconButton,
//     UserDetailsComponent,
//     MatPaginator,
//     RouterLink
//   ]
// })
// export class RolesPageComponent
//   extends BaseEntitiesPage<AppUser, RoleDialogComponent>
//   implements OnInit, OnDestroy
// {
//   name = ENTITY_NAME.role
//   protected readonly PROPERTIES = PROPERTIES;
//   // protected readonly ROLES = ROLES;
//
//   user$ = this.store.select(user);
//
//   organization?: AppOrganization | null;
//   project?: AppProject | null;
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
//         { value: 'Has Permission', label: 'ADMIN.user.roles.hasPermission' },
//         {
//           value: "Doesn't Have Permission",
//           label: 'ADMIN.user.roles.doesntHavePermission',
//         },
//         // {value: 'ROLE_PROJECT_ADMIN', label: 'ROLE_PROJECT_ADMIN'}
//       ],
//     },
//     // {name: 'projectOrOrganization', label: 'Filter by Organization or Project', type: FormFieldType.INPUT},
//   ];
//
//   private allEntities?: AppUser[];
//
//   constructor(
//     router: Router,
//     activatedRoute: ActivatedRoute,
//     dialog: MatDialog,
//     entityService: UserService, //UserEntityService,
//     private store: Store
//   ) {
//     super(router, activatedRoute, dialog, entityService);
//   }
//
//   ngOnInit(): void {
//     this.store
//       .select(organization)
//       .subscribe((organization) => (this.organization = organization));
//     this.store.select(project).subscribe((project) => (this.project = project));
//     this.init();
//   }
//
//   ngOnDestroy() {
//     this.destroy();
//   }
//
//   override subscribeToStoreEntities() {
//     this.entityService.entities$?.pipe(
//       map((entities) => {
//         this.allEntities = entities;
//         return entities.map(u => {
//           if (u._roles?._sysAdmin) {
//             return {...u, selectedRoles: ROLES.SYS_ADMIN};
//             // u.selectedRoles = ROLES.SYS_ADMIN;
//           }
//           if (this.organization && u._roles?._organizationAdmin) {
//             const exists = u._roles._organizations.some((o: any) => o.id === this.organization?.id);
//             if (exists) {
//               // u.selectedRoles = ROLES.ORGANIZATION_ADMIN;
//               return {...u, selectedRoles: ROLES.ORGANIZATION_ADMIN};
//             }
//           }
//           if (this.project && u._roles?._projectAdmin) {
//             const exists = u._roles._projects.some((o: any) => o.id === this.project?.id);
//             if (exists) {
//               // u.selectedRoles = ROLES.PROJECT_ADMIN;
//               return {...u, selectedRoles: ROLES.PROJECT_ADMIN};
//             }
//           }
//           return {...u, selectedRoles: undefined};
//         })
//       }),
//       map((entities) => entities.filter(u => !!u.selectedRoles))
//     ).subscribe((entities) => {
//         this.entities = entities;
//         // this.dataSource.data = this.entities;
//         // this.dataSource.paginator = this.paginator;
//         // this.dataSource.sort = this.sort;
//       });
//   }
//
//   override delete(entity: AppUser): Observable<string | number> {
//     const emptyRole = {
//       _sysAdmin: false,
//       _organizationAdmin: false,
//       _projectAdmin: false,
//       _organizations: [],
//       _projects: []
//     }
//     const _roles = entity._roles ?? emptyRole;
//
//     const _organizations = _roles._organizations.filter(o => o.id !== this.organization?.id) ?? [];
//     const _projects = _roles._projects.filter(p => p.id !== this.project?.id) ?? [];
//
//     if (this.project) {
//       const updatedEntity: AppUser = {
//         ...entity,
//         _roles: {
//           ..._roles,
//           _projectAdmin: !!_projects.length,
//           _projects
//         }
//       };
//       return this.entityService.update(updatedEntity).pipe(map(e => e.id));
//     }
//     const updatedEntity: AppUser = {
//       ...entity,
//       _roles: {
//         ..._roles,
//         _organizationAdmin: !!_organizations.length,
//         _organizations
//       }
//     };
//     return this.entityService.update(updatedEntity).pipe(map(e => e.id));
//
//   }
//
//   override update(entity: AppUser): Observable<AppUser> {
//     const emptyRole = {
//       _sysAdmin: false,
//       _organizationAdmin: false,
//       _projectAdmin: false,
//       _organizations: [],
//       _projects: []
//     }
//     const _roles = entity._roles ?? emptyRole;
//
//     const _organizations = _roles._organizations ?? [];
//     const _projects = _roles._projects ?? [];
//
//     if (this.project) {
//       const updatedEntity: AppUser = {
//         ...entity,
//         _roles: {
//           ..._roles,
//           _projectAdmin: true,
//           _projects: [..._projects, {name: this.project.name, id: this.project.id}]
//         }
//       };
//       return this.entityService.update(updatedEntity);
//     }
//     const updatedEntity: AppUser = {
//       ...entity,
//       _roles: {
//         ..._roles,
//         _organizationAdmin: true,
//         _organizations: [..._organizations, {name: this.organization?.name, id: this.organization?.id}]
//       }
//     };
//     return this.entityService.update(updatedEntity);
//   }
//
//   override getDialogRef(mode: DialogMode, entity?: AppUser) {
//     return this.dialog.open(RoleDialogComponent, {
//       data: {
//         mode,
//         entity: entity,
//         entities: this.allEntities,
//         // project: this.project,
//         // organization: this.organization,
//       },
//       panelClass: ['w-full', 'md:w-1/2'],
//       disableClose: true,
//     });
//   }
//
//   // override customSortingDataAccessor(
//   //   item: AppUser,
//   //   property: string
//   // ): string | number | null {
//   //   // if (property === 'id') {
//   //   //   return item.id;
//   //   // }
//   //   if (property === 'roles') {
//   //     let roles = item.roles?.filter(
//   //       (r) =>
//   //         r.organizationName === this.organization?.name ||
//   //         r.authorityName === 'ROLE_SYS_ADMIN'
//   //     );
//   //     if (this.project) {
//   //       roles = item.roles?.filter(
//   //         (r) =>
//   //           r.projectName === this.project?.name ||
//   //           r.authorityName === 'ROLE_SYS_ADMIN'
//   //       );
//   //     }
//   //     // console.log(item.selectedRoles[0]?.authorityName)
//   //     // return roles?[0].authorityName || null;
//   //     return roles && roles[0] && roles[0].authorityName
//   //       ? roles[0].authorityName
//   //       : null;
//   //   }
//   //   return null;
//   // }
//   //
//   // override customFilterPredicate(
//   //   data: AppUser,
//   //   filter: string,
//   //   searchTerms: { [key: string]: string }
//   // ) {
//   //   for (const key in searchTerms) {
//   //     if (Object.prototype.hasOwnProperty.call(searchTerms, key)) {
//   //       switch (key) {
//   //         case 'authority':
//   //           if (
//   //             !searchTerms[key] ||
//   //             !data.roles?.find(
//   //               (role) => role.authorityName === searchTerms[key]
//   //             )
//   //           ) {
//   //             return false;
//   //           }
//   //           break;
//   //         case 'projectOrOrganization':
//   //           if (
//   //             !searchTerms[key] ||
//   //             !data.roles?.find(
//   //               (role) =>
//   //                 role.projectName
//   //                   ?.toString()
//   //                   .toLowerCase()
//   //                   .indexOf(searchTerms[key].toLowerCase()) !== -1
//   //             ) ||
//   //             !data.roles?.find(
//   //               (role) =>
//   //                 role.organizationName
//   //                   ?.toString()
//   //                   .toLowerCase()
//   //                   .indexOf(searchTerms[key].toLowerCase()) !== -1
//   //             )
//   //           ) {
//   //             return false;
//   //           }
//   //           break;
//   //       }
//   //     }
//   //   }
//   //   return super.customFilterPredicate(data, filter, searchTerms);
//   // }
//
// }
