import {Routes} from "@angular/router";
import {UsersResolver} from "./services/users.resolver";
import {roleGuard} from "../../../core/auth/guards/role.guard";
import {UserPageComponent} from "./containers/user-page/user-page.component";
import {UserResolver} from "./services/user.resolver";
import {UsersPageComponent} from './containers/users-page/users-page.component';
import {ProjectsResolver} from '../project/services/projects.resolver';
import { OrganizationsResolver } from "../organization/services/organizations.resolver";

export const userRoutes: Routes = [
  {
    path: '',
    component: UsersPageComponent,
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
  // {
  //   path: 'roles',
  //   component: RolesPageComponent,
  //   resolve: {
  //     entities: UsersResolver,
  //     projects: ProjectsResolver,
  //     organizations: OrganizationsResolver,
  //   },
  // },
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
