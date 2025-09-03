import {Routes} from "@angular/router";
import {filters, PROPERTIES} from "./config";
import {ProtocolsResolver} from "./services/protocols.resolver";
import {ProtocolEditPageComponent} from "./containers/protocol-edit-page/protocol-edit-page.component";
import {CommonEntitiesPageComponent} from '../../components/common-entities-page/common-entities-page.component';

export const protocolsRoutes: Routes = [
  {
    path: '',
    // component: QuestionnairesPageComponent,
    component: CommonEntitiesPageComponent,
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
