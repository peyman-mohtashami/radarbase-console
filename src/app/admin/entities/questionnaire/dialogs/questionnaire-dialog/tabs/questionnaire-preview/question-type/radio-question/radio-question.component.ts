import {
  Component,
  inject,
  output,
  input
} from '@angular/core';
import {AppQuestion} from '../../../../../../models/questionnaire';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {QuestionnaireDialogStateService} from '../../../../services/questionnaire-dialog-state.service';
import {MatButton} from '@angular/material/button';
import {ReplacePlaceholdersPipe} from '../../pipes/replace-placeholders.pipe';
import {
  QuestionHeaderComponent
} from '../../question/question-header/question-header.component';

@Component({
  selector: 'app-radio-question',
  imports: [
    MatRadioButton,
    MatRadioGroup,
    MatButton,
    ReplacePlaceholdersPipe,
    QuestionHeaderComponent,
  ],
  templateUrl: './radio-question.component.html'
})
export class RadioQuestionComponent {
  private dialogState = inject(QuestionnaireDialogStateService);

  entity = input.required<AppQuestion>();
  language = input(this.dialogState.questionnaire()!.defaultLanguage);
  answer = input.required<{ value: string}>();

  protected isPreviewDisabled = false;
  previewValueChange = output<string | null>();

  protected onPreviewInputChange(value: string | null) {
    this.previewValueChange.emit(value);
  }
}
