import {Routes} from "@angular/router";
import {SourceListResolver} from "./services/source-list.resolver";
import {SourceListPageComponent} from './containers/source-list-page/source-list-page.component';

export const sourceRoutes: Routes = [
  {
    path: '',
    component: SourceListPageComponent,
    resolve: {
      sourceList: SourceListResolver,
    },
  },
  {
    path: '**',
    redirectTo: '',
  }
];
