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
import {MatFormField, MatInput, MatSuffix} from '@angular/material/input';
import {QuestionnaireDialogStateService} from '../../../../services/questionnaire-dialog-state.service';
import {MatButton} from '@angular/material/button';
import {
  QuestionHeaderComponent
} from '../../question/question-header/question-header.component';
import {ReplacePlaceholdersPipe} from '../../pipes/replace-placeholders.pipe';

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
  ],
  templateUrl: './datetime-question.component.html'
})
export class DatetimeQuestionComponent {
  private dialogState = inject(QuestionnaireDialogStateService);

  protected readonly Number = Number;

  entity = input.required<AppQuestion>();
  language = input(this.dialogState.questionnaire()!.defaultLanguage);
  answer = input.required<{ value: string}>();

  protected isPreviewDisabled = false;
  previewValueChange = output<string | null>();

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
      return;
    }
    const value = (event.target as HTMLInputElement).value;
    this.previewValueChange.emit(value);
  }

  protected getDateISOString(timestamp: string | undefined) {
    if (!timestamp) return null;
    const t = Number(timestamp);
    if (isNaN(t)) return timestamp;
    return new Date(t).toISOString();
  }
}
