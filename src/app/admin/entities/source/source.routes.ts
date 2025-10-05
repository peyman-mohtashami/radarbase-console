import {Routes} from "@angular/router";
import {SourcesResolver} from "./services/sources.resolver";
import {SourcesPageComponent} from './containers/sources-page/sources-page.component';

export const sourceRoutes: Routes = [
  {
    path: '',
    component: SourcesPageComponent,
    resolve: {
      entities: SourcesResolver,
    },
  },
  {
    path: '**',
    redirectTo: '',
  }
];
