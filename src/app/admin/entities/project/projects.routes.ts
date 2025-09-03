import {Routes} from "@angular/router";
// import {ProjectsPageComponent} from "./containers/projects-page/projects-page.component";
import {ProjectsResolver} from "./services/projects.resolver";
import {OrganizationsResolver} from "../organization/services/organizations.resolver";
import {SourceTypesResolver} from "../source-type/services/sourceTypes.resolver";
import {ProjectPageComponent} from "./containers/project-page/project-page.component";
import {ProjectResolver} from "./services/project.resolver";
import {ProjectDetailsPageComponent} from "./containers/project-details-page/project-details-page.component";
import {filters, PROPERTIES} from "./config";
import {CommonEntitiesPageComponent} from '../../components/common-entities-page/common-entities-page.component';

export const projectRoutes: Routes = [
  {
    path: "",
    // component: ProjectsPageComponent,
    component: CommonEntitiesPageComponent,
    resolve: {
      entities: ProjectsResolver,
      // organizations: OrganizationsResolver,
      // sourceTypes: SourceTypesResolver,
    },
    data: {
      entityName: 'project',
      tableProperties: PROPERTIES,
      filters: filters,
      gridViewEnabled: true,
    },
  },
  {
    path: ':id',
    component: ProjectPageComponent,
    resolve: {
      entity: ProjectResolver,
      entities: ProjectsResolver,
      organizations: OrganizationsResolver,
      sourceTypes: SourceTypesResolver,
    },
    children: [
      // {
      //   path: '',
      //   redirectTo: 'subjects',
      //   pathMatch: 'full',
      // },
      // {
      //   path: 'subjects',
      //   loadChildren: () =>
      //     import('../subject/subject.routes').then((m) => m.subjectRoutes),
      //   pathMatch: 'full',
      // },
      // // {
      // //   path: 'subjects-authorizer',
      // //   loadChildren: () =>
      // //     import('../subject-authorizer/subject-authorizer.module').then(
      // //       (m) => m.SubjectAuthorizerModule
      // //     ),
      // // },
      // {
      //   path: 'sources',
      //   loadChildren: () =>
      //     import('../source/source.routes').then((m) => m.sourceRoutes),
      // },
      // {
      //   path: 'groups',
      //   loadChildren: () =>
      //     import('../group/group.routes').then((m) => m.groupRoutes),
      // },
      // {
      //   path: 'users',
      //   loadChildren: () =>
      //     import('../user/user.routes').then((m) => m.userRoutes),
      // },
      // // {
      // //   path: 'clients',
      // //   loadChildren: () =>
      // //     import('../client/client.module').then((m) => m.ClientModule),
      // // },
      // {
      //   path: 'app-configs',
      //   loadChildren: () =>
      //     import('../client/client.routes').then((m) => m.clientRoutes),
      //   data: {appConfig: true}
      // },
      {
        path: 'details',
        component: ProjectDetailsPageComponent,
      },
    ],
  },
  {
    path: ":id/subjects",
    loadChildren: () => import('../subject/subject.routes').then(m => m.subjectRoutes),
    resolve: {
      entity: ProjectResolver,
      entities: ProjectsResolver,
      organizations: OrganizationsResolver,
      sourceTypes: SourceTypesResolver,
    },
  },
];
