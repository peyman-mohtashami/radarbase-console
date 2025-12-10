import {Routes} from "@angular/router";
import {UsersResolver} from "./services/users.resolver";
import {roleGuard} from "../../../core/auth/guards/role.guard";
import {UserPageComponent} from "./containers/user-page/user-page.component";
import {UserResolver} from "./services/user.resolver";
import {ProjectsResolver} from '../project/services/projects.resolver';
import { OrganizationsResolver } from "../organization/services/organizations.resolver";
import {UserListPageComponent} from './containers/user-list-page/user-list-page.component';

export const userRoutes: Routes = [
  {
    path: '',
    component: UserListPageComponent,
    resolve: {
      entities: UsersResolver,
      projects: ProjectsResolver,
      organizations: OrganizationsResolver,
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
      entity: UserResolver,
      entities: UsersResolver,
      projects: ProjectsResolver,
      organizations: OrganizationsResolver,
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
