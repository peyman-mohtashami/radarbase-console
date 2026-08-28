import {
  Component,
  OnInit,
  output,
  input
} from '@angular/core';
import {AppQuestion, AppQuestionnaire, AppQuestionnaireLanguage} from '../../../../../../../models/questionnaire';
import {MatButton} from '@angular/material/button';
import {ReplacePlaceholdersPipe} from '../../../pipes/replace-placeholders.pipe';
import {
  QuestionHeaderComponent
} from '../../question-header/question-header.component';
import {TranslateLangPipe} from '../../../pipes/translate-lang.pipe';

@Component({
  selector: 'app-range-question',
  imports: [
    MatButton,
    ReplacePlaceholdersPipe,
    QuestionHeaderComponent,
    TranslateLangPipe,
  ],
  templateUrl: './range-question.component.html'
})
export class RangeQuestionComponent implements OnInit {

  question = input.required<AppQuestion>();
  questionnaire = input.required<AppQuestionnaire>();
  language = input.required<AppQuestionnaireLanguage>();
  answer = input.required<{ value: string}>();

  protected isEditEnabled = true;
  valueChange = output<string | null>();

  protected value: string | null = null;
  protected selectedLabel: string | null = null;

  ngOnInit(): void {
    this.value = this.answer()?.value !== undefined ? this.answer().value : null;
    this.selectedLabel = this.question().select_choices_or_calculations?.find(e => e.code === this.value)?.label[this.language().code] ?? null;
    this.isEditEnabled = this.questionnaire().editEnabled || !this.answer();
  }

  protected onInputChange(value: string | null) {
    this.value = value;
    this.selectedLabel = this.question().select_choices_or_calculations?.find(e => e.code === this.value)?.label[this.language().code] ?? null;
    this.valueChange.emit(value);
  }
}
