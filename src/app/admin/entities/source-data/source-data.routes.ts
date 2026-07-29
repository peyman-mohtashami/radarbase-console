import {Routes} from "@angular/router";
import {SourceDataListResolver} from "./services/source-data-list.resolver";
import {roleGuard} from "../../../core/auth/guards/role.guard";
import {SourceDataPageComponent} from "./pages/source-data-page/source-data-page.component";
import {SourceDataResolver} from "./services/source-data.resolver";
import {SourceDataListPageComponent} from './pages/source-data-list-page/source-data-list-page.component';
import {RADAR_ROLES} from '../../../core/auth/models/auth.model';
import {SourceDataDetailsPageComponent} from './pages/source-data-details-page/source-data-details-page.component';

export const sourceDataRoutes: Routes = [
  {
    path: '',
    component: SourceDataListPageComponent,
    resolve: {
      sourceDataList: SourceDataListResolver,
    },
    canActivate: [roleGuard],
    data: {
      allowedRoles: [RADAR_ROLES.SYS_ADMIN],
    },
  },
  {
    path: ':sourceDataId',
    component: SourceDataPageComponent,
    resolve: {
      sourceData: SourceDataResolver,
    },
    children: [
      {
        path: '',
        redirectTo: 'details',
        pathMatch: 'full',
      },
      {
        path: 'details',
        component: SourceDataDetailsPageComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
