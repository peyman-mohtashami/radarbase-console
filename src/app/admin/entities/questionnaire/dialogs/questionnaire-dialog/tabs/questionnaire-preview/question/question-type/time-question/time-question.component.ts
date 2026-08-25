import {
  Component,
  inject,
  output,
  input
} from '@angular/core';
import {AppQuestion, AppQuestionnaireLanguage} from '../../../../../../../models/questionnaire';
import {
  MatDatepickerInputEvent,
} from '@angular/material/datepicker';
import {MatFormField, MatHint, MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {
  QuestionHeaderComponent
} from '../../question-header/question-header.component';
import {ReplacePlaceholdersPipe} from '../../../pipes/replace-placeholders.pipe';
import {timeToMinutes} from '../../../../../../../../../../shared/utils/signal-form-validators';

@Component({
  selector: 'app-time-question',
  imports: [
    MatFormField,
    MatInput,
    MatButton,
    QuestionHeaderComponent,
    ReplacePlaceholdersPipe,
    MatHint,
  ],
  providers: [ReplacePlaceholdersPipe],
  templateUrl: './time-question.component.html'
})
export class TimeQuestionComponent {
  private replacePlaceholdersPipe = inject(ReplacePlaceholdersPipe);

  protected readonly Number = Number;

  entity = input.required<AppQuestion>();
  language = input.required<AppQuestionnaireLanguage>();
  answer = input.required<{ value: string}>();

  protected isPreviewDisabled = false;
  previewValueChange = output<string | null>();

  protected error: string | null = null;

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
}
