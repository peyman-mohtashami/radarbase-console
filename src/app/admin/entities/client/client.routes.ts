import {Routes} from "@angular/router";
import {ClientsResolver} from "./services/clients.resolver";
import {ClientPageComponent} from "./containers/client-page/client-page.component";
import {ClientResolver} from "./services/client.resolver";
import {
  ImplEntitiesPageComponent
} from "../../components/base-entities-page/impl-entities-page/impl-entities-page.component";
import {PROPERTIES} from "./config";
import {filters} from "./config";
import {ClientsSelectPageComponent} from "./containers/clients-select-page/clients-select-page.component";
// import {DummyComponent} from "../config/components/dummy/dummy.component";

export const clientRoutes: Routes = [
  {
    path: '',
    // component: ClientsPageComponent,
    component: ImplEntitiesPageComponent,
    resolve: {
      entities: ClientsResolver,
    },
    data: {
      entityName: 'client',
      tableProperties: PROPERTIES,
      filters: filters
    },
  },
  {
    path: 'apps',
    component: ClientsSelectPageComponent,
    resolve: {
      entities: ClientsResolver,
    },
    children: [
      // {
      //   path: '',
      //   loadChildren: () =>
      //     import('../config/config.routes').then((m) => m.configRoutes),
      // },
      // {
      //   path: ':id/protocols',
      //   loadChildren: () =>
      //     import('../protocol/protocol.module').then((m) => m.ProtocolModule),
      // },
      {
        path: ':id',
        // component: DummyComponent,
        loadChildren: () =>
          import('../config/config.routes').then((m) => m.configRoutes),
        // // loadChildren: () =>
        // //   import('../config/config.module').then((m) => m.ConfigModule),
      },
    ],
  },
  {
    path: ':id',
    component: ClientPageComponent,
    resolve: {
      entity: ClientResolver,
      entities: ClientsResolver,
    },
    children: [
      {
        path: '',
        redirectTo: 'general',
        pathMatch: 'full',
      },
      // {
      //   path: '',
      //   redirectTo: 'configs',
      //   pathMatch: 'full',
      // },
      // {
      //   path: 'configs',
      //   loadChildren: () =>
      //     import('../config/config.module').then((m) => m.ConfigModule),
      // },
      // {
      //   path: '',
      //   redirectTo: 'general',
      //   pathMatch: 'full',
      // },
      // {
      //   path: 'general',
      //   redirectTo: 'configs',
      //   pathMatch: 'full',
      // },
      // {
      //   path: 'protocols',
      //   loadChildren: () =>
      //     import('../protocol/protocol.module').then((m) => m.ProtocolModule),
      // },
      // {
      //   path: 'questionnaires',
      //   loadChildren: () =>
      //     import('../questionnaire/questionnaire.module').then(
      //       (m) => m.QuestionnaireModule
      //     ),
      // },
      {
        path: ':category',
        loadChildren: () =>
          import('../config/config.routes').then((m) => m.configRoutes),
      },
      // {
      //   path: ':category',
      //   loadChildren: () =>
      //     import('../config/config.module').then((m) => m.ConfigModule),
      // },

      // {
      //   path: '**',
      //   redirectTo: "../",
      // },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
