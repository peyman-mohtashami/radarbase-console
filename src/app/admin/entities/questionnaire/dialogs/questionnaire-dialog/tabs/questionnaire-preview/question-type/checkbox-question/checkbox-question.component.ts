import {
  Component,
  inject,
  OnInit,
  output,
  signal,
  input
} from '@angular/core';
import {AppQuestion} from '../../../../../../models/questionnaire';
import {QuestionnaireDialogStateService} from '../../../../services/questionnaire-dialog-state.service';
import {MatButton} from '@angular/material/button';
import {MatCheckbox} from '@angular/material/checkbox';
import {ReplacePlaceholdersPipe} from '../../pipes/replace-placeholders.pipe';
import {
  QuestionHeaderComponent
} from '../../question/question-header/question-header.component';

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
  private dialogState = inject(QuestionnaireDialogStateService);

  entity = input.required<AppQuestion>();
  language = input(this.dialogState.questionnaire()!.defaultLanguage);
  answer = input.required<{ value: string}>();

  protected isPreviewDisabled = false;
  previewValueChange = output<string[] | null>();
  protected previewItems = signal<{ code: string; label: Record<string, string>, checked: boolean; }[]>([]);

  ngOnInit(): void {
    this.previewItems.set((this.entity().select_choices_or_calculations ?? [])
      .map(item => (
        { code: item.code, label: item.label, checked: this.answer()?.value?.includes(item.code) ?? false }
      ))
    );
  }

  protected onPreviewInputChange(value: string | null) {
    if (value === null) {
      this.previewItems.update(items =>
        items.map(item => ({ ...item, checked: false })));
      this.previewValueChange.emit(null);
    } else {
      this.previewItems.update(items =>
        items.map(item => ({ ...item, checked: item.code === value ? !item.checked : item.checked })));
      const res = this.previewItems()
        .filter(item => item.checked)
        .map(item => item.code);
      this.previewValueChange.emit(res);
    }
  }
}
