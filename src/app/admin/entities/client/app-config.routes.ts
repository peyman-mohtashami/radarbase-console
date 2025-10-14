import {Routes} from "@angular/router";
import {ClientsResolver} from "./services/clients.resolver";
import {ClientPageComponent} from "./containers/client-page/client-page.component";
import {ClientResolver} from "./services/client.resolver";
import {ClientsPageComponent} from './containers/clients-page/clients-page.component';
import {ClientDetailsPageComponent} from './containers/client-details-page/client-details-page.component';
import {ClientsSelectPageComponent} from './containers/clients-select-page/clients-select-page.component';
import {Sample} from '../../components/sample/sample';

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
