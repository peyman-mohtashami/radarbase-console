import {Routes} from "@angular/router";
import {GroupsResolver} from "./services/groups.resolver";
import {GroupListPageComponent} from './containers/group-list-page/group-list-page.component';

export const groupRoutes: Routes = [
  {
    path: '',
    component: GroupListPageComponent,
    resolve: {
      entities: GroupsResolver,
    },
  },
  {
    path: '**',
    redirectTo: '',
  }
];
