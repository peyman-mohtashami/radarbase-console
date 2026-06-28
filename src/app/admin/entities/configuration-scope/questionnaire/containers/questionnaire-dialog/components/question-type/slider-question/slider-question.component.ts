import {Component, inject, Input, InputSignal, OnInit, output, signal} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {
  RadarOption
} from '../../../../../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import {AppQuestion} from '../../../../../models/questionnaire';
import {Validator as CustomValidator, ValidatorError} from '../../../../../../../../../shared/utils/validators';
import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {QuestionnaireDialogStateService} from '../../../services/questionnaire-dialog-state.service';
import {MatButton} from '@angular/material/button';
import {MatSlider, MatSliderThumb} from '@angular/material/slider';
import {ReplacePlaceholdersPipe} from '../../../containers/questionnaire-preview/pipes/replace-placeholders.pipe';
import {
  QuestionHeaderComponent
} from '../../../containers/questionnaire-preview/question/question-header/question-header.component';
import {
  TextFormGroupComponent
} from '../../../containers/questionnaire-questions/text-form-group/text-form-group.component';

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
  ],
  templateUrl: './slider-question.component.html'
})
export class SliderQuestionComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogState = inject(QuestionnaireDialogStateService);

  protected readonly ValidatorError = ValidatorError;

  @Input({ required: true }) type!: 'form' | 'button'| 'preview' | 'logic';
  @Input() language = signal(this.dialogState.selectedQuestionnaire()!.defaultLanguage);
  @Input({ required: true }) entity!:  InputSignal<AppQuestion>;
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) languages!: RadarOption[];
  @Input({ required: true }) index!: number;
  @Input({ required: true }) value!: string;
  @Input({ required: true }) operator!: string;
  @Input({required: true}) answer!: InputSignal<{value: string}>;

  // protected logicInputControl = new FormControl<string>('', { nonNullable: true });
  // private logicInputSubscription?: Subscription;
  logicValueChange = output<string>();

  protected isPreviewDisabled = false;
  previewValueChange = output<string | null>();


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
          })
        );
      }
    }
  }

  get range(): FormGroup {
    return this.form.get('range') as FormGroup;
  }

  protected onLogicInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.logicValueChange.emit(value);
  }

  protected onPreviewInputChange(value: number | null) {
    this.previewValueChange.emit(value === null ? null : `${value}`);
  }

  protected asFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }
}
