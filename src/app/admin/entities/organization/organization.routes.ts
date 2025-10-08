import {Routes} from "@angular/router";
import {OrganizationPageComponent} from "./containers/organization-page/organization-page.component";
import {OrganizationResolver} from "./services/organization.resolver";
import {
  OrganizationDetailsPageComponent
} from "./containers/organization-details-page/organization-details-page.component";
import {OrganizationsPageComponent} from './containers/organizations-page/organizations-page.component';
import {OrganizationsResolver} from './services/organizations.resolver';

export const organizationRoutes: Routes = [
  {
    path: '',
    component: OrganizationsPageComponent,
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
