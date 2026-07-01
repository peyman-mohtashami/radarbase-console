import {Routes} from "@angular/router";
import {ProjectListResolver} from "./services/project-list.resolver";
import {ProjectResolver} from "./services/project.resolver";
import {ProjectDetailsPageComponent} from "./containers/project-details-page/project-details-page.component";
import {ProjectListPageComponent} from './containers/project-list-page/project-list-page.component';
import {ProjectPageComponent} from './containers/project-page/project-page.component';

export const projectRoutes: Routes = [
  {
    path: "",
    component: ProjectListPageComponent,
    resolve: {
      projectList: ProjectListResolver,
    },
  },
  {
    path: ':id',
    component: ProjectPageComponent,
    resolve: {
      project: ProjectResolver,
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
          import('../../project-scope/subject/subject.routes').then((m) => m.subjectRoutes),
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
          import('../../project-scope/source/source.routes').then((m) => m.sourceRoutes),
      },
      {
        path: 'groups',
        loadChildren: () =>
          import('../../project-scope/group/group.routes').then((m) => m.groupRoutes),
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
      // {
      //   path: 'protocols',
      //   loadChildren: () =>
      //     import('../../configuration-scope/protocol/protocols.route').then((m) => m.protocolsRoutes),
      //   data: {scope: 'project'}
      // },
      {
        path: 'questionnaires',
        loadChildren: () =>
          import('../../configuration-scope/questionnaire/questionnaires.route').then((m) => m.questionnaireRoutes),
        data: {scope: 'project'}
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
