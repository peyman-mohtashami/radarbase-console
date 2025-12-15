import {Routes} from "@angular/router";
import {LogsResolver} from "./services/logs.resolver";
import {LogListPageComponent} from './containers/log-list-page/log-list-page.component';

export const logRoutes: Routes = [
  {
    path: '',
    component: LogListPageComponent,
    resolve: {
      entities: LogsResolver,
    },
  },
  {
    path: '**',
    redirectTo: '',
  }
];
