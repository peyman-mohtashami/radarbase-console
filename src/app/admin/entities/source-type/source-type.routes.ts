import {Routes} from "@angular/router";
import {roleGuard} from "../../../core/auth/guards/role.guard";
import {SourceTypePageComponent} from "./containers/source-type-page/source-type-page.component";
import {SourceTypeListResolver} from './services/source-type-list.resolver';
import {SourceTypeResolver} from './services/source-type.resolver';
import {SourceTypeListPageComponent} from './containers/source-type-list-page/source-type-list-page.component';
import {RADAR_ROLES} from '../../../core/auth/models/auth.model';

export const sourceTypeRoutes: Routes = [
  {
    path: '',
    component: SourceTypeListPageComponent,
    resolve: {
      sourceTypeList: SourceTypeListResolver,
      sourceTypeFullList: SourceTypeListResolver,
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
      sourceType: SourceTypeResolver,
      sourceTypeFullList: SourceTypeListResolver,
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
