import {Component, inject, Input, InputSignal, OnInit, output, signal, ChangeDetectionStrategy} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors
} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {AppQuestion, AppQuestionnaireLanguage} from '../../../../../../../models/questionnaire';
import {Validator as CustomValidator, ValidatorError} from '../../../../../../../../../../shared/utils/validators';
import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {QuestionnaireDialogStateService} from '../../../../../services/questionnaire-dialog-state.service';
import {MatButton} from '@angular/material/button';
import {MatSlider, MatSliderThumb} from '@angular/material/slider';
import {ReplacePlaceholdersPipe} from '../../../../questionnaire-preview/pipes/replace-placeholders.pipe';
import {
  QuestionHeaderComponent
} from '../../../../questionnaire-preview/question/question-header/question-header.component';
import {
  TextFormGroupComponent
} from '../../text-form-group/text-form-group.component';

@Component({
  selector: 'app-slider-question',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    MatError,
    MatFormField,
    MatInput,
    MatButton,
    MatSlider,
    MatSliderThumb,
    ReplacePlaceholdersPipe,
    QuestionHeaderComponent,
    TextFormGroupComponent,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './slider-question.component.html'
})
export class SliderQuestionComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogState = inject(QuestionnaireDialogStateService);

  protected readonly ValidatorError = ValidatorError;

  @Input({ required: true }) type!: 'form' | 'button'| 'preview' | 'logic';
  @Input() language = signal(this.dialogState.questionnaire()!.defaultLanguage);
  @Input({ required: true }) entity!:  InputSignal<AppQuestion>;
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) languages!: AppQuestionnaireLanguage[];
  @Input({ required: true }) index!: number;
  @Input({ required: true }) value!: string;
  @Input({ required: true }) operator!: string;
  @Input({required: true}) answer!: InputSignal<{value: string}>;

  // protected logicInputControl = new FormControl<string>('', { nonNullable: true });
  // private logicInputSubscription?: Subscription;
  logicValueChange = output<string>();

  // previewValue?: number;
  protected isPreviewDisabled = false;
  previewValueChange = output<string | null>();


  // ngOnInit(): void {
  //   if (this.type === 'form') {
  //     if (!this.form.contains('range')) {
  //       this.form.addControl(
  //         'range',
  //         this.fb.group({
  //           min: this.fb.control(this.entity().range?.min, {validators: [CustomValidator.requiredValidator]}),
  //           max: this.fb.control(this.entity().range?.max, {validators: [CustomValidator.requiredValidator]}),
  //           step: this.fb.control(this.entity().range?.step, {validators: [CustomValidator.requiredValidator]}),
  //           labelLeft: this.fb.group(this.entity().range?.labelLeft ?? {}),
  //           labelRight: this.fb.group(this.entity().range?.labelRight ?? {}),
  //         })
  //       );
  //     }
  //   }
  //   // if (this.type === 'preview') {
  //   //   this.previewValue = this.answer()?.value !== undefined ? +(this.answer().value) : undefined;
  //   // }
  // }

  ngOnInit(): void {
    if (this.type === 'form') {
      if (!this.form.contains('range')) {
        this.form.addControl(
          'range',
          this.fb.group({
            min: this.fb.control(this.entity().range?.min, {validators: [CustomValidator.requiredValidator]}),
            max: this.fb.control(this.entity().range?.max, {validators: [CustomValidator.requiredValidator]}),
            step: this.fb.control(this.entity().range?.step, {validators: [CustomValidator.requiredValidator]}),
            labelLeft: this.fb.group(this.entity().range?.labelLeft ?? {}),
            labelRight: this.fb.group(this.entity().range?.labelRight ?? {}),
          }, {
            validators: [this.rangeValidator]
          })
        );
      }
    }
    // if (this.type === 'preview') {
    //   this.previewValue = this.answer()?.value !== undefined ? +(this.answer().value) : undefined;
    // }
  }

  private rangeValidator = (control: AbstractControl): ValidationErrors | null => {
    const min = Number(control.get('min')?.value);
    const max = Number(control.get('max')?.value);
    const step = Number(control.get('step')?.value);

    const errors: ValidationErrors = {};

    if (!Number.isNaN(min) && !Number.isNaN(max) && min >= max) {
      errors['minLessThanMax'] = true;
    }

    if (!Number.isNaN(step) && step <= 0) {
      errors['stepGreaterThanZero'] = true;
    }

    return Object.keys(errors).length ? errors : null;
  };


  get range(): FormGroup {
    return this.form.get('range') as FormGroup;
  }

  protected onLogicInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.logicValueChange.emit(value);
  }

  protected onPreviewInputChange(value: number | null) {
    // this.previewValue = value !== null ? value : undefined;
    this.previewValueChange.emit(value === null ? null : `${value}`);
  }

  protected asFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }
}
