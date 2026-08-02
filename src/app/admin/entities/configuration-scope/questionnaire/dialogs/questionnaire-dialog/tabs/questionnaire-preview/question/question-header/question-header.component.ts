import {Component, inject, input, ChangeDetectionStrategy} from '@angular/core'
import {ReplacePlaceholdersPipe} from '../../pipes/replace-placeholders.pipe';
import {AppQuestion, AppQuestionnaireLanguage} from '../../../../../../models/questionnaire';
import {QuestionnaireDialogStateService} from '../../../../services/questionnaire-dialog-state.service';
import {JsonPipe} from '@angular/common';
// import {PreviewReplacePlaceholder} from '../../components/preview-replace-placeholder/preview-replace-placeholder';

@Component({
  selector: 'app-question-header',
  imports: [ReplacePlaceholdersPipe, JsonPipe],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './question-header.component.html',
})
export class QuestionHeaderComponent {
  question = input.required<AppQuestion>();
  language = input<AppQuestionnaireLanguage>();
  label = input<boolean>(true);
  sectionHeader = input<boolean>(true);
  note = input<boolean>(true);

  questionnaireStateService = inject(QuestionnaireDialogStateService);

}
