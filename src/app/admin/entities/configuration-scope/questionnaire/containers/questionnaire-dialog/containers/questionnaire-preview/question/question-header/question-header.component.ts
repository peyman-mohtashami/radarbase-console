import {Component, inject, input} from '@angular/core'
import {ReplacePlaceholdersPipe} from '../../pipes/replace-placeholders.pipe';
import {AppQuestion} from '../../../../../../models/questionnaire';
import {QuestionnaireStateService} from '../../../../services/questionnaire-state.service';

@Component({
  selector: 'app-question-header',
  imports: [ReplacePlaceholdersPipe],
  templateUrl: './question-header.component.html',
})
export class QuestionHeaderComponent {
  question = input.required<AppQuestion>();
  label = input<boolean>(true);
  sectionHeader = input<boolean>(true);
  note = input<boolean>(true);

  questionnaireStateService = inject(QuestionnaireStateService);

}
