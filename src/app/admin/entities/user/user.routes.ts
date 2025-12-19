import {Routes} from "@angular/router";
import {UsersResolver} from "./services/users.resolver";
import {roleGuard} from "../../../core/auth/guards/role.guard";
import {UserPageComponent} from "./containers/user-page/user-page.component";
import {UserResolver} from "./services/user.resolver";
import {UserListPageComponent} from './containers/user-list-page/user-list-page.component';
import {AllOrganizationsResolver} from '../organization/services/all-organizations.resolver';
import {AllProjectsResolver} from '../project/services/all-projects.resolver';

export const userRoutes: Routes = [
  {
    path: '',
    component: UserListPageComponent,
    resolve: {
      entities: UsersResolver,
      projects: AllProjectsResolver,
      organizations: AllOrganizationsResolver,
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
      projects: AllProjectsResolver,
      organizations: AllOrganizationsResolver,
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
