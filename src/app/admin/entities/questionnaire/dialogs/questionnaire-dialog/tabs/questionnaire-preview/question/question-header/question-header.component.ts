import {Component, inject, input} from '@angular/core'
import {ReplacePlaceholdersPipe} from '../../pipes/replace-placeholders.pipe';
import {AppQuestion, AppQuestionnaireLanguage} from '../../../../../../models/questionnaire';
import {QuestionnaireDialogStateService} from '../../../../services/questionnaire-dialog-state.service';

@Component({
  selector: 'app-question-header',
  imports: [ReplacePlaceholdersPipe,
  ],
  templateUrl: './question-header.component.html',
})
export class QuestionHeaderComponent {
  question = input.required<AppQuestion>();
  language = input<AppQuestionnaireLanguage>();
  label = input<boolean>(true);
  sectionHeader = input<boolean>(true);
  note = input<boolean>(true);
  disableRequiredAsterisk = input<boolean>(false);

  questionnaireStateService = inject(QuestionnaireDialogStateService);

}
