import {Routes} from "@angular/router";
import {GroupsResolver} from "./services/groups.resolver";
// import {GroupsPageComponent} from "./containers/groups-page/groups-page.component";
import {filters, PROPERTIES} from "./config";
import {CommonEntitiesPageComponent} from '../../components/common-entities-page/common-entities-page.component';

export const groupRoutes: Routes = [
  {
    path: '',
    // component: GroupsPageComponent,
    component: CommonEntitiesPageComponent,
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
