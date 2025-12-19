import {Routes} from "@angular/router";
import {UserListResolver} from "./services/user-list.resolver";
import {roleGuard} from "../../../core/auth/guards/role.guard";
import {UserPageComponent} from "./containers/user-page/user-page.component";
import {UserResolver} from "./services/user.resolver";
import {UserListPageComponent} from './containers/user-list-page/user-list-page.component';
import {OrganizationFullListResolver} from '../organization/services/organization-full-list.resolver';
import {ProjectFullListResolver} from '../project/services/project-full-list.resolver';

export const userRoutes: Routes = [
  {
    path: '',
    component: UserListPageComponent,
    resolve: {
      userList: UserListResolver,
      projectFullList: ProjectFullListResolver,
      organizationFullList: OrganizationFullListResolver,
    },
    canActivate: [roleGuard],
    data: {
      allowedRoles: ['ROLE_SYS_ADMIN'],
    },
  },
  {
    path: ':id',
    component: UserPageComponent,
    resolve: {
      user: UserResolver,
      userList: UserListResolver,
      projectFullList: ProjectFullListResolver,
      organizationFullList: OrganizationFullListResolver,
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
