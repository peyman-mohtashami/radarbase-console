import {
  Component,
  output,
  input, OnInit
} from '@angular/core';
import {AppQuestion, AppQuestionnaire, AppQuestionnaireLanguage} from '../../../../../../../models/questionnaire';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerInputEvent,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatFormField, MatInput, MatSuffix} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {
  QuestionHeaderComponent
} from '../../question-header/question-header.component';
import {ReplacePlaceholdersPipe} from '../../../pipes/replace-placeholders.pipe';
import {TranslateLangPipe} from '../../../pipes/translate-lang.pipe';

@Component({
  selector: 'app-date-question',
  imports: [
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatInput,
    MatSuffix,
    MatButton,
    QuestionHeaderComponent,
    ReplacePlaceholdersPipe,
    TranslateLangPipe,
  ],
  providers: [ReplacePlaceholdersPipe],
  templateUrl: './date-question.component.html'
})
export class DateQuestionComponent implements OnInit {
  protected readonly Number = Number;

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

  protected get dateValue(): Date | null {
    if (!this.answer()?.value) return null;

    const timestamp = Number(this.answer().value);
    return Number.isNaN(timestamp) ? null : new Date(timestamp);
  }

  protected onDateInputChange(event: MatDatepickerInputEvent<Date> | null) {
    if (event === null) {
      return this.valueChange.emit(null);
    }
    const value = event.value;
    if (!value) return;
    const timestamp = `${value.getTime()}`;
    this.valueChange.emit(timestamp);
  }

  protected getDateISOString(timestamp: string | undefined) {
    if (!timestamp) return null;
    const t = Number(timestamp);
    if (isNaN(t)) return timestamp;
    return new Date(t).toISOString();
  }
}
