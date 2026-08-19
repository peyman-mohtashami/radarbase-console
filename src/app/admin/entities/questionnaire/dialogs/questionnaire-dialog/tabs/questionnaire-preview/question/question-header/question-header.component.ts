import {Component, input} from '@angular/core'
import {ReplacePlaceholdersPipe} from '../../pipes/replace-placeholders.pipe';
import {AppQuestion, AppQuestionnaireLanguage} from '../../../../../../models/questionnaire';

@Component({
  selector: 'app-question-header',
  imports: [ReplacePlaceholdersPipe],
  templateUrl: './question-header.component.html',
})
export class QuestionHeaderComponent {
  question = input.required<AppQuestion>();
  language = input.required<AppQuestionnaireLanguage>();
  label = input<boolean>(true);
  sectionHeader = input<boolean>(true);
  note = input<boolean>(true);
  disableRequiredAsterisk = input<boolean>(false);
}
