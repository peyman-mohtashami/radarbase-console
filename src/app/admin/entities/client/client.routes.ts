import {Routes} from "@angular/router";
import {ClientListResolver} from "./services/client-list.resolver";
import {ClientPageComponent} from "./pages/client-page/client-page.component";
import {ClientResolver} from "./services/client.resolver";
import {ClientDetailsPageComponent} from './pages/client-details-page/client-details-page.component';
import {ClientListPageComponent} from './pages/client-list-page/client-list-page.component';

export const clientRoutes: Routes = [
  {
    path: '',
    component: ClientListPageComponent,
    resolve: {
      clientList: ClientListResolver,
    },
  },
  {
    path: ':clientId',
    component: ClientPageComponent,
    resolve: {
      client: ClientResolver,
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
          import('../configuration-scope/config/config.routes').then((m) => m.configRoutes),
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
