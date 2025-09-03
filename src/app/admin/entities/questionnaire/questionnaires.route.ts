import {Routes} from "@angular/router";
import {QuestionnairesResolver} from "./services/questionnaires.resolver";
import {filters, PROPERTIES} from "./config";
import {CommonEntitiesPageComponent} from '../../components/common-entities-page/common-entities-page.component';

export const questionnaireRoutes: Routes = [
  {
    path: '',
    // component: QuestionnairesPageComponent,
    component: CommonEntitiesPageComponent,
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
