import {Routes} from "@angular/router";
import {SubjectListResolver} from "./services/subject-list.resolver";
import {SubjectPageComponent} from "./containers/subject-page/subject-page.component";
import {SubjectResolver} from "./services/subject.resolver";
import {SubjectDetailsPageComponent} from "./containers/subject-details-page/subject-details-page.component";
import {SubjectListPageComponent} from './containers/subject-list-page/subject-list-page.component';

export const subjectRoutes: Routes = [
  {
    path: '',
    component: SubjectListPageComponent,
    resolve: {
      subjectList: SubjectListResolver,
    },
  },
  {
    path: ':subjectId',
    component: SubjectPageComponent,
    resolve: {
      subject: SubjectResolver,
    },
    children: [
      {
        path: '',
        redirectTo: 'details',
        pathMatch: 'full',
      },
      {
        path: 'details',
        component: SubjectDetailsPageComponent,
      },
      {
        path: 'download',
        loadChildren: () =>
          import('../../subject-scope/data-download/data-download.routes').then(m => m.dataDownloadRoutes),
      },
      {
        path: 'data',
        loadChildren: () =>
          import('../../subject-scope/data-visualization/data-visualization.routes').then(m => m.dataVisualizationRoutes),
      },
      {
        path: 'compliance',
        loadChildren: () =>
          import('../../subject-scope/data-compliance/data-compliance.routes').then(m => m.dataComplianceRoutes),
      },
      {
        path: 'app-config',
        loadChildren: () =>
          import('../../main-scope/client/app-config.routes').then((m) => m.appConfigRoutes),
        data: {scope: 'subject'}
      },
      // {
      //   path: 'protocols',
      //   loadChildren: () =>
      //     import('../../configuration-scope/protocol/protocols.route').then((m) => m.protocolsRoutes),
      //   data: {scope: 'subject'}
      // },
      // {
      //   path: 'clients',
      //   loadChildren: () =>
      //     import('../client/client.routes').then((m) => m.clientRoutes),
      // },
      // {
      //   path: 'revisions',
      //   loadChildren: () =>
      //     import('../subject-revision/revision.routes').then(
      //       (m) => m.revisionRoutes
      //     ),
      // },
    ],
  },
];
