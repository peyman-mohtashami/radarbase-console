import {Routes} from "@angular/router";
// import {SubjectRevisionsPageComponent} from "./containers/subject-revisions-page/subject-revisions-page.component";
import {RevisionsResolver} from "./services/revisions.resolver";
import {CommonEntitiesPageComponent} from '../../components/common-entities-page/common-entities-page.component';

export const revisionRoutes: Routes = [
  {
    path: '',
    component: CommonEntitiesPageComponent, //SubjectRevisionsPageComponent,
    resolve: {
      entities: RevisionsResolver,
    },
    data: {
      entityName: 'revision',
      // tableProperties: PROPERTIES,
      disableAddButton: true,
    },
  },
];
