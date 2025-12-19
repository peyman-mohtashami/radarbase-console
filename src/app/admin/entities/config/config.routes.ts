import {Routes} from "@angular/router";
import {ConfigsResolver} from "./services/configs.resolver";
import {ConfigListPageComponent} from './containers/config-list-page/config-list-page.component';

export const configRoutes: Routes = [
  {
    path: '',
    redirectTo: 'configs',
    pathMatch: "full"
  },
  {
    path: 'configs',
    component: ConfigListPageComponent,
    resolve: {
      entities: ConfigsResolver,
    },
  },
];
