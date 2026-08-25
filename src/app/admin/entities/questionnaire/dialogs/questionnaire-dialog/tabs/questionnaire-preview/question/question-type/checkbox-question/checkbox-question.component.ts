import {
  Component,
  OnInit,
  output,
  signal,
  input
} from '@angular/core';
import {AppQuestion, AppQuestionnaireLanguage} from '../../../../../../../models/questionnaire';
import {MatButton} from '@angular/material/button';
import {MatCheckbox} from '@angular/material/checkbox';
import {ReplacePlaceholdersPipe} from '../../../pipes/replace-placeholders.pipe';
import {
  QuestionHeaderComponent
} from '../../question-header/question-header.component';

@Component({
  selector: 'app-checkbox-question',
  imports: [
    MatButton,
    MatCheckbox,
    ReplacePlaceholdersPipe,
    QuestionHeaderComponent,
  ],
  templateUrl: './checkbox-question.component.html'
})
export class CheckboxQuestionComponent implements OnInit {

  entity = input.required<AppQuestion>();
  language = input.required<AppQuestionnaireLanguage>();
  answer = input.required<{ value: string}>();

  protected isPreviewDisabled = false;
  previewValueChange = output<string[] | null>();

  protected previewItems = signal<Record<string, boolean>>({});

  ngOnInit(): void {
    this.previewItems.set(this.buildPreviewItems());
  }

  private buildPreviewItems(): Record<string, boolean> {
    return (this.entity().select_choices_or_calculations ?? []).reduce((acc: Record<string, boolean>, item) => {
      acc[item.code] = this.answer()?.value?.includes(item.code) ?? false;
      return acc;
    }, {});
  }

  protected onPreviewInputChange(value: string | null) {
    if (value === null) {
      this.previewItems.set(
        (this.entity().select_choices_or_calculations ?? []).reduce((acc: Record<string, boolean>, item) => {
          acc[item.code] = false;
          return acc;
        }, {}));
      this.previewValueChange.emit(null);
    } else {
      this.previewItems.update(items => ({...items, [value]: !items[value]}));
      const res = Object.entries(this.previewItems()).filter(([, checked]) => checked).map(([code]) => code)
      this.previewValueChange.emit(res);
    }
  }
}
