import {Component, inject, Input, InputSignal, OnInit, output, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {
  RadarOption
} from '../../../../../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import {AppQuestion} from '../../../../../models/questionnaire';
import {Validator as CustomValidator, ValidatorError} from '../../../../../../../../../shared/utils/validators';
import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {
  QuestionHeaderComponent
} from '../../../containers/questionnaire-preview/question/question-header/question-header.component';
import {
  ScrollableContentComponent
} from '../../../containers/questionnaire-preview/question/scrolable-content/scrollable-content.component';
import {QuestionnaireDialogStateService} from '../../../services/questionnaire-dialog-state.service';
import {MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'app-timed-question',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    MatError,
    MatFormField,
    MatInput,
    MatButton,
    QuestionHeaderComponent,
    ScrollableContentComponent,
  ],
  templateUrl: './timed-question.component.html'
})
export class TimedQuestionComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogState = inject(QuestionnaireDialogStateService);

  @Input({ required: true }) type!: 'form' | 'button'| 'preview' | 'logic';
  @Input() language = signal(this.dialogState.selectedQuestionnaire()!.defaultLanguage);
  @Input({ required: true }) entity!:  InputSignal<AppQuestion>;
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) languages!: RadarOption[];
  @Input({ required: true }) index!: number;
  @Input({ required: true }) value!: string;
  @Input({ required: true }) operator!: string;
  @Input({required: true}) answer!: InputSignal<{ value: string}>;

  logicValueChange = output<string>();

  protected isPreviewDisabled = false;
  previewValueChange = output<string | null>();

  ngOnInit(): void {
    if (this.type === 'form') {
      if (!this.form.contains('field_annotation')) {
        this.form.addControl(
          'field_annotation',
          this.fb.group({
            image: this.fb.control(this.entity().field_annotation?.image, {validators: [CustomValidator.requiredValidator]}),
            unit: this.fb.control(this.entity().field_annotation?.unit, {validators: [CustomValidator.requiredValidator]}),
            timer: this.fb.group({
              start: this.fb.control(this.entity().field_annotation?.timer?.start, {validators: [CustomValidator.requiredValidator]}),
              end: this.fb.control(this.entity().field_annotation?.timer?.end, {validators: [CustomValidator.requiredValidator]}),
            })
          })
        );
      }
    }
  }

  get field_annotation(): FormGroup {
    return this.form.get('field_annotation') as FormGroup;
  }

  get timer(): FormGroup {
    return this.field_annotation.get('timer') as FormGroup;
  }

  protected onLogicInputChange(value: MatSelectChange<string>) {
    this.logicValueChange.emit(value.value);
  }

  protected onPreviewInputChange(value: string | null) {
    this.previewValueChange.emit(value);
  }

  protected readonly ValidatorError = ValidatorError;
}
