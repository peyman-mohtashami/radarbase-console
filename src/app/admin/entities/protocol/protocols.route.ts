import {Routes} from "@angular/router";
import {ProtocolsResolver} from "./services/protocols.resolver";
import {ProtocolListPageComponent} from './containers/protocol-list-page/protocol-list-page.component';

export const protocolsRoutes: Routes = [
  {
    path: '',
    component: ProtocolListPageComponent,
    resolve: {
      entities: ProtocolsResolver,
    },
  },
]
