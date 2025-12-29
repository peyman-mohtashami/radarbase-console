import {Routes} from "@angular/router";
import {roleGuard} from "../../../../core/auth/guards/role.guard";
import {SourceTypePageComponent} from "./containers/source-type-page/source-type-page.component";
import {SourceTypeListResolver} from './services/source-type-list.resolver';
import {SourceTypeResolver} from './services/source-type.resolver';
import {SourceTypeListPageComponent} from './containers/source-type-list-page/source-type-list-page.component';
import {RADAR_ROLES} from '../../../../core/auth/models/auth.model';
import {
  ProjectDetailsPageComponent
} from '../project/containers/project-details-page/project-details-page.component';
import {SourceTypeDetailsPageComponent} from './containers/source-type-details-page/source-type-details-page.component';

export const sourceTypeRoutes: Routes = [
  {
    path: '',
    component: SourceTypeListPageComponent,
    resolve: {
      sourceTypeList: SourceTypeListResolver,
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
    },
    children: [
      {
        path: '',
        redirectTo: 'details',
        pathMatch: 'full',
      },
      {
        path: 'details',
        component: SourceTypeDetailsPageComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
