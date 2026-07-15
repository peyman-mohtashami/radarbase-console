import {Component, inject, Input, InputSignal, OnInit, output, signal} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';
import {AppQuestion, AppQuestionnaireLanguage} from '../../../../../models/questionnaire';
import {
  QuestionChoicesFormArray
} from '../../../containers/questionnaire-questions/question-choices-form-array/question-choices-form-array';
import {MatFormField} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect, MatSelectChange} from '@angular/material/select';
import {QuestionnaireDialogStateService} from '../../../services/questionnaire-dialog-state.service';
import {MatButton} from '@angular/material/button';
import {MatCheckbox} from '@angular/material/checkbox';
import {ReplacePlaceholdersPipe} from '../../../containers/questionnaire-preview/pipes/replace-placeholders.pipe';
import {
  QuestionHeaderComponent
} from '../../../containers/questionnaire-preview/question/question-header/question-header.component';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-checkbox-question',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    MatIcon,
    QuestionChoicesFormArray,
    MatFormField,
    MatOption,
    MatSelect,
    MatButton,
    MatCheckbox,
    ReplacePlaceholdersPipe,
    QuestionHeaderComponent,
    JsonPipe,
  ],
  templateUrl: './checkbox-question.component.html'
})
export class CheckboxQuestionComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogState = inject(QuestionnaireDialogStateService);

  @Input({ required: true }) type!: 'form' | 'button'| 'preview' | 'logic';
  @Input() language = signal(this.dialogState.questionnaire()!.defaultLanguage);
  @Input({ required: true }) entity!:  InputSignal<AppQuestion>;
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) languages!: AppQuestionnaireLanguage[];
  @Input({ required: true }) index!: number;
  @Input({ required: true }) value!: string;
  @Input({ required: true }) operator!: string;
  @Input({required: true}) answer!: InputSignal<{value: string[]}>;

  logicValueChange = output<string>();

  protected isPreviewDisabled = false;
  previewValueChange = output<string[] | null>();
  protected previewItems = signal<{ code: string; label: Record<string, string>, checked: boolean; }[]>([]);

  ngOnInit(): void {
    if (this.type === 'form') {
      if (!this.form.contains('select_choices_or_calculations')) {
        this.form.addControl(
          'select_choices_or_calculations',
          this.fb.array([])
        );
      }
    }
    if (this.type === 'preview') {
      this.previewItems.set((this.entity().select_choices_or_calculations ?? [])
        .map(item => (
          { code: item.code, label: item.label, checked: this.answer()?.value?.includes(item.code) ?? false }
        ))
      );
    }
  }

  get choices(): FormArray {
    return this.form.get('select_choices_or_calculations') as FormArray;
  }

  protected onLogicInputChange(value: MatSelectChange<string>) {
    this.logicValueChange.emit(value.value);
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
