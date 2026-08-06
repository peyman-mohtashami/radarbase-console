import {Component, inject, Input, InputSignal, OnInit, output, signal, ChangeDetectionStrategy} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';
import {AppQuestion, AppQuestionChoice, AppQuestionnaireLanguage} from '../../../../../../../models/questionnaire';
import {
  QuestionChoicesFormArray
} from '../../question-choices-form-array/question-choices-form-array';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatOption, MatSelect, MatSelectChange} from '@angular/material/select';
import {QuestionnaireDialogStateService} from '../../../../../services/questionnaire-dialog-state.service';
import {MatButton} from '@angular/material/button';
import {ReplacePlaceholdersPipe} from '../../../../questionnaire-preview/pipes/replace-placeholders.pipe';
import {
  QuestionHeaderComponent
} from '../../../../questionnaire-preview/question/question-header/question-header.component';

@Component({
  selector: 'app-range-question',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    MatIcon,
    QuestionChoicesFormArray,
    MatSlideToggle,
    MatFormField,
    MatSelect,
    MatOption,
    MatButton,
    ReplacePlaceholdersPipe,
    QuestionHeaderComponent,
    MatInput,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './range-question.component.html'
})
export class RangeQuestionComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogState = inject(QuestionnaireDialogStateService);

  @Input({ required: true }) type!: 'form' | 'button'| 'preview' | 'logic';
  @Input() language = signal(this.dialogState.questionnaire()!.defaultLanguage);
  @Input({ required: true }) entity!: InputSignal<AppQuestion>;
  @Input() form!: FormGroup;
  @Input() languages!: AppQuestionnaireLanguage[];
  @Input() index!: number;
  @Input() value!: string;
  @Input() operator!: string;
  @Input() answer!: InputSignal<{ value: string}>;

  logicValueChange = output<string>();

  protected isPreviewDisabled = false;
  previewValueChange = output<string | null>();

  protected previewValue: string | null = null;
  protected previewSelectedLabel: string | null = null;

  ngOnInit(): void {
    if (this.type === 'form') {
      if (!this.form.contains('select_choices_or_calculations')) {
        this.form.addControl(
          'select_choices_or_calculations',
          this.fb.array([])
        );
      }
      if (!this.form.contains('show_code')) {
        this.form.addControl(
          'show_code',
          this.fb.control(this.entity().show_code)
        );
      }
      if (!this.form.contains('show_selected_label')) {
        this.form.addControl(
          'show_selected_label',
          this.fb.control(this.entity().show_selected_label)
        );
      }
      if (!this.form.contains('matrix_group_name')) {
        this.form.addControl(
          'matrix_group_name',
          this.fb.control(this.entity().matrix_group_name)
        );
      }
    }
    if (this.type === 'preview') {
      this.previewValue = this.answer()?.value !== undefined ? this.answer().value : null;
      this.previewSelectedLabel = this.entity().select_choices_or_calculations?.find(e => e.code === this.previewValue)?.label[this.language().code] ?? null;
    }
  }

  get choices(): FormArray {
    return this.form.get('select_choices_or_calculations') as FormArray;
  }

  get show_selected_label(): FormControl {
    return this.form.get('show_selected_label') as FormControl;
  }

  get show_code(): FormControl {
    return this.form.get('show_code') as FormControl;
  }

  get matrix_group_name(): FormControl {
    return this.form.get('matrix_group_name') as FormControl;
  }

  // protected onInputChange(value: MatSelectChange) {
  //   console.log('Class: RadioQuestionComponent, Function: onInputChange, Line 64 value' , value);
  //   this.valueChange.emit(value.value);
  // }

  // onValueChange(event: Event): void {
  //   const value = (event.target as HTMLInputElement).value;
  //   this.valueChange.emit(value);
  // }

  // protected onPreviewReset() {
  //
  // }

  // protected onPreviewInputChange(value: string) {
  //   this.previewValueChange.emit(value);
  // }

  // protected labelsDisabled() {
  //   return false;
  // }

  protected onLogicInputChange(value: MatSelectChange<string>) {
    this.logicValueChange.emit(value.value);
  }

  protected onPreviewInputChange(value: string | null) {
    this.previewValue = value;
    this.previewSelectedLabel = this.entity().select_choices_or_calculations?.find(e => e.code === this.previewValue)?.label[this.language().code] ?? null;
    this.previewValueChange.emit(value);
  }

  // protected labelsDisabled() {
  //   return false;
  // }
}
