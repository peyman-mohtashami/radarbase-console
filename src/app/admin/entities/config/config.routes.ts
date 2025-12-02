import {Routes} from "@angular/router";
import {ConfigsPageComponent} from "./containers/configs-page/configs-page.component";
import {ConfigsResolver} from "./services/configs.resolver";

export const configRoutes: Routes = [
  {
    path: '',
    redirectTo: 'configs',
    pathMatch: "full"
  },
  {
    path: 'configs',
    component: ConfigsPageComponent,
    resolve: {
      entities: ConfigsResolver,
    },
  },
];
