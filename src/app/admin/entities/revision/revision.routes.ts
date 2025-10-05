import {Routes} from "@angular/router";
import {RevisionsResolver} from "./services/revisions.resolver";
import {RevisionsPageComponent} from './containers/revisions-page/revisions-page.component';

export const revisionRoutes: Routes = [
  {
    path: '',
    component: RevisionsPageComponent,
    resolve: {
      entities: RevisionsResolver,
    },
  },
  {
    path: '**',
    redirectTo: '',
  }
];
