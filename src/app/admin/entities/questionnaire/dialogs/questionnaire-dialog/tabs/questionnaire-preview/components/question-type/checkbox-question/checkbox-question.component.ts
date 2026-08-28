import {
  Component,
  OnInit,
  output,
  signal,
  input
} from '@angular/core';
import {AppQuestion, AppQuestionnaire, AppQuestionnaireLanguage} from '../../../../../../../models/questionnaire';
import {MatButton} from '@angular/material/button';
import {MatCheckbox} from '@angular/material/checkbox';
import {ReplacePlaceholdersPipe} from '../../../pipes/replace-placeholders.pipe';
import {
  QuestionHeaderComponent
} from '../../question-header/question-header.component';
import {TranslateLangPipe} from '../../../pipes/translate-lang.pipe';

@Component({
  selector: 'app-checkbox-question',
  imports: [
    MatButton,
    MatCheckbox,
    ReplacePlaceholdersPipe,
    QuestionHeaderComponent,
    TranslateLangPipe,
  ],
  templateUrl: './checkbox-question.component.html'
})
export class CheckboxQuestionComponent implements OnInit {

  question = input.required<AppQuestion>();
  language = input.required<AppQuestionnaireLanguage>();
  questionnaire = input.required<AppQuestionnaire>();
  answer = input.required<{ value: string}>();

  protected isEditEnabled = true;
  valueChange = output<string[] | null>();

  protected previewItems = signal<Record<string, boolean>>({});

  ngOnInit(): void {
    this.isEditEnabled = this.questionnaire().editEnabled || !this.answer();
    this.previewItems.set(this.buildItems());
  }

  private buildItems(): Record<string, boolean> {
    return (this.question().select_choices_or_calculations ?? []).reduce((acc: Record<string, boolean>, item) => {
      acc[item.code] = this.answer()?.value?.includes(item.code) ?? false;
      return acc;
    }, {});
  }

  protected onInputChange(value: string | null) {
    if (value === null) {
      this.previewItems.set(
        (this.question().select_choices_or_calculations ?? []).reduce((acc: Record<string, boolean>, item) => {
          acc[item.code] = false;
          return acc;
        }, {}));
      this.valueChange.emit(null);
    } else {
      this.previewItems.update(items => ({...items, [value]: !items[value]}));
      const res = Object.entries(this.previewItems()).filter(([, checked]) => checked).map(([code]) => code)
      this.valueChange.emit(res);
    }
  }
}
