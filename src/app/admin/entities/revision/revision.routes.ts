import {Routes} from "@angular/router";
import {RevisionListResolver} from "./services/revision-list.resolver";
import {RevisionListPageComponent} from './pages/revision-list-page/revision-list-page.component';

export const revisionRoutes: Routes = [
  {
    path: '',
    component: RevisionListPageComponent,
    resolve: {
      revisionList: RevisionListResolver,
    },
  },
  {
    path: '**',
    redirectTo: '',
  }
];
