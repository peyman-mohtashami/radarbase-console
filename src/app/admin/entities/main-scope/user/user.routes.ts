import {Routes} from "@angular/router";
import {UserListResolver} from "./services/user-list.resolver";
import {roleGuard} from "../../../../core/auth/guards/role.guard";
import {UserPageComponent} from "./containers/user-page/user-page.component";
import {UserResolver} from "./services/user.resolver";
import {UserListPageComponent} from './containers/user-list-page/user-list-page.component';
import {UserDetailsPageComponent} from './containers/user-details-page/user-details-page.component';

export const userRoutes: Routes = [
  {
    path: '',
    component: UserListPageComponent,
    resolve: {
      userList: UserListResolver,
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
    },
    children: [
      {
        path: '',
        redirectTo: 'details',
        pathMatch: 'full',
      },
      {
        path: 'details',
        component: UserDetailsPageComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
