import {Routes} from "@angular/router";
import {QuestionnaireListResolver} from "./services/questionnaire-list.resolver";
import {QuestionnaireListPageComponent} from './pages/questionnaire-list-page/questionnaire-list-page.component';

export const questionnaireRoutes: Routes = [
  {
    path: '',
    component: QuestionnaireListPageComponent,
    resolve: {
      questionnaireList: QuestionnaireListResolver,
    },
  },
]
