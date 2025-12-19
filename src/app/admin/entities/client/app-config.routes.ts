import {Routes} from "@angular/router";
import {ClientResolver} from "./services/client.resolver";
import {ClientsSelectPageComponent} from './containers/clients-select-page/clients-select-page.component';
import {AllClientsResolver} from './services/all-clients.resolver';

export const appConfigRoutes: Routes = [
  {
    path: '',
    component: ClientsSelectPageComponent,
    resolve: {
      entities: AllClientsResolver,
    },
    children: [
      {
        path: ':id',
        resolve: {
          entity: ClientResolver,
        },
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../config/config.routes').then((m) => m.configRoutes),
          },
          {
            path: '**',
            redirectTo: '',
          }
        ]
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
  },
];
