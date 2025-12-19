import {Routes} from "@angular/router";
import {LogListResolver} from "./services/log-list.resolver";
import {LogListPageComponent} from './containers/log-list-page/log-list-page.component';

export const logRoutes: Routes = [
  {
    path: '',
    component: LogListPageComponent,
    resolve: {
      logList: LogListResolver,
    },
  },
  {
    path: '**',
    redirectTo: '',
  }
];
