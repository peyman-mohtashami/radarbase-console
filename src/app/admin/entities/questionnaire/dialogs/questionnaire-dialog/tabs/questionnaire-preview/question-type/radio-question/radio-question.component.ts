import {
  Component,
  inject,
  output,
  input
} from '@angular/core';
import {AppQuestion} from '../../../../../../models/questionnaire';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {MatButton} from '@angular/material/button';
import {ReplacePlaceholdersPipe} from '../../pipes/replace-placeholders.pipe';
import {
  QuestionHeaderComponent
} from '../../question/question-header/question-header.component';
import {QuestionnaireStore} from '../../../../../../services/questionnaire.store';

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
  private store = inject(QuestionnaireStore);

  entity = input.required<AppQuestion>();
  language = input(this.store.selected()!.defaultLanguage);
  answer = input.required<{ value: string}>();

  protected isPreviewDisabled = false;
  previewValueChange = output<string | null>();

  protected onPreviewInputChange(value: string | null) {
    this.previewValueChange.emit(value);
  }
}
