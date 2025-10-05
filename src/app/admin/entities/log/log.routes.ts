import {Routes} from "@angular/router";
import {LogsResolver} from "./services/logs.resolver";
import {LogsPageComponent} from './containers/logs-page/logs-page.component';

export const logRoutes: Routes = [
  {
    path: '',
    component: LogsPageComponent,
    resolve: {
      entities: LogsResolver,
    },
  },
  {
    path: '**',
    redirectTo: '',
  }
];
