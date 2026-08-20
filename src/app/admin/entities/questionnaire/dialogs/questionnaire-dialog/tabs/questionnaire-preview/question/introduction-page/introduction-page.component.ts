import {
  Component,
  input
} from '@angular/core';
import {AppQuestionnaire, AppQuestionnaireLanguage} from '../../../../../../models/questionnaire';

@Component({
  selector: 'app-introduction-page',
  imports: [
  ],
  templateUrl: './introduction-page.component.html'
})
export class IntroductionPageComponent {

  entity = input.required<AppQuestionnaire>();
  language = input.required<AppQuestionnaireLanguage>();
}
