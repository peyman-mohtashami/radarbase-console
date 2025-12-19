import {Routes} from "@angular/router";
import {ProjectsResolver} from "./services/projects.resolver";
import {ProjectResolver} from "./services/project.resolver";
import {ProjectDetailsPageComponent} from "./containers/project-details-page/project-details-page.component";
import {ProjectListPageComponent} from './containers/project-list-page/project-list-page.component';
import {ProjectPageComponent} from './containers/project-page/project-page.component';
import {AllOrganizationsResolver} from '../organization/services/all-organizations.resolver';
import {AllSourceTypesResolver} from '../source-type/services/all-source-types.resolver';
import {AllProjectsResolver} from './services/all-projects.resolver';

export const projectRoutes: Routes = [
  {
    path: "",
    component: ProjectListPageComponent,
    resolve: {
      entities: ProjectsResolver,
      sourceTypes: AllSourceTypesResolver,
      organizations: AllOrganizationsResolver,
    },
  },
  {
    path: ':id',
    component: ProjectPageComponent,
    resolve: {
      entity: ProjectResolver,
      entities: AllProjectsResolver,
      sourceTypes: AllSourceTypesResolver,
    },
    children: [
      {
        path: '',
        redirectTo: 'subjects',
        pathMatch: 'full',
      },
      {
        path: 'subjects',
        loadChildren: () =>
          import('../subject/subject.routes').then((m) => m.subjectRoutes),
      },
      // // {
      // //   path: 'subjects-authorizer',
      // //   loadChildren: () =>
      // //     import('../subject-authorizer/subject-authorizer.module').then(
      // //       (m) => m.SubjectAuthorizerModule
      // //     ),
      // // },
      {
        path: 'sources',
        loadChildren: () =>
          import('../source/source.routes').then((m) => m.sourceRoutes),
      },
      {
        path: 'groups',
        loadChildren: () =>
          import('../group/group.routes').then((m) => m.groupRoutes),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('../permission/permission.routes').then((m) => m.permissionRoutes),
      },
      {
        path: 'app-config',
        loadChildren: () =>
          import('../client/app-config.routes').then((m) => m.appConfigRoutes),
        data: {scope: 'project'}
      },
      {
        path: 'protocols',
        loadChildren: () =>
          import('../protocol/protocols.route').then((m) => m.protocolsRoutes),
      },
      {
        path: 'details',
        component: ProjectDetailsPageComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  }
];
