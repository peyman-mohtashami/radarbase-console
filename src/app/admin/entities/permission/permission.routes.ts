import {Routes} from "@angular/router";
import {PermissionsResolver} from "./services/permissions.resolver";
import {roleGuard} from "../../../core/auth/guards/role.guard";
// import {UserPageComponent} from "./containers/user-page/user-page.component";
import {PermissionResolver} from "./services/permission.resolver";
import {ProjectsResolver} from '../project/services/projects.resolver';
import { OrganizationsResolver } from "../organization/services/organizations.resolver";
import {PermissionsPageComponent} from './containers/permissions-page/permissions-page.component';

export const permissionRoutes: Routes = [
  {
    path: '',
    component: PermissionsPageComponent,
    resolve: {
      entities: PermissionsResolver,
      // projects: ProjectsResolver,
      // organizations: OrganizationsResolver,
    },
    canActivate: [roleGuard],
    data: {
      allowedRoles: ['ROLE_SYS_ADMIN'],
    },
  },
  // {
  //   path: 'roles',
  //   component: RolesPageComponent,
  //   resolve: {
  //     entities: UsersResolver,
  //     projects: ProjectsResolver,
  //     organizations: OrganizationsResolver,
  //   },
  // },
  // {
  //   path: ':id',
  //   component: UserPageComponent,
  //   resolve: {
  //     entity: PermissionResolver,
  //     entities: PermissionsResolver,
  //     projects: ProjectsResolver,
  //     organizations: OrganizationsResolver,
  //   },
  // },
  {
    path: '**',
    redirectTo: '',
  },
];
