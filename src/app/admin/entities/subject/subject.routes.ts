import {Routes} from "@angular/router";
import {SubjectListResolver} from "./services/subject-list.resolver";
import {SubjectPageComponent} from "./containers/subject-page/subject-page.component";
import {SubjectResolver} from "./services/subject.resolver";
import {SubjectDetailsPageComponent} from "./containers/subject-details-page/subject-details-page.component";
import {SubjectDownloadPageComponent} from "./containers/subject-download-page/subject-download-page.component";
import {SubjectDataPageComponent} from "./containers/subject-data-page/subject-data-page.component";
import {SubjectCompliancePageComponent} from "./containers/subject-compliance-page/subject-compliance-page.component";
import {SubjectListPageComponent} from './containers/subject-list-page/subject-list-page.component';
import {ClientFullListResolver} from '../client/services/client-full-list.resolver';
import {GroupFullListResolver} from '../group/services/group-full-list.resolver';

export const subjectRoutes: Routes = [
  {
    path: '',
    component: SubjectListPageComponent,
    resolve: {
      subjectList: SubjectListResolver,
      clientFullList: ClientFullListResolver,
      groupFullList: GroupFullListResolver,
    },
  },
  {
    path: ':id',
    component: SubjectPageComponent,
    resolve: {
      subject: SubjectResolver,
      clientFullList: ClientFullListResolver,
      groupFullList: GroupFullListResolver,
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
        component: SubjectDownloadPageComponent,
      },
      {
        path: 'data',
        component: SubjectDataPageComponent,
      },
      {
        path: 'compliance',
        component: SubjectCompliancePageComponent,
      },
      {
        path: 'app-config',
        loadChildren: () =>
          import('../client/app-config.routes').then((m) => m.appConfigRoutes),
        data: {scope: 'subject'}
      },
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
