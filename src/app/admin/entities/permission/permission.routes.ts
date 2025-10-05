import {Routes} from "@angular/router";
import {PermissionsResolver} from "./services/permissions.resolver";
import {roleGuard} from "../../../core/auth/guards/role.guard";
import {PermissionsPageComponent} from './containers/permissions-page/permissions-page.component';

export const permissionRoutes: Routes = [
  {
    path: '',
    component: PermissionsPageComponent,
    resolve: {
      entities: PermissionsResolver,
    },
    canActivate: [roleGuard],
    data: {
      allowedRoles: ['ROLE_SYS_ADMIN'],
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
