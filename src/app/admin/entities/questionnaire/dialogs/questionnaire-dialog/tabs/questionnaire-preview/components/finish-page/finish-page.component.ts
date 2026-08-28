import {
  Component,
  input
} from '@angular/core';
import {AppQuestionnaire, AppQuestionnaireLanguage} from '../../../../../../models/questionnaire';
import {ReplacePlaceholdersPipe} from '../../pipes/replace-placeholders.pipe';

@Component({
  selector: 'app-finish-page',
  imports: [
    ReplacePlaceholdersPipe
  ],
  templateUrl: './finish-page.component.html'
})
export class FinishPageComponent {

  entity = input.required<AppQuestionnaire>();
  language = input.required<AppQuestionnaireLanguage>();
}
