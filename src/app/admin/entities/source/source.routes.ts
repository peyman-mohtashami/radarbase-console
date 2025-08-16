import {Routes} from "@angular/router";
import {SourceTypesResolver} from "../source-type/services/sourceTypes.resolver";
import {SourcesResolver} from "./services/sources.resolver";
import {
  ImplEntitiesPageComponent
} from "../../components/base-entities-page/impl-entities-page/impl-entities-page.component";
import {filters, PROPERTIES} from "./config";

export const sourceRoutes: Routes = [
  {
    path: '',
    component: ImplEntitiesPageComponent,
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
