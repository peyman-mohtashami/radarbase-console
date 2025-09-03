import {Routes} from "@angular/router";
// import {SubjectsPageComponent} from "./containers/subjects-page/subjects-page.component";
import {SubjectsResolver} from "./services/subjects.resolver";
import {ProjectsResolver} from "../project/services/projects.resolver";
import {ClientsResolver} from "../client/services/clients.resolver";
import {GroupsResolver} from "../group/services/groups.resolver";
import {SubjectPageComponent} from "./containers/subject-page/subject-page.component";
import {SubjectResolver} from "./services/subject.resolver";
import {SubjectDetailsPageComponent} from "./containers/subject-details-page/subject-details-page.component";
import {SubjectDownloadPageComponent} from "./containers/subject-download-page/subject-download-page.component";
import {SubjectDataPageComponent} from "./containers/subject-data-page/subject-data-page.component";
import {SubjectCompliancePageComponent} from "./containers/subject-compliance-page/subject-compliance-page.component";
import {filters, PROPERTIES} from "./config";
import {CommonEntitiesPageComponent} from '../../components/common-entities-page/common-entities-page.component';

export const subjectRoutes: Routes = [
  {
    path: '',
    // component: SubjectsPageComponent,
    component: CommonEntitiesPageComponent,
    resolve: {
      entities: SubjectsResolver,
      projects: ProjectsResolver,
      clients: ClientsResolver,
      groups: GroupsResolver,
    },
    data: {
      entityName: 'subject',
      tableProperties: PROPERTIES,
      filters: filters
    },
  },
  {
    path: ':id',
    component: SubjectPageComponent,
    resolve: {
      entity: SubjectResolver,
      // projects: ProjectsResolver,
      // clients: ClientsResolver,
      // groups: GroupsResolver,
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
