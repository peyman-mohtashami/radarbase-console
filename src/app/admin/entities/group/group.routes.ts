import {Routes} from "@angular/router";
import {GroupsResolver} from "./services/groups.resolver";
import { GroupsPageComponent } from "./containers/groups-page/groups-page.component";

export const groupRoutes: Routes = [
  {
    path: '',
    component: GroupsPageComponent,
    resolve: {
      entities: GroupsResolver,
    },
  },
];
