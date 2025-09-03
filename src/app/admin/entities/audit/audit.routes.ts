import {Routes} from "@angular/router";
import {AuditResolver} from "./services/audit.resolver";
import {TableElements} from "./config";
import {CommonEntitiesPageComponent} from '../../components/common-entities-page/common-entities-page.component';

export const auditRoutes: Routes = [
  {
    path: '',
    component: CommonEntitiesPageComponent,
    resolve: {
      entities: AuditResolver,
    },
    data: {
      entityName: 'audit',
      tableProperties: TableElements
    },
  },
];
