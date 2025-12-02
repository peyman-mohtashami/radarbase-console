import {Routes} from "@angular/router";
import {QuestionnairesResolver} from "./services/questionnaires.resolver";
import {QuestionnairesPageComponent} from "./containers/questionnaires-page/questionnaires-page.component";

export const questionnaireRoutes: Routes = [
  {
    path: '',
    component: QuestionnairesPageComponent,
    resolve: {
      entities: QuestionnairesResolver,
    },
  },
]
