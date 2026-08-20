import {
  Component,
  input
} from '@angular/core';
import {AppQuestionnaire, AppQuestionnaireLanguage} from '../../../../../../models/questionnaire';

@Component({
  selector: 'app-finish-page',
  imports: [
  ],
  templateUrl: './finish-page.component.html'
})
export class FinishPageComponent {

  entity = input.required<AppQuestionnaire>();
  language = input.required<AppQuestionnaireLanguage>();
}
