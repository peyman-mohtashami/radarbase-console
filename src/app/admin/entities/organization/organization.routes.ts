import {Routes} from "@angular/router";
import {OrganizationPageComponent} from "./containers/organization-page/organization-page.component";
import {OrganizationResolver} from "./services/organization.resolver";
import {
  OrganizationDetailsPageComponent
} from "./containers/organization-details-page/organization-details-page.component";
import {OrganizationsPageComponent} from './containers/organizations-page/organizations-page.component';
import {ProjectPageComponent} from '../project/containers/project-page/project-page.component';
import {ProjectResolver} from '../project/services/project.resolver';
import {ProjectsResolver} from '../project/services/projects.resolver';
import {SourceTypesResolver} from '../source-type/services/sourceTypes.resolver';
import {ProjectDetailsPageComponent} from '../project/containers/project-details-page/project-details-page.component';

export const organizationRoutes: Routes = [
  {
    path: '',
    component: OrganizationsPageComponent,
  },
  {
    path: ':organizationId/projects/:projectId',
    component: ProjectPageComponent,
    resolve: {
      organization: OrganizationResolver,
      entity: ProjectResolver,
      entities: ProjectsResolver,
      sourceTypes: SourceTypesResolver,
    },
    children: [
      {
        path: '',
        redirectTo: 'details',
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
      // // // {
      // // //   path: 'clients',
      // // //   loadChildren: () =>
      // // //     import('../client/client.module').then((m) => m.ClientModule),
      // // // },
      // // {
      // //   path: 'app-configs',
      // //   loadChildren: () =>
      // //     import('../client/client.routes').then((m) => m.clientRoutes),
      // //   data: {appConfig: true}
      // // },
      {
        path: 'details',
        component: ProjectDetailsPageComponent,
      },
    ],
  },
  {
    path: ':organizationId',
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
      },
      {
        path: 'details',
        component: OrganizationDetailsPageComponent,
      },
      {
        path: 'users',
        loadChildren: () =>
          import('../permission/permission.routes').then((m) => m.permissionRoutes),
      },
      // {
      //   path: 'clients',
      //   loadChildren: () =>
      //     import('../client/client.routes').then((m) => m.clientRoutes),
      // },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

// export const organizationRoutes: Routes = [
//   {
//     path: '',
//     component: OrganizationsPageComponent,
//   },
//   {
//     path: ':organizationId',
//     children: [
//       {
//         path: "projects",
//         pathMatch: "full",
//         children: [
//           {
//             path: ":projectId",
//             component: ProjectPageComponent,
//             resolve: {
//               entity: ProjectResolver,
//               entities: ProjectsResolver,
//               sourceTypes: SourceTypesResolver,
//             },
//             children: [
//               {
//                 path: '',
//                 redirectTo: 'details',
//                 pathMatch: 'full',
//               },
//               {
//                 path: 'subjects',
//                 loadChildren: () =>
//                   import('../subject/subject.routes').then((m) => m.subjectRoutes),
//               },
//               {
//                 path: 'sources',
//                 loadChildren: () =>
//                   import('../source/source.routes').then((m) => m.sourceRoutes),
//               },
//               {
//                 path: 'groups',
//                 loadChildren: () =>
//                   import('../group/group.routes').then((m) => m.groupRoutes),
//               },
//               {
//                 path: 'users',
//                 loadChildren: () =>
//                   import('../permission/permission.routes').then((m) => m.permissionRoutes),
//               },
//               // // {
//               // //   path: 'subjects-authorizer',
//               // //   loadChildren: () =>
//               // //     import('../subject-authorizer/subject-authorizer.module').then(
//               // //       (m) => m.SubjectAuthorizerModule
//               // //     ),
//               // // },
//               // // // {
//               // // //   path: 'clients',
//               // // //   loadChildren: () =>
//               // // //     import('../client/client.module').then((m) => m.ClientModule),
//               // // // },
//               // // {
//               // //   path: 'app-configs',
//               // //   loadChildren: () =>
//               // //     import('../client/client.routes').then((m) => m.clientRoutes),
//               // //   data: {appConfig: true}
//               // // },
//               {
//                 path: 'details',
//                 component: ProjectDetailsPageComponent,
//               },
//             ],
//           }
//         ],
//       },
//       {
//         path: '',
//         component: OrganizationPageComponent, // Displays organization details (/organizations/orgName)
//         resolve: {
//           entity: OrganizationResolver,
//         },
//         children: [
//           {
//             path: '',
//             redirectTo: 'projects',
//             pathMatch: 'full',
//           },
//           {
//             path: 'projects',
//             loadChildren: () =>
//               import('../project/projects.routes').then((m) => m.projectRoutes),
//           },
//           {
//             path: 'details',
//             component: OrganizationDetailsPageComponent,
//           },
//           {
//             path: 'users',
//             loadChildren: () =>
//               import('../permission/permission.routes').then((m) => m.permissionRoutes),
//           },
//           // {
//           //   path: 'clients',
//           //   loadChildren: () =>
//           //     import('../client/client.routes').then((m) => m.clientRoutes),
//           // },
//         ]
//       },
//     ]
//   },
//   // {
//   //   path: ':organizationId/projects/:projectId',
//   //   component: ProjectPageComponent,
//   //   resolve: {
//   //     entity: ProjectResolver,
//   //     entities: ProjectsResolver,
//   //     sourceTypes: SourceTypesResolver,
//   //   },
//   //   children: [
//   //     {
//   //       path: '',
//   //       redirectTo: 'details',
//   //       pathMatch: 'full',
//   //     },
//   //     {
//   //       path: 'subjects',
//   //       loadChildren: () =>
//   //         import('../subject/subject.routes').then((m) => m.subjectRoutes),
//   //     },
//   //     // // {
//   //     // //   path: 'subjects-authorizer',
//   //     // //   loadChildren: () =>
//   //     // //     import('../subject-authorizer/subject-authorizer.module').then(
//   //     // //       (m) => m.SubjectAuthorizerModule
//   //     // //     ),
//   //     // // },
//   //     {
//   //       path: 'sources',
//   //       loadChildren: () =>
//   //         import('../source/source.routes').then((m) => m.sourceRoutes),
//   //     },
//   //     {
//   //       path: 'groups',
//   //       loadChildren: () =>
//   //         import('../group/group.routes').then((m) => m.groupRoutes),
//   //     },
//   //     {
//   //       path: 'users',
//   //       loadChildren: () =>
//   //         import('../permission/permission.routes').then((m) => m.permissionRoutes),
//   //     },
//   //     // // // {
//   //     // // //   path: 'clients',
//   //     // // //   loadChildren: () =>
//   //     // // //     import('../client/client.module').then((m) => m.ClientModule),
//   //     // // // },
//   //     // // {
//   //     // //   path: 'app-configs',
//   //     // //   loadChildren: () =>
//   //     // //     import('../client/client.routes').then((m) => m.clientRoutes),
//   //     // //   data: {appConfig: true}
//   //     // // },
//   //     {
//   //       path: 'details',
//   //       component: ProjectDetailsPageComponent,
//   //     },
//   //   ],
//   // },
//   // {
//   //   path: ':organizationId',
//   //   component: OrganizationPageComponent,
//   //   resolve: {
//   //     entity: OrganizationResolver,
//   //   },
//   //   children: [
//   //     {
//   //       path: '',
//   //       redirectTo: 'projects',
//   //       pathMatch: 'full',
//   //     },
//   //     {
//   //       path: 'projects',
//   //       loadChildren: () =>
//   //         import('../project/projects.routes').then((m) => m.projectRoutes),
//   //     },
//   //     {
//   //       path: 'details',
//   //       component: OrganizationDetailsPageComponent,
//   //     },
//   //     {
//   //       path: 'users',
//   //       loadChildren: () =>
//   //         import('../permission/permission.routes').then((m) => m.permissionRoutes),
//   //     },
//   //     // {
//   //     //   path: 'clients',
//   //     //   loadChildren: () =>
//   //     //     import('../client/client.routes').then((m) => m.clientRoutes),
//   //     // },
//   //   ],
//   // },
//   // {
//   //   path: '**',
//   //   redirectTo: '',
//   // },
// ];
