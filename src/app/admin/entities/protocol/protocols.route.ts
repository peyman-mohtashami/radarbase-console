import {Routes} from "@angular/router";
import {
  ImplEntitiesPageComponent
} from "../../components/base-entities-page/impl-entities-page/impl-entities-page.component";
import {filters, PROPERTIES} from "./config";
import {ProtocolsResolver} from "./services/protocols.resolver";
import {ProtocolEditPageComponent} from "./containers/protocol-edit-page/protocol-edit-page.component";

export const protocolsRoutes: Routes = [
  {
    path: '',
    // component: QuestionnairesPageComponent,
    component: ImplEntitiesPageComponent,
    data: {
      entityName: 'protocol',
      // config: config,
      tableProperties: PROPERTIES,
      filters: filters
    },
    resolve: {
      entities: ProtocolsResolver,
    },
  },
  {
    path: ':id',
    component: ProtocolEditPageComponent,
  },
]
