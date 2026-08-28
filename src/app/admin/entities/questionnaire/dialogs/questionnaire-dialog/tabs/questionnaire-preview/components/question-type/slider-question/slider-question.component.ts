import {
  Component,
  output,
  input, OnInit
} from '@angular/core';
import {AppQuestion, AppQuestionnaire, AppQuestionnaireLanguage} from '../../../../../../../models/questionnaire';
import {MatButton} from '@angular/material/button';
import {MatSlider, MatSliderThumb} from '@angular/material/slider';
import {ReplacePlaceholdersPipe} from '../../../pipes/replace-placeholders.pipe';
import {
  QuestionHeaderComponent
} from '../../question-header/question-header.component';
import {TranslateLangPipe} from '../../../pipes/translate-lang.pipe';

@Component({
  selector: 'app-slider-question',
  imports: [
    MatButton,
    MatSlider,
    MatSliderThumb,
    ReplacePlaceholdersPipe,
    QuestionHeaderComponent,
    TranslateLangPipe,
  ],
  templateUrl: './slider-question.component.html'
})
export class SliderQuestionComponent implements OnInit {

  question = input.required<AppQuestion>();
  questionnaire = input.required<AppQuestionnaire>();
  language = input.required<AppQuestionnaireLanguage>();
  answer = input.required<{ value: string}>();

  protected isEditEnabled = true;
  valueChange = output<string | null>();

  ngOnInit(): void {
    this.isEditEnabled = this.questionnaire().editEnabled || !this.answer();
  }

  protected onInputChange(value: number | null) {
    this.valueChange.emit(value === null ? null : `${value}`);
  }
}
