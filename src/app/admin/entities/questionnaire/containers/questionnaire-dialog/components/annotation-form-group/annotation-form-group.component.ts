import {Component, OnDestroy} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule, AbstractControl, ValidationErrors, NG_VALIDATORS, Validator
} from '@angular/forms';
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {Subscription} from "rxjs";
import {ValidatorError, Validator as CustomValidator} from "../../../../../../../shared/utils/validators";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-annotation-form-group',
  templateUrl: './annotation-form-group.component.html',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatError,
    TranslatePipe,
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: AnnotationFormGroupComponent
  },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: AnnotationFormGroupComponent
    }]
})
export class AnnotationFormGroupComponent implements ControlValueAccessor, OnDestroy, Validator {

  protected readonly ValidatorError = ValidatorError;

  form = new FormGroup({
    image: new FormControl<string | null>(null, {validators: [CustomValidator.requiredValidator]}),
    timer: new FormGroup({
      start: new FormControl<number | null>(null, {validators: [CustomValidator.requiredValidator]}),
      end: new FormControl<number | null>(null, {validators: [CustomValidator.requiredValidator]}),
    }),
    unit: new FormControl<string | null>(null, {validators: [CustomValidator.requiredValidator]})
  });

  private valueChangesSub?: Subscription;

  validate(control: AbstractControl): ValidationErrors | null {
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

  onChange = (value: any) => {};
  onTouch = () => {};

  writeValue(value?: {image: string; timer: {start: number; end: number;}; unit: string;} | null) {
    if (value) {
      this.form.patchValue(value, { emitEvent: false });
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
