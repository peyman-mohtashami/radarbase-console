import {Routes} from "@angular/router";
import {OrganizationPageComponent} from "./containers/organization-page/organization-page.component";
import {OrganizationResolver} from "./services/organization.resolver";
import {
  OrganizationDetailsPageComponent
} from "./containers/organization-details-page/organization-details-page.component";
import {OrganizationsResolver} from './services/organizations.resolver';
import {OrganizationListPageComponent} from './containers/organization-list-page/organization-list-page.component';

export const organizationRoutes: Routes = [
  {
    path: '',
    component: OrganizationListPageComponent,
    resolve: {
      entities: OrganizationsResolver
    }
  },
  {
    path: ':organizationId',
    component: OrganizationPageComponent,
    resolve: {
      entities: OrganizationsResolver,
      organization: OrganizationResolver,
    },
    children: [
      {
        path: '',
        redirectTo: 'projects',
        pathMatch: 'full',
      },
      {
        path: 'projects',
        loadChildren: () =>
          import('../project/projects.routes').then((m) => m.projectRoutes),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('../permission/permission.routes').then((m) => m.permissionRoutes),
      },
      {
        path: 'details',
        component: OrganizationDetailsPageComponent,
      },
      {
        path: '**',
        redirectTo: 'projects',
      }
    ],
  }
];
