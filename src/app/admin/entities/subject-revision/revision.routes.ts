import {Routes} from "@angular/router";
import {SubjectRevisionsPageComponent} from "./containers/subject-revisions-page/subject-revisions-page.component";
import {RevisionsResolver} from "./services/revisions.resolver";

export const revisionRoutes: Routes = [
  {
    path: '',
    component: SubjectRevisionsPageComponent,
    resolve: {
      entities: RevisionsResolver,
    },
  },
];
