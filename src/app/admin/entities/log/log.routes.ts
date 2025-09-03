import {Routes} from "@angular/router";
// import {LogsPageComponent} from "./containers/logs-page/logs-page.component";
import {LogsResolver} from "./services/logs.resolver";
import {PROPERTIES} from "./config";
import {CommonEntitiesPageComponent} from '../../components/common-entities-page/common-entities-page.component';

export const logRoutes: Routes = [
  {
    path: '',
    // component: LogsPageComponent,
    component: CommonEntitiesPageComponent,
    resolve: {
      entities: LogsResolver,
    },
    data: {
      entityName: 'log',
      tableProperties: PROPERTIES,
      disableAddButton: true,
    },
  },
];
