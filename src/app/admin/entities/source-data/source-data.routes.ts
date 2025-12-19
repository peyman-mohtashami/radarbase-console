import {Routes} from "@angular/router";
import {SourceDataListResolver} from "./services/source-data-list.resolver";
import {roleGuard} from "../../../core/auth/guards/role.guard";
import {SourceDataPageComponent} from "./containers/source-data-page/source-data-page.component";
import {SourceDataResolver} from "./services/source-data.resolver";
import {SourceDataListPageComponent} from './containers/source-data-list-page/source-data-list-page.component';
import {RADAR_ROLES} from '../../../core/auth/models/auth.model';
import {SourceTypeFullListResolver} from '../source-type/services/source-type-full-list.resolver';

export const sourceDataRoutes: Routes = [
  {
    path: '',
    component: SourceDataListPageComponent,
    resolve: {
      sourceDataList: SourceDataListResolver,
      sourceTypeFullList: SourceTypeFullListResolver,
    },
    canActivate: [roleGuard],
    data: {
      allowedRoles: [RADAR_ROLES.SYS_ADMIN],
    },
  },
  {
    path: ':id',
    component: SourceDataPageComponent,
    resolve: {
      sourceData: SourceDataResolver,
      sourceTypeFullList: SourceTypeFullListResolver,
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
