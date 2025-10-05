import {Routes} from "@angular/router";
import {ClientsResolver} from "./services/clients.resolver";
import {ClientPageComponent} from "./containers/client-page/client-page.component";
import {ClientResolver} from "./services/client.resolver";
import {ClientsPageComponent} from './containers/clients-page/clients-page.component';

export const clientRoutes: Routes = [
  {
    path: '',
    component: ClientsPageComponent,
    resolve: {
      entities: ClientsResolver,
    },
  },
  {
    path: ':id',
    component: ClientPageComponent,
    resolve: {
      entity: ClientResolver,
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
