import {Component, inject, Input, InputSignal, OnInit, output, signal} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';
import {
  RadarOption
} from '../../../../../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import {AppQuestion, DEFAULT_LANGUAGE} from '../../../../../models/questionnaire';
import {
  QuestionChoicesFormArray
} from '../../../containers/questionnaire-questions/question-choices-form-array/question-choices-form-array';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect, MatSelectChange} from '@angular/material/select';
import {QuestionnaireDialogStateService} from '../../../services/questionnaire-dialog-state.service';
import {MatButton} from '@angular/material/button';
import {ReplacePlaceholdersPipe} from '../../../containers/questionnaire-preview/pipes/replace-placeholders.pipe';
import {
  QuestionHeaderComponent
} from '../../../containers/questionnaire-preview/question/question-header/question-header.component';

@Component({
  selector: 'app-radio-question',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    MatIcon,
    QuestionChoicesFormArray,
    MatRadioButton,
    MatRadioGroup,
    MatFormField,
    MatLabel,
    MatInput,
    MatOption,
    MatSelect,
    MatButton,
    ReplacePlaceholdersPipe,
    QuestionHeaderComponent,
  ],
  templateUrl: './radio-question.component.html'
})
export class RadioQuestionComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogState = inject(QuestionnaireDialogStateService);

  @Input({ required: true }) type!: 'form' | 'button'| 'preview' | 'cl-view';
  @Input() language = signal(this.dialogState.selectedQuestionnaire()!.defaultLanguage);// ?? DEFAULT_LANGUAGE);// InputSignal<RadarOption>;
  // @Input({ required: true }) language!: InputSignal<RadarOption>;
  @Input({ required: true }) entity!:  InputSignal<AppQuestion>;
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) languages!: RadarOption[];
  @Input({ required: true }) index!: number;
  @Input({ required: true }) value!: string;
  @Input({ required: true }) operator!: string;
  @Input({required: true}) answer!: InputSignal<any>;

  valueChange = output<any>();
  protected isDisabled: unknown;


  ngOnInit(): void {
    if (this.type === 'form') {
      if (!this.form.contains('select_choices_or_calculations')) {
        this.form.addControl(
          'select_choices_or_calculations',
          this.fb.array([])
        );
      }
    }
  }

  get choices(): FormArray {
    return this.form.get('select_choices_or_calculations') as FormArray;
  }

  protected onInputChange(value: MatSelectChange) {
    console.log('Class: RadioQuestionComponent, Function: onInputChange, Line 64 value' , value);
    this.valueChange.emit(value.value);
  }

  onValueChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(value);
  }

  protected onPreviewReset() {

  }

  protected onPreviewInputChange(code: string) {

  }
}
