import {Routes} from "@angular/router";
import {SubjectsResolver} from "./services/subjects.resolver";
import {ClientsResolver} from "../client/services/clients.resolver";
import {GroupsResolver} from "../group/services/groups.resolver";
import {SubjectPageComponent} from "./containers/subject-page/subject-page.component";
import {SubjectResolver} from "./services/subject.resolver";
import {SubjectDetailsPageComponent} from "./containers/subject-details-page/subject-details-page.component";
import {SubjectDownloadPageComponent} from "./containers/subject-download-page/subject-download-page.component";
import {SubjectDataPageComponent} from "./containers/subject-data-page/subject-data-page.component";
import {SubjectCompliancePageComponent} from "./containers/subject-compliance-page/subject-compliance-page.component";
import {SubjectsPageComponent} from './containers/subjects-page/subjects-page.component';

export const subjectRoutes: Routes = [
  {
    path: '',
    component: SubjectsPageComponent,
    resolve: {
      entities: SubjectsResolver,
      clients: ClientsResolver,
      groups: GroupsResolver,
    },
  },
  {
    path: ':id',
    component: SubjectPageComponent,
    resolve: {
      entity: SubjectResolver,
      clients: ClientsResolver,
      groups: GroupsResolver,
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
        // data: {appConfig: true}
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
