import {
  Component,
  inject,
  output,
  input
} from '@angular/core';
import {AppQuestion} from '../../../../../../models/questionnaire';
import {QuestionnaireDialogStateService} from '../../../../services/questionnaire-dialog-state.service';
import {MatButton} from '@angular/material/button';
import {MatSlider, MatSliderThumb} from '@angular/material/slider';
import {ReplacePlaceholdersPipe} from '../../pipes/replace-placeholders.pipe';
import {
  QuestionHeaderComponent
} from '../../question/question-header/question-header.component';

@Component({
  selector: 'app-slider-question',
  imports: [
    MatButton,
    MatSlider,
    MatSliderThumb,
    ReplacePlaceholdersPipe,
    QuestionHeaderComponent,
  ],
  templateUrl: './slider-question.component.html'
})
export class SliderQuestionComponent {
  private dialogState = inject(QuestionnaireDialogStateService);

  entity = input.required<AppQuestion>();
  language = input(this.dialogState.questionnaire()!.defaultLanguage);
  answer = input.required<{ value: string}>();

  protected isPreviewDisabled = false;
  previewValueChange = output<string | null>();


  protected onPreviewInputChange(value: number | null) {
    this.previewValueChange.emit(value === null ? null : `${value}`);
  }
}
