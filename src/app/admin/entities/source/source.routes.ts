import {Routes} from "@angular/router";
import {SourceTypesResolver} from "../source-type/services/sourceTypes.resolver";
import {SourcesResolver} from "./services/sources.resolver";
import {SourcesPageComponent} from './containers/sources-page/sources-page.component';
import {ProjectsResolver} from '../project/services/projects.resolver';

export const sourceRoutes: Routes = [
  {
    path: '',
    component: SourcesPageComponent,
    resolve: {
      entities: SourcesResolver,
      // projects: ProjectsResolver,
      // sourceTypes: SourceTypesResolver,
    },
  },
];
