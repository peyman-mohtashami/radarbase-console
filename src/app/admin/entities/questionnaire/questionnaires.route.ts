import {Routes} from "@angular/router";
import {QuestionnairesResolver} from "./services/questionnaires.resolver";
import {
  ImplEntitiesPageComponent
} from "../../components/base-entities-page/impl-entities-page/impl-entities-page.component";
import {filters, PROPERTIES} from "./config";

export const questionnaireRoutes: Routes = [
  {
    path: '',
    // component: QuestionnairesPageComponent,
    component: ImplEntitiesPageComponent,
    data: {
      entityName: 'questionnaire',
      // config: config,
      tableProperties: PROPERTIES,
      filters: filters
    },
    resolve: {
      entities: QuestionnairesResolver,
    },
  },
]
