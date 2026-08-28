import {
  Component,
  inject,
  output,
  input, OnInit
} from '@angular/core';
import {AppQuestion, AppQuestionnaire, AppQuestionnaireLanguage} from '../../../../../../../models/questionnaire';
import {MatFormField, MatHint, MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {
  QuestionHeaderComponent
} from '../../question-header/question-header.component';
import {ReplacePlaceholdersPipe} from '../../../pipes/replace-placeholders.pipe';
import {TranslateLangPipe} from '../../../pipes/translate-lang.pipe';

@Component({
  selector: 'app-number-question',
  imports: [
    MatFormField,
    MatInput,
    MatButton,
    QuestionHeaderComponent,
    ReplacePlaceholdersPipe,
    MatHint,
    TranslateLangPipe,
  ],
  providers: [ReplacePlaceholdersPipe],
  templateUrl: './number-question.component.html'
})
export class NumberQuestionComponent implements OnInit {
  protected readonly Number = Number;

  private replacePlaceholdersPipe = inject(ReplacePlaceholdersPipe);

  question = input.required<AppQuestion>();
  questionnaire = input.required<AppQuestionnaire>();
  language = input.required<AppQuestionnaireLanguage>();
  answer = input.required<{ value: string}>();

  protected isEditEnabled = true;
  valueChange = output<string | null>();

  protected error: string | null = null;

  ngOnInit(): void {
    this.isEditEnabled = this.questionnaire().editEnabled || !this.answer();
  }

  protected onInputChange(event: Event | null) {
    if (event === null) {
      this.valueChange.emit(null);
      this.error = null;
      return;
    }

    const value = (event.target as HTMLInputElement).value;
    this.validate(value);

    if (this.error === null) {
      this.valueChange.emit(value);
    }
  }

  validate(valueString: string) {
    const minValueString = this.replacePlaceholdersPipe.transform(this.question()?.text_validation_min);
    const maxValueString = this.replacePlaceholdersPipe.transform(this.question().text_validation_max);

    const value = parseFloat(valueString);
    const minValue = minValueString !== undefined ? parseFloat(minValueString) : undefined;
    const maxValue = maxValueString !== undefined ? parseFloat(maxValueString) : undefined;

    if (minValue !== undefined && value < minValue) {
      this.error = "MIN_VALIDATION_ERROR";
      return;
    } else if (maxValue !== undefined && value > maxValue) {
      this.error = "MAX_VALIDATION_ERROR";
      return;
    } else {
      this.error = null;
    }
  }
}
