import {
  Component,
  input
} from '@angular/core';
import {AppQuestionnaire, AppQuestionnaireLanguage} from '../../../../../../models/questionnaire';
import {ReplacePlaceholdersPipe} from '../../pipes/replace-placeholders.pipe';

@Component({
  selector: 'app-introduction-page',
  imports: [
    ReplacePlaceholdersPipe
  ],
  templateUrl: './introduction-page.component.html'
})
export class IntroductionPageComponent {

  entity = input.required<AppQuestionnaire>();
  language = input.required<AppQuestionnaireLanguage>();
}
