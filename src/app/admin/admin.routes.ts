import {Routes} from "@angular/router";
import {AdminComponent} from "./admin.component";
import {roleGuard} from "../core/auth/guards/role.guard";
import {RADAR_ROLES} from '../core/auth/models/auth.model';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'profile',
        loadComponent: () => import('../core/auth/containers/profile-page/profile-page.component').then((c) => c.ProfilePageComponent)},
      {
        path: 'change-password',
        loadComponent: () => import('../core/auth/containers/password-page/password-page.component').then((c) => c.PasswordPageComponent),
      },
      {
        path: 'organizations',
        loadChildren: () =>
          import('./entities/organization/organization.routes').then((m) => m.organizationRoutes),
      },
      {
        path: 'projects',
        loadChildren: () =>
          import('./entities/project/projects.routes').then((m) => m.projectRoutes),
      },
      {
        path: 'source-types',
        loadChildren: () =>
          import('./entities/source-type/source-type.routes').then((m) => m.sourceTypeRoutes),
      },
      {
        path: 'source-data',
        loadChildren: () =>
          import('./entities/source-data/source-data.routes').then((m) => m.sourceDataRoutes),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./entities/user/user.routes').then((m) => m.userRoutes),
      },
      {
        path: 'clients',
        loadChildren: () => import('./entities/client/client.routes').then((m) => m.clientRoutes),
      },
      {
        path: 'global-config',
        loadChildren: () =>
          import('./entities/client/app-config.routes').then((m) => m.appConfigRoutes),
        canActivate: [roleGuard],
        data: { allowedRoles: [RADAR_ROLES.SYS_ADMIN], scope: 'global' },
      },
      {
        path: 'questionnaires',
        loadChildren: () =>
          import('./entities/configuration-scope/questionnaire/questionnaires.route').then((m) => m.questionnaireRoutes),
        canActivate: [roleGuard],
        data: { allowedRoles: [RADAR_ROLES.SYS_ADMIN], scope: 'global' },
      },
      // {
      //   path: 'protocols',
      //   loadChildren: () =>
      //     import('./entities/configuration-scope/protocol/protocols.route').then((m) => m.protocolsRoutes),
      //   canActivate: [roleGuard],
      //   data: { allowedRoles: [RADAR_ROLES.SYS_ADMIN], scope: 'global' },
      // },

      {
        path: 'logs',
        loadChildren: () => import('./entities/monitoring-scope/log/log.routes').then((m) => m.logRoutes),
        canActivate: [roleGuard],
        data: { allowedRoles: [RADAR_ROLES.SYS_ADMIN] },
      },
      {
        path: 'revisions',
        loadChildren: () => import('./entities/revision/revision.routes').then((m) => m.revisionRoutes),
        canActivate: [roleGuard],
        data: { allowedRoles: [RADAR_ROLES.SYS_ADMIN] },
      },
      {
        path: 'audits',
        loadChildren: () => import('./entities/monitoring-scope/audit/audit.routes').then((m) => m.auditRoutes),
        canActivate: [roleGuard],
        data: { allowedRoles: [RADAR_ROLES.SYS_ADMIN] },
      },
      {
        path: 'metrics',
        loadChildren: () => import('./entities/monitoring-scope/metrics/metrics.routes').then((m) => m.metricsRoutes),
        canActivate: [roleGuard],
        data: { allowedRoles: [RADAR_ROLES.SYS_ADMIN] },
      },
      {
        path: 'health',
        loadChildren: () => import('./entities/monitoring-scope/health/health.routes').then((m) => m.healthRoutes),
        canActivate: [roleGuard],
        data: { allowedRoles: [RADAR_ROLES.SYS_ADMIN] },
      },
      {
        path: '**',
        redirectTo: 'projects',
      }
      // {
      //   path: '**',
      //   redirectTo: ROUTES.PROTOCOLS,
      // }
    ],
  }
];
