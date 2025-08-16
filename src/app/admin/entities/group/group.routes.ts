import {Routes} from "@angular/router";
import {GroupsResolver} from "./services/groups.resolver";
// import {GroupsPageComponent} from "./containers/groups-page/groups-page.component";
import {
  ImplEntitiesPageComponent
} from "../../components/base-entities-page/impl-entities-page/impl-entities-page.component";
import {filters, PROPERTIES} from "./config";

export const groupRoutes: Routes = [
  {
    path: '',
    // component: GroupsPageComponent,
    component: ImplEntitiesPageComponent,
    resolve: {
      entities: GroupsResolver,
    },
    data: {
      entityName: 'group',
      tableProperties: PROPERTIES,
      filters: filters
    },
  },
];
