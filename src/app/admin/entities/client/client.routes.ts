import {Routes} from "@angular/router";
import {ClientsResolver} from "./services/clients.resolver";
import {ClientPageComponent} from "./containers/client-page/client-page.component";
import {ClientResolver} from "./services/client.resolver";
import {ClientDetailsPageComponent} from './containers/client-details-page/client-details-page.component';
import {ClientListPageComponent} from './containers/client-list-page/client-list-page.component';

export const clientRoutes: Routes = [
  {
    path: '',
    component: ClientListPageComponent,
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
