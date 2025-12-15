import {Routes} from "@angular/router";
import {PermissionsResolver} from "./services/permissions.resolver";
import {PermissionListPageComponent} from './containers/permission-list-page/permission-list-page.component';
import {UserResolver} from '../user/services/user.resolver';
import {UsersResolver} from '../user/services/users.resolver';

export const permissionRoutes: Routes = [
  {
    path: '',
    component: PermissionListPageComponent,
    resolve: {
      entities: PermissionsResolver,
      users: UsersResolver
    }
  },
  {
    path: '**',
    redirectTo: '',
  },
];
