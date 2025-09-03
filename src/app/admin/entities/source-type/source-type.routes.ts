import {Routes} from "@angular/router";
import {SourceTypesResolver} from "./services/sourceTypes.resolver";
import {roleGuard} from "../../../core/auth/guards/role.guard";
// import {SourceTypesPageComponent} from "./containers/source-types-page/source-types-page.component";
import {SourceTypePageComponent} from "./containers/source-type-page/source-type-page.component";
import {SourceTypeResolver} from "./services/sourceType.resolver";
import {filters, PROPERTIES} from "./config";
import {RADAR_ROLES} from '../../../shared/models/auth.model';
import {CommonEntitiesPageComponent} from '../../components/common-entities-page/common-entities-page.component';

export const sourceTypeRoutes: Routes = [
  {
    path: '',
    component: CommonEntitiesPageComponent,
    resolve: {
      entities: SourceTypesResolver,
    },
    canActivate: [roleGuard],
    data: {
      allowedRoles: [RADAR_ROLES.SYS_ADMIN],
      entityName: 'sourceType',
      tableProperties: PROPERTIES,
      filters: filters,
    },
  },
  {
    path: ':name',
    component: SourceTypePageComponent,
    resolve: {
      entity: SourceTypeResolver,
    },
  },
  // {
  //   path: ':producer/:model/:version',
  //   component: SourceTypePageComponent,
  //   resolve: {
  //     entity: SourceTypeResolver,
  //   },
  // },
  {
    path: '**',
    redirectTo: '',
  },
];
