import {Routes} from "@angular/router";
import {OrganizationsResolver} from "../organization/services/organizations.resolver";
// import {UsersPageComponent} from "./containers/users-page/users-page.component";
import {UsersResolver} from "./services/users.resolver";
import {roleGuard} from "../../../core/auth/guards/role.guard";
// import {RolesPageComponent} from "./containers/roles-page/roles-page.component";
import {UserPageComponent} from "./containers/user-page/user-page.component";
import {UserResolver} from "./services/user.resolver";
import {ProjectsResolver} from "../project/services/projects.resolver";
import {filters, PROPERTIES} from "./config";
import {CommonEntitiesPageComponent} from '../../components/common-entities-page/common-entities-page.component';

export const userRoutes: Routes = [
  {
    path: '',
    // component: UsersPageComponent,
    component: CommonEntitiesPageComponent,
    resolve: {
      entities: UsersResolver,
      projects: ProjectsResolver,
      organizations: OrganizationsResolver,
    },
    canActivate: [roleGuard],
    data: {
      allowedRoles: ['ROLE_SYS_ADMIN'],
      entityName: 'user',
      tableProperties: PROPERTIES,
      filters: filters,
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
