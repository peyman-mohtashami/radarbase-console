import {Routes} from "@angular/router";
import {PermissionListResolver} from "./services/permission-list.resolver";
import {PermissionListPageComponent} from './pages/permission-list-page/permission-list-page.component';
import {UserListResolver} from '../user/services/user-list.resolver';

export const permissionRoutes: Routes = [
  {
    path: '',
    component: PermissionListPageComponent,
    resolve: {
      permissionList: PermissionListResolver,
      userList: UserListResolver
    }
  },
  {
    path: '**',
    redirectTo: '',
  },
];
