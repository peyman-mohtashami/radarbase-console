import {Routes} from "@angular/router";
import {ProtocolsResolver} from "./services/protocols.resolver";
import {ProtocolsPageComponent} from "./containers/protocols-page/protocols-page.component";

export const protocolsRoutes: Routes = [
  {
    path: '',
    component: ProtocolsPageComponent,
    resolve: {
      entities: ProtocolsResolver,
    },
  },
]
