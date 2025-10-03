import {Routes} from "@angular/router";
import {AdminComponent} from "./admin.component";
import {roleGuard} from "../core/auth/guards/role.guard";
import {RADAR_ROLES} from '../shared/models/auth.model';
import {ProjectsPageComponent} from './entities/project/containers/projects-page/projects-page.component';
// import {ProjectsResolver} from './entities/project/services/projects.resolver';
import {OrganizationsResolver} from './entities/organization/services/organizations.resolver';
import {SourceTypesResolver} from './entities/source-type/services/sourceTypes.resolver';
// import { RADAR_ROLES } from "@rb/models";


export enum ROUTES {
  ORGANIZATIONS = 'organizations',
  PROJECTS = 'projects',
  SOURCE_TYPES = 'source-types',
  SOURCE_DATA = 'source-data',
  SUBJECTS = 'subjects',
  USERS = 'users',
  CLIENTS = 'clients',
  APP_CONFIGS = 'global-configs',
  QUESTIONNAIRES = 'questionnaires',
  PROTOCOLS = 'protocols',
  LOGS = 'logs',
  REVISIONS = 'revisions',
  AUDITS = 'audits',
  METRICS = 'metrics',
  HEALTH = 'health',
}

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      // {
      //   path: '',
      //   redirectTo: ROUTES.ORGANIZATIONS,
      //   pathMatch: 'full',
      // },
      {path: 'profile', loadComponent: () => import('../core/auth/containers/profile-page/profile-page.component').then((c) => c.ProfilePageComponent)},
      {
        path: 'change-password',
        loadComponent: () => import('../core/auth/containers/password-page/password-page.component').then((c) => c.PasswordPageComponent),
      },
      {
        path: 'organizations', //ROUTES.ORGANIZATIONS,
        loadChildren: () =>
          import('./entities/organization/organization.routes').then((m) => m.organizationRoutes),
        // resolve: {
        //   entities: OrganizationsResolver
        // }
      },
      {
        path: ROUTES.PROJECTS,
        // component: ProjectsPageComponent,
        // resolve: {
        //   entities: ProjectsResolver,
        //   organizations: OrganizationsResolver,
        //   sourceTypes: SourceTypesResolver,
        // },
        loadChildren: () =>
          import('./entities/project/projects.routes').then((m) => m.projectRoutes),
      },
      {
        path: ROUTES.SOURCE_TYPES,
        loadChildren: () =>
          import('./entities/source-type/source-type.routes').then((m) => m.sourceTypeRoutes),
      },
      {
        path: ROUTES.SOURCE_DATA,
        loadChildren: () =>
          import('./entities/source-data/source-data.routes').then((m) => m.sourceDataRoutes),
      },
      {
        path: ROUTES.USERS,
        loadChildren: () =>
          import('./entities/user/user.routes').then((m) => m.userRoutes),
      },
      {
        path: ROUTES.CLIENTS,
        loadChildren: () =>
          import('./entities/client/client.routes').then((m) => m.clientRoutes),
        // canActivate: [roleGuard],
        // data: { allowedRoles: [RADAR_ROLES.SYS_ADMIN] },
      },
      // // {
      // //   path: ROUTES.APP_CONFIGS,
      // //   loadChildren: () =>
      // //     import('./entities/client/client.routes').then((m) => m.clientRoutes),
      // //   canActivate: [roleGuard],
      // //   data: { allowedRoles: [RADAR_ROLES.SYS_ADMIN], appConfig: true },
      // // },
      // // {
      // //   path: ROUTES.QUESTIONNAIRES,
      // //   loadChildren: () =>
      // //     import('./entities/questionnaire/questionnaires.route').then((m) => m.questionnaireRoutes),
      // //   // loadChildren: () =>
      // //   //   import('./entities/questionnaire/questionnaire.module').then(
      // //   //     (m) => m.QuestionnaireModule
      // //   //   ),
      // //   canActivate: [roleGuard],
      // //   data: { allowedRoles: [RADAR_ROLES.SYS_ADMIN] },
      // // },
      // // {
      // //   path: ROUTES.PROTOCOLS,
      // //   loadChildren: () =>
      // //     import('./entities/protocol/protocols.route').then((m) => m.protocolsRoutes),
      // //   // loadChildren: () =>
      // //   //   import('./entities/protocol/protocol.module').then(
      // //   //     (m) => m.ProtocolModule
      // //   //   ),
      // //   canActivate: [roleGuard],
      // //   data: { allowedRoles: [RADAR_ROLES.SYS_ADMIN] },
      // // },
      // //
      {
        path: ROUTES.LOGS,
        loadChildren: () =>
          import('./entities/log/log.routes').then((m) => m.logRoutes),
        canActivate: [roleGuard],
        data: { allowedRoles: [RADAR_ROLES.SYS_ADMIN] },
      },
      {
        path: ROUTES.REVISIONS,
        loadChildren: () =>
          import('./entities/revision/revision.routes').then(
            (m) => m.revisionRoutes
          ),
        canActivate: [roleGuard],
        data: { allowedRoles: [RADAR_ROLES.SYS_ADMIN] },
      },
      {
        path: ROUTES.AUDITS,
        loadChildren: () =>
          import('./entities/audit/audit.routes').then((m) => m.auditRoutes),
        canActivate: [roleGuard],
        data: { allowedRoles: [RADAR_ROLES.SYS_ADMIN] },
      },
      {
        path: ROUTES.METRICS,
        loadChildren: () =>
          import('./entities/metrics/metrics.routes').then(
            (m) => m.metricsRoutes
          ),
        canActivate: [roleGuard],
        data: { allowedRoles: [RADAR_ROLES.SYS_ADMIN] },
      },
      {
        path: ROUTES.HEALTH,
        loadChildren: () =>
          import('./entities/health/health.routes').then((m) => m.healthRoutes),
        canActivate: [roleGuard],
        data: { allowedRoles: [RADAR_ROLES.SYS_ADMIN] },
      },
    ],
  }
];


