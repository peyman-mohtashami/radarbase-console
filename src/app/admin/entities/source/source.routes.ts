import {Routes} from "@angular/router";
import {SourcesResolver} from "./services/sources.resolver";
import {SourceListPageComponent} from './containers/source-list-page/source-list-page.component';

export const sourceRoutes: Routes = [
  {
    path: '',
    component: SourceListPageComponent,
    resolve: {
      entities: SourcesResolver,
    },
  },
  {
    path: '**',
    redirectTo: '',
  }
];
