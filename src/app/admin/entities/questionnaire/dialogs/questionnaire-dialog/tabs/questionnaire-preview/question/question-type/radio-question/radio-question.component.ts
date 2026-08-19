import {
  Component,
  output,
  input
} from '@angular/core';
import {AppQuestion, AppQuestionnaireLanguage} from '../../../../../../../models/questionnaire';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {MatButton} from '@angular/material/button';
import {ReplacePlaceholdersPipe} from '../../../pipes/replace-placeholders.pipe';
import {
  QuestionHeaderComponent
} from '../../question-header/question-header.component';

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

  entity = input.required<AppQuestion>();
  language = input.required<AppQuestionnaireLanguage>();
  answer = input.required<{ value: string}>();

  protected isPreviewDisabled = false;
  previewValueChange = output<string | null>();

  protected onPreviewInputChange(value: string | null) {
    this.previewValueChange.emit(value);
  }
}
