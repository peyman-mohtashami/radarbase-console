import {Routes} from "@angular/router";
import {ConfigListResolver} from "./services/config-list.resolver";
import {ConfigListPageComponent} from './pages/config-list-page/config-list-page.component';

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
      configList: ConfigListResolver,
    },
  },
];
