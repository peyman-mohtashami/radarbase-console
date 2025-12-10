import {Routes} from "@angular/router";
import {ClientsResolver} from "./services/clients.resolver";
import {ClientResolver} from "./services/client.resolver";
import {ClientsSelectPageComponent} from './containers/clients-select-page/clients-select-page.component';

export const appConfigRoutes: Routes = [
  {
    path: '',
    component: ClientsSelectPageComponent,
    resolve: {
      entities: ClientsResolver,
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
