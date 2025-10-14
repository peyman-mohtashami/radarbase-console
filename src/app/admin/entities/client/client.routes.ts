import {Routes} from "@angular/router";
import {ClientsResolver} from "./services/clients.resolver";
import {ClientPageComponent} from "./containers/client-page/client-page.component";
import {ClientResolver} from "./services/client.resolver";
import {ClientsPageComponent} from './containers/clients-page/clients-page.component';
import {ClientDetailsPageComponent} from './containers/client-details-page/client-details-page.component';

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
    children: [
      {
        path: '',
        redirectTo: 'configs',
        pathMatch: 'full',
      },
      {
        path: 'configs',
        loadChildren: () =>
          import('../config/config.routes').then((m) => m.configRoutes),
      },
      {
        path: 'details',
        component: ClientDetailsPageComponent,
      },
      {
        path: '**',
        redirectTo: 'projects',
      }
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
