import {Routes} from "@angular/router";
// import {LogsPageComponent} from "./containers/logs-page/logs-page.component";
import {LogsResolver} from "./services/logs.resolver";
import {
  ImplEntitiesPageComponent
} from "../../components/base-entities-page/impl-entities-page/impl-entities-page.component";
import {PROPERTIES} from "./config";

export const logRoutes: Routes = [
  {
    path: '',
    // component: LogsPageComponent,
    component: ImplEntitiesPageComponent,
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
