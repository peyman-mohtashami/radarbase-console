import {
  Component,
  inject,
  output,
  input
} from '@angular/core';
import {AppQuestion, AppQuestionnaireLanguage} from '../../../../../../../models/questionnaire';
import {MatFormField, MatHint, MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {
  QuestionHeaderComponent
} from '../../question-header/question-header.component';
import {ReplacePlaceholdersPipe} from '../../../pipes/replace-placeholders.pipe';

@Component({
  selector: 'app-number-question',
  imports: [
    MatFormField,
    MatInput,
    MatButton,
    QuestionHeaderComponent,
    ReplacePlaceholdersPipe,
    MatHint,
  ],
  providers: [ReplacePlaceholdersPipe],
  templateUrl: './number-question.component.html'
})
export class NumberQuestionComponent {
  protected readonly Number = Number;

  private replacePlaceholdersPipe = inject(ReplacePlaceholdersPipe);

  entity = input.required<AppQuestion>();
  language = input.required<AppQuestionnaireLanguage>();
  answer = input.required<{ value: string}>();

  protected isPreviewDisabled = false;
  previewValueChange = output<string | null>();

  protected error: string | null = null;

  protected onPreviewInputChange(event: Event | null) {
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
