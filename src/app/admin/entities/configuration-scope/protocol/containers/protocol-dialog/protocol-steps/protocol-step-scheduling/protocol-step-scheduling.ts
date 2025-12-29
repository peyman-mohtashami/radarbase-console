import {Component, effect, inject, OnDestroy} from '@angular/core';
import {MatDivider} from "@angular/material/divider";
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator
} from "@angular/forms";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatError, MatHint, MatInput, MatSuffix} from "@angular/material/input";
import {
  TimeFromZeroFormArrayComponent
} from "../../components/custom-form-controls/time-from-zero-form-array/time-from-zero-form-array.component";
import {Subscription} from "rxjs";
import {Validator as CustomValidator, ValidatorHint} from "../../../../../../../../shared/utils/validators";
import {QuestionnaireTimeUnit} from "../../../../models/protocol";
import {MatFormField, MatOption, MatSelect} from "@angular/material/select";
import {UNITS} from "../../models/unit";
import {toSignal} from "@angular/core/rxjs-interop";
import {debounceTime} from "rxjs/operators";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {TranslatePipe} from "@ngx-translate/core";
import {LocaleService} from "../../../../../../../../core/locale/services/locale.service";

@Component({
  selector: 'app-protocol-step-scheduling',
  templateUrl: './protocol-step-scheduling.html',
  imports: [
    MatDivider,
    ReactiveFormsModule,
    MatSlideToggle,
    MatFormField,
    MatHint,
    MatInput,
    MatSelect,
    MatOption,
    TimeFromZeroFormArrayComponent,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatError,
    MatSuffix,
    TranslatePipe,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ProtocolStepScheduling
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: ProtocolStepScheduling
    }
  ],
})
export class ProtocolStepScheduling implements ControlValueAccessor, OnDestroy, Validator {
  protected readonly ValidatorHint = ValidatorHint;
  protected readonly UNITS = UNITS;

  localeService = inject(LocaleService);

  form = new FormGroup({
    relativeToReferenceTime: new FormControl<boolean>(false),
    referenceTimestamp: new FormControl<string>(''),
    repeatedProtocol: new FormControl<boolean>(false),
    repeatProtocol: new FormGroup({
      unit: new FormControl<QuestionnaireTimeUnit>(QuestionnaireTimeUnit.day),
      amount: new FormControl<number>(1),
    }),
    repeatQuestionnaire: new FormGroup({
      unit: new FormControl<QuestionnaireTimeUnit | null>(null),
      unitsFromZero: new FormControl<number[]>([], {validators: [CustomValidator.requiredValidator]}),
    }),
    completionWindow: new FormGroup({
      unit: new FormControl<QuestionnaireTimeUnit>(QuestionnaireTimeUnit.day),
      amount: new FormControl<number>(1),
    }),
    reminders: new FormGroup({
      enabled: new FormControl<boolean>(false),
      unit: new FormControl<QuestionnaireTimeUnit>(QuestionnaireTimeUnit.min),
      amount: new FormControl<number>(5),
      repeat: new FormControl<number>(1),
    }),
  });

  private valueChangesSub?: Subscription;

  protected readonly relativeToReferenceTimeValueChanges = toSignal(
    this.form.controls.relativeToReferenceTime.valueChanges.pipe(debounceTime(300)),
    {initialValue: this.form.controls.relativeToReferenceTime.getRawValue()}
  );

  protected readonly repeatedProtocolValueChanges = toSignal(
    this.form.controls.repeatedProtocol.valueChanges.pipe(debounceTime(300)),
    {initialValue: this.form.controls.repeatedProtocol.getRawValue()}
  );

  protected readonly reminderEnabledValueChanges = toSignal(
    this.form.controls.reminders.controls.enabled.valueChanges.pipe(debounceTime(300)),
    {initialValue: this.form.controls.reminders.controls.enabled.getRawValue()}
  );

  constructor() {
    effect(() => {
      const relativeToReferenceTimeValue = this.relativeToReferenceTimeValueChanges();
      this.form.controls.referenceTimestamp.setValidators(!relativeToReferenceTimeValue ? [] : [CustomValidator.requiredValidator]);
      this.form.controls.referenceTimestamp.updateValueAndValidity({emitEvent: false});

      const repeatedProtocolValue = this.repeatedProtocolValueChanges();
      this.form.controls.repeatProtocol.controls.amount.setValidators(!repeatedProtocolValue ? [] : [CustomValidator.requiredValidator]);
      this.form.controls.repeatProtocol.controls.amount.updateValueAndValidity({emitEvent: false});
      this.form.controls.repeatProtocol.controls.unit.setValidators(!repeatedProtocolValue ? [] : [CustomValidator.requiredValidator]);
      this.form.controls.repeatProtocol.controls.unit.updateValueAndValidity({emitEvent: false});

      const reminderEnabledValue = this.reminderEnabledValueChanges();
      this.form.controls.reminders.controls.repeat.setValidators(!reminderEnabledValue ? [] : [CustomValidator.requiredValidator]);
      this.form.controls.reminders.controls.repeat.updateValueAndValidity({emitEvent: false});
      this.form.controls.reminders.controls.unit.setValidators(!reminderEnabledValue ? [] : [CustomValidator.requiredValidator]);
      this.form.controls.reminders.controls.unit.updateValueAndValidity({emitEvent: false});
      this.form.controls.reminders.controls.amount.setValidators(!reminderEnabledValue ? [] : [CustomValidator.requiredValidator]);
      this.form.controls.reminders.controls.amount.updateValueAndValidity({emitEvent: false});
    });
  }

  validate(control: AbstractControl): ValidationErrors | null {
    // If the host FormControl is disabled, skip validation entirely
    if (control.disabled) {
      return null;
    }

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

  ngOnDestroy() {
    this.valueChangesSub?.unsubscribe();
  }

  onChange = () => {};
  onTouch = () => {};

  writeValue(value?: Record<string, string>) {
    if (value) {
      this.form.patchValue(value, { emitEvent: true });
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
}
