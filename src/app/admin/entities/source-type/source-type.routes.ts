import {Routes} from "@angular/router";
import {roleGuard} from "../../../core/auth/guards/role.guard";
import {SourceTypePageComponent} from "./containers/source-type-page/source-type-page.component";
import {SourceTypesResolver} from './services/source-types.resolver';
import {SourceTypeResolver} from './services/source-type.resolver';
import {SourceTypeListPageComponent} from './containers/source-type-list-page/source-type-list-page.component';
import {RADAR_ROLES} from '../../../core/auth/models/auth.model';

export const sourceTypeRoutes: Routes = [
  {
    path: '',
    component: SourceTypeListPageComponent,
    resolve: {
      entities: SourceTypesResolver,
    },
    canActivate: [roleGuard],
    data: {
      allowedRoles: [RADAR_ROLES.SYS_ADMIN],
    },
  },
  {
    path: ':producer/:model/:version',
    component: SourceTypePageComponent,
    resolve: {
      entity: SourceTypeResolver,
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
