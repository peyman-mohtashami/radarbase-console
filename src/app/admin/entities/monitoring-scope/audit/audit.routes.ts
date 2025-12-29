import {Routes} from "@angular/router";
import {AuditListResolver} from "./services/audit-list.resolver";
import {AuditListPageComponent} from './containers/audit-list-page/audit-list-page.component';

export const auditRoutes: Routes = [
  {
    path: '',
    component: AuditListPageComponent,
    resolve: {
      auditList: AuditListResolver,
    },
  },
  {
    path: '**',
    redirectTo: '',
  }
];
