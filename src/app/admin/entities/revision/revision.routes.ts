import {Routes} from "@angular/router";
import {RevisionsResolver} from "./services/revisions.resolver";
import {RevisionListPageComponent} from './containers/revision-list-page/revision-list-page.component';

export const revisionRoutes: Routes = [
  {
    path: '',
    component: RevisionListPageComponent,
    resolve: {
      entities: RevisionsResolver,
    },
  },
  {
    path: '**',
    redirectTo: '',
  }
];
