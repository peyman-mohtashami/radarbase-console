import {Routes} from "@angular/router";
import {AuditResolver} from "./services/audit.resolver";
import {AuditsPageComponent} from './containers/audits-page/audits-page.component';

export const auditRoutes: Routes = [
  {
    path: '',
    component: AuditsPageComponent,
    resolve: {
      entities: AuditResolver,
    },
  },
  {
    path: '**',
    redirectTo: '',
  }
];
