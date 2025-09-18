import {Routes} from "@angular/router";
import {SourcesDataResolver} from "./services/sources-data.resolver";
import {roleGuard} from "../../../core/auth/guards/role.guard";
import {SourceDataPageComponent} from "./containers/source-data-page/source-data-page.component";
import {SourceDataResolver} from "./services/source-data.resolver";
import {RADAR_ROLES} from '../../../shared/models/auth.model';
import {SourceDatasPageComponent} from './containers/source-datas-page/source-datas-page.component';
import {SourceTypesResolver} from '../source-type/services/sourceTypes.resolver';

export const sourceDataRoutes: Routes = [
  {
    path: '',
    component: SourceDatasPageComponent,
    resolve: {
      entities: SourcesDataResolver,
      sourceTypes: SourceTypesResolver,
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
      entity: SourceDataResolver,
      sourceTypes: SourceTypesResolver,
    },
  },
];
