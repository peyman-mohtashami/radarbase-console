import {Routes} from "@angular/router";
import {AuditsResolver} from "./services/audits.resolver";
import {AuditListPageComponent} from './containers/audit-list-page/audit-list-page.component';

export const auditRoutes: Routes = [
  {
    path: '',
    component: AuditListPageComponent,
    resolve: {
      entities: AuditsResolver,
    },
  },
  {
    path: '**',
    redirectTo: '',
  }
];
