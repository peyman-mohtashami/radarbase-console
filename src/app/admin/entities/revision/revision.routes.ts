import {Routes} from "@angular/router";
// import {RevisionsPageComponent} from "./containers/revisions-page/revisions-page.component";
import {RevisionsResolver} from "./services/revisions.resolver";
import {
  ImplEntitiesPageComponent
} from "../../components/base-entities-page/impl-entities-page/impl-entities-page.component";
import {PROPERTIES} from "./config";

export const revisionRoutes: Routes = [
  {
    path: '',
    component: ImplEntitiesPageComponent,
    // component: RevisionsPageComponent,
    resolve: {
      entities: RevisionsResolver,
    },
    data: {
      entityName: 'revision',
      tableProperties: PROPERTIES,
      disableAddButton: true,
    },
  },
];
