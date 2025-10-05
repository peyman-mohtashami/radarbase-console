import {Routes} from "@angular/router";
import {roleGuard} from "../../../core/auth/guards/role.guard";
import {SourceTypePageComponent} from "./containers/source-type-page/source-type-page.component";
import {RADAR_ROLES} from '../../../shared/models/auth.model';
import {SourceTypesPageComponent} from './containers/source-types-page/source-types-page.component';
import {SourceTypesResolver} from './services/source-types.resolver';
import {SourceTypeResolver} from './services/source-type.resolver';

export const sourceTypeRoutes: Routes = [
  {
    path: '',
    component: SourceTypesPageComponent,
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
