import {Routes} from "@angular/router";
// import {RevisionsPageComponent} from "./containers/revisions-page/revisions-page.component";
import {RevisionsResolver} from "./services/revisions.resolver";
import {PROPERTIES} from "./config";
import {CommonEntitiesPageComponent} from '../../components/common-entities-page/common-entities-page.component';

export const revisionRoutes: Routes = [
  {
    path: '',
    component: CommonEntitiesPageComponent,
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
