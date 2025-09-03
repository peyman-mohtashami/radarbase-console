import {Routes} from "@angular/router";
// import {OrganizationsPageComponent} from "./containers/organizations-page/organizations-page.component";
import {OrganizationsResolver} from "./services/organizations.resolver";
import {OrganizationPageComponent} from "./containers/organization-page/organization-page.component";
import {OrganizationResolver} from "./services/organization.resolver";
import {
  OrganizationDetailsPageComponent
} from "./containers/organization-details-page/organization-details-page.component";
import {filters, TableElements} from "./config";
import {CommonEntitiesPageComponent} from '../../components/common-entities-page/common-entities-page.component';

export const organizationRoutes: Routes = [
  {
    path: '',
    // component: OrganizationsPageComponent,
    component: CommonEntitiesPageComponent,
    resolve: { entities: OrganizationsResolver },
    data: {
      entityName: 'organization',
      // config: config,
      tableProperties: TableElements,
      gridViewEnabled: true,
      filters: filters
    },
  },
  {
    path: ':id',
    component: OrganizationPageComponent,
    resolve: {
      entity: OrganizationResolver,
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
        pathMatch: 'full',
      },
      {
        path: 'details',
        component: OrganizationDetailsPageComponent,
        // resolve: {
        //   entity: OrganizationResolver,
        // },
      },
      {
        path: 'users',
        loadChildren: () =>
          import('../user/user.routes').then((m) => m.userRoutes),
      },
      {
        path: 'clients',
        loadChildren: () =>
          import('../client/client.routes').then((m) => m.clientRoutes),
      },
    ],
  },
  {
    path: ":id/projects",
    loadChildren: () => import('../project/projects.routes').then(m => m.projectRoutes),
    resolve: {
      entity: OrganizationResolver,
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
