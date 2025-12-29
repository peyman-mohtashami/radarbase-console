import {Routes} from "@angular/router";
import {QuestionnairesResolver} from "./services/questionnaires.resolver";
import {QuestionnaireListPageComponent} from './containers/questionnaire-list-page/questionnaire-list-page.component';

export const questionnaireRoutes: Routes = [
  {
    path: '',
    component: QuestionnaireListPageComponent,
    resolve: {
      entities: QuestionnairesResolver,
    },
  },
]
