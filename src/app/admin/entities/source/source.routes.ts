import {Routes} from "@angular/router";
import {SourceTypesResolver} from "../source-type/services/sourceTypes.resolver";
import {SourcesResolver} from "./services/sources.resolver";
import {filters, PROPERTIES} from "./config";
import {CommonEntitiesPageComponent} from '../../components/common-entities-page/common-entities-page.component';

export const sourceRoutes: Routes = [
  {
    path: '',
    component: CommonEntitiesPageComponent,
    resolve: {
      entities: SourcesResolver,
      sourceTypes: SourceTypesResolver,
    },
    data: {
      entityName: 'source',
      tableProperties: PROPERTIES,
      filters: filters,
    },
  },
];
