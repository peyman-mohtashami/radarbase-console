import {
  Component,
  output,
  input
} from '@angular/core';
import {AppQuestion, AppQuestionnaireLanguage} from '../../../../../../../models/questionnaire';
import {MatButton} from '@angular/material/button';
import {MatSlider, MatSliderThumb} from '@angular/material/slider';
import {ReplacePlaceholdersPipe} from '../../../pipes/replace-placeholders.pipe';
import {
  QuestionHeaderComponent
} from '../../question-header/question-header.component';

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

  entity = input.required<AppQuestion>();
  language = input.required<AppQuestionnaireLanguage>();
  answer = input.required<{ value: string}>();

  protected isPreviewDisabled = false;
  previewValueChange = output<string | null>();


  protected onPreviewInputChange(value: number | null) {
    this.previewValueChange.emit(value === null ? null : `${value}`);
  }
}
