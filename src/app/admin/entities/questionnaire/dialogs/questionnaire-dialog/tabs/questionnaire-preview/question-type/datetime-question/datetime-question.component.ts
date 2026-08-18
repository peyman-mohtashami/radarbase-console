import {
  Component,
  inject,
  output,
  input
} from '@angular/core';
import {AppQuestion} from '../../../../../../models/questionnaire';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerInputEvent,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatFormField, MatHint, MatInput, MatSuffix} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {
  QuestionHeaderComponent
} from '../../question/question-header/question-header.component';
import {ReplacePlaceholdersPipe} from '../../pipes/replace-placeholders.pipe';
import {QuestionnaireStore} from '../../../../../../services/questionnaire.store';
import {timeToMinutes} from '../../../questionnaire-questions/dialogs/question-dialog/question-dialog.component';

@Component({
  selector: 'app-datetime-question',
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
    MatHint,
  ],
  providers: [ReplacePlaceholdersPipe],
  templateUrl: './datetime-question.component.html'
})
export class DatetimeQuestionComponent {
  private store= inject(QuestionnaireStore);
  private replacePlaceholdersPipe = inject(ReplacePlaceholdersPipe);

  protected readonly Number = Number;

  entity = input.required<AppQuestion>();
  language = input(this.store.selected()!.defaultLanguage);
  answer = input.required<{ value: string}>();

  protected isPreviewDisabled = false;
  previewValueChange = output<string | null>();

  protected error: string | null = null;

  protected get previewDateValue(): Date | null {
    if (!this.answer()?.value) return null;

    const timestamp = Number(this.answer().value);
    return Number.isNaN(timestamp) ? null : new Date(timestamp);
  }

  protected onPreviewDateInputChange(event: MatDatepickerInputEvent<Date> | null) {
    if (event === null) {
      return this.previewValueChange.emit(null);
    }
    const value = event.value;
    if (!value) return;
    const timestamp = `${value.getTime()}`;
    this.previewValueChange.emit(timestamp);
  }

  protected onPreviewTimeInputChange(event: Event | null) {
    if (event === null) {
      this.previewValueChange.emit(null);
      this.error = null;
      return;
    }
    const value = (event.target as HTMLInputElement).value;
    this.validate(value);

    if (this.error === null) {
      this.previewValueChange.emit(value);
    }
  }

  validate(valueString: string) {
    const minValueString = this.replacePlaceholdersPipe.transform(this.entity()?.text_validation_min);
    const maxValueString = this.replacePlaceholdersPipe.transform(this.entity().text_validation_max);

    const value = timeToMinutes(valueString);
    const minValue = minValueString !== undefined ? timeToMinutes(minValueString) : undefined;
    const maxValue = maxValueString !== undefined ? timeToMinutes(maxValueString) : undefined;

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

  protected getDateISOString(timestamp: string | undefined) {
    if (!timestamp) return null;
    const t = Number(timestamp);
    if (isNaN(t)) return timestamp;
    return new Date(t).toISOString();
  }
}
