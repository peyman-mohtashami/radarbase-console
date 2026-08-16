import {
  Component,
  inject,
  OnInit,
  output,
  input
} from '@angular/core';
import {AppQuestion} from '../../../../../../models/questionnaire';
import {MatButton} from '@angular/material/button';
import {ReplacePlaceholdersPipe} from '../../pipes/replace-placeholders.pipe';
import {
  QuestionHeaderComponent
} from '../../question/question-header/question-header.component';
import {QuestionnaireStore} from '../../../../../../services/questionnaire.store';

@Component({
  selector: 'app-range-question',
  imports: [
    MatButton,
    ReplacePlaceholdersPipe,
    QuestionHeaderComponent,
  ],
  templateUrl: './range-question.component.html'
})
export class RangeQuestionComponent implements OnInit {
  private store = inject(QuestionnaireStore);

  entity = input.required<AppQuestion>();
  language = input(this.store.selected()!.defaultLanguage);
  answer = input.required<{ value: string}>();

  protected isPreviewDisabled = false;
  previewValueChange = output<string | null>();

  protected previewValue: string | null = null;
  protected previewSelectedLabel: string | null = null;

  ngOnInit(): void {
    this.previewValue = this.answer()?.value !== undefined ? this.answer().value : null;
    this.previewSelectedLabel = this.entity().select_choices_or_calculations?.find(e => e.code === this.previewValue)?.label[this.language().code] ?? null;
  }

  protected onPreviewInputChange(value: string | null) {
    this.previewValue = value;
    this.previewSelectedLabel = this.entity().select_choices_or_calculations?.find(e => e.code === this.previewValue)?.label[this.language().code] ?? null;
    this.previewValueChange.emit(value);
  }
}
