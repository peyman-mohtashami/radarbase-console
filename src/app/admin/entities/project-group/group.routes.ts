import {Routes} from "@angular/router";
import {GroupListResolver} from "./services/group-list.resolver";
import {GroupListPageComponent} from './pages/group-list-page/group-list-page.component';

export const groupRoutes: Routes = [
  {
    path: '',
    component: GroupListPageComponent,
    resolve: {
      groupList: GroupListResolver,
    },
  },
  {
    path: '**',
    redirectTo: '',
  }
];
