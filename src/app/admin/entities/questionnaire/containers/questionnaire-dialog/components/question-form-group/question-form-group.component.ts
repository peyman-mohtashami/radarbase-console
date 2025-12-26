import {Component, inject, input, OnDestroy, output, signal} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule, Validator, NG_VALIDATORS, ValidationErrors
} from '@angular/forms';
import {MatIconButton} from "@angular/material/button";
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatSelect, MatOption} from "@angular/material/select";
import {TranslatePipe} from "@ngx-translate/core";
import {Subscription} from "rxjs";
import {ChoicesFormArrayComponent} from "../choices-form-array/choices-form-array.component";
import {ValidatorError, Validator as CustomValidator} from "../../../../../../../shared/utils/validators";
import {RadarOption} from "../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component";
import {QuestionForm, QuestionFormAnnotation, QuestionFormRange} from "../../models/question-form";
import {AppQuestion} from "../../../../models/questionnaire";
import {QUESTION_TYPES} from "../../models/question-types";
import {QuestionnaireStateService} from "../../services/questionnaire-state.service";
import {TextFormGroupComponent} from "../text-form-group/text-form-group.component";
import {AnnotationFormGroupComponent} from "../annotation-form-group/annotation-form-group.component";
import {RangeFormGroupComponent} from "../range-form-group/range-form-group.component";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {DialogMode} from '../../../../../../base-entities/enums/dialog';
import {TagComponent} from '../../../../../../../shared/components/tag/tag.component';
import {MatTooltip} from '@angular/material/tooltip';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-question-form-group',
  templateUrl: './question-form-group.component.html',
  imports: [
    MatIconButton,
    ReactiveFormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatOption,
    MatSelect,
    TranslatePipe,
    ChoicesFormArrayComponent,
    TextFormGroupComponent,
    AnnotationFormGroupComponent,
    RangeFormGroupComponent,
    MatRadioButton,
    MatRadioGroup,
    TagComponent,
    MatTooltip,
    MatIcon,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: QuestionFormGroupComponent
    }, {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: QuestionFormGroupComponent
    }
  ]
})
export class QuestionFormGroupComponent implements ControlValueAccessor, Validator, OnDestroy {

  questionnaireStateService = inject(QuestionnaireStateService);

  protected readonly QUESTION_TYPES = QUESTION_TYPES;
  protected readonly ValidatorError = ValidatorError;

  FIELD_TYPE_MAP: Record<string, string> = {
    'radio': 'Radio',
    'yesno': 'Yes/No',
    'checkbox': 'Checkbox',
    'text': 'Text Input',
    'datetime': 'Date/Time Input',
    'info': 'Info',
    'descriptive': 'Descriptive',
    'slider': 'Slider',
    'range': 'Range',
    'range-info': 'Range Info',
    'matrix-radio': 'Radio-Matrix',
    'timed': 'Timed',
    'audio': 'Audio',
  };

  languages = input.required<RadarOption[]>();
  questionIndex = input.required<number>();
  remove = output<void>();

  form = new FormGroup<Partial<QuestionForm>>({
    field_name: new FormControl('', {validators: [CustomValidator.requiredValidator], nonNullable: true}),
    field_type: new FormControl('', {validators: [CustomValidator.requiredValidator], nonNullable: true}),
    field_label: new FormControl<Record<string, string>>({}, {nonNullable: true}),
    section_header: new FormControl<Record<string, string>>({}, {nonNullable: true}),
    branching_logic: new FormControl<string>('', {nonNullable: true}),
  });

  private valueChangesSub?: Subscription;

  validate(): ValidationErrors | null {
    const errors: ValidationErrors = {};

    // Check main form controls
    Object.keys(this.form.controls).forEach(key => {
      const ctrl = this.form.get(key);
      if (ctrl?.errors) {
        errors[key] = ctrl.errors;
      }

      // Check nested form groups
      if (ctrl instanceof FormGroup) {
        Object.keys(ctrl.controls).forEach(nestedKey => {
          const nestedCtrl = ctrl.get(nestedKey);
          if (nestedCtrl?.errors) {
            errors[`${key}.${nestedKey}`] = nestedCtrl.errors;
          }

          // Handle nested form groups (like timer)
          if (nestedCtrl instanceof FormGroup) {
            Object.keys(nestedCtrl.controls).forEach(deepKey => {
              const deepCtrl = nestedCtrl.get(deepKey);
              if (deepCtrl?.errors) {
                errors[`${key}.${nestedKey}.${deepKey}`] = deepCtrl.errors;
              }
            });
          }
        });
      }
    });

    return Object.keys(errors).length > 0 ? errors : null;
  }

  // Optional: Implement registerOnValidatorChange if you need to update validation when external conditions change
  registerOnValidatorChange?(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  private onValidatorChange: (() => void) | undefined;

  constructor() {
    // Notify parent about validation changes, but don't trigger updateValueAndValidity
    if (this.onValidatorChange) {
      this.onValidatorChange();
    }

    this.form.controls.field_type?.valueChanges.subscribe(type => {
      this.updateFormControls(type);
      // Notify parent about validation changes, but don't trigger updateValueAndValidity
      if (this.onValidatorChange) {
        this.onValidatorChange();
      }
    });
  }

  ngOnDestroy() {
    this.valueChangesSub?.unsubscribe();
  }

  onChange = () => {};
  onTouch = () => {};

  updateFormControls(type?: string) {
    if (!type) return;

    ['text_validation_type_or_show_slider_number', 'text_validation_min', 'text_validation_max', 'field_annotation', 'select_choices_or_calculations', 'range'].forEach(controlName => {
      if (this.form.contains(controlName)) {
        this.form.removeControl(controlName as keyof QuestionForm);
      }
    });

    if (type === 'timed') {
      this.form.addControl('field_annotation' as keyof QuestionForm, new FormControl<QuestionFormAnnotation | null>(null));
    }
    if (type === 'slider') {
      this.form.addControl('range' as keyof QuestionForm, new FormControl<QuestionFormRange | null>(null));
    }
    if (['radio', 'checkbox', 'info', 'range', 'slider', 'range-info'].includes(type)) {
      this.form.addControl('select_choices_or_calculations' as keyof QuestionForm, new FormControl([], {validators: [CustomValidator.requiredValidator]}));
    }
    if (['text'].includes(type)) {
      this.form.addControl('text_validation_type_or_show_slider_number' as keyof QuestionForm, new FormControl<string>(''));
      this.form.addControl('text_validation_min' as keyof QuestionForm, new FormControl<string>(''));
      this.form.addControl('text_validation_max' as keyof QuestionForm, new FormControl<string>(''));
    }
    if (['datetime'].includes(type)) {
      this.form.addControl('text_validation_type_or_show_slider_number' as keyof QuestionForm, new FormControl<string>(''));
    }
  }

  writeValue(question?: AppQuestion) {
    this.updateFormControls(question?.field_type);
    if (question) {
      this.form.patchValue(question, {emitEvent: true});
    } else {
      this.form.reset();
    }
  }

  registerOnChange(fn: any) {
    this.valueChangesSub?.unsubscribe();
    this.valueChangesSub = this.form.valueChanges.subscribe(value => {
      fn(value);
    });
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  editMode = signal(false);
  protected readonly DialogMode = DialogMode;

}
