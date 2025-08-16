import {Routes} from "@angular/router";
import {AuditResolver} from "./services/audit.resolver";
import {
  ImplEntitiesPageComponent
} from "../../components/base-entities-page/impl-entities-page/impl-entities-page.component";
import {TableElements} from "./config";

export const auditRoutes: Routes = [
  {
    path: '',
    component: ImplEntitiesPageComponent,
    resolve: {
      entities: AuditResolver,
    },
    data: {
      entityName: 'audit',
      tableProperties: TableElements
    },
  },
];
