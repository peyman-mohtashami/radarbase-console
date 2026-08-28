import {Component, inject, input} from '@angular/core'
import {ReplacePlaceholdersPipe} from '../../pipes/replace-placeholders.pipe';
import {AppQuestion, AppQuestionnaireLanguage} from '../../../../../../models/questionnaire';
import {QuestionnaireStore} from '../../../../../../services/questionnaire.store';
import {TranslateLangPipe} from '../../pipes/translate-lang.pipe';

@Component({
  selector: 'app-question-header',
  imports: [ReplacePlaceholdersPipe, TranslateLangPipe],
  templateUrl: './question-header.component.html',
})
export class QuestionHeaderComponent {
  protected store = inject(QuestionnaireStore);

  question = input.required<AppQuestion>();
  language = input.required<AppQuestionnaireLanguage>();
  label = input<boolean>(true);
  sectionHeader = input<boolean>(true);
  note = input<boolean>(true);
  disableRequiredAsterisk = input<boolean>(false);
}
