import {Routes} from "@angular/router";
import {SourceTypesResolver} from "../source-type/services/sourceTypes.resolver";
import {SourcesDataResolver} from "./services/sources-data.resolver";
import {roleGuard} from "../../../core/auth/guards/role.guard";
import {SourceDataPageComponent} from "./containers/source-data-page/source-data-page.component";
import {SourceDataResolver} from "./services/source-data.resolver";
import {
  ImplEntitiesPageComponent
} from "../../components/base-entities-page/impl-entities-page/impl-entities-page.component";
import {filters, TableElements} from "./config";
import {RADAR_ROLES} from '../../../shared/models/auth.model';

export const sourceDataRoutes: Routes = [
  {
    path: '',
    component: ImplEntitiesPageComponent,
    resolve: {
      entities: SourcesDataResolver,
      sourceTypes: SourceTypesResolver,
    },
    canActivate: [roleGuard],
    data: {
      allowedRoles: [RADAR_ROLES.SYS_ADMIN],
      entityName: 'sourceData',
      tableProperties: TableElements,
      filters: filters,
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
