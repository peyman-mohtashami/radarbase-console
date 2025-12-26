import { Component, OnDestroy } from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validator
} from '@angular/forms';
import { Subscription } from "rxjs";
import { ValidatorError } from '../../../../shared/utils/validators';

@Component({
  selector: 'app-base-form-group',
  template: '',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export abstract class BaseFormGroupComponent<T = any> implements ControlValueAccessor, Validator, OnDestroy {
  protected readonly ValidatorError = ValidatorError;

  // Each child component will define its specific controls
  abstract form: FormGroup;

  protected valueChangesSub?: Subscription;

  onChange = (value: T | null) => {};
  onTouch = () => {};

  /**
   * Recursively collects errors from the form and nested groups.
   */
  validate(): ValidationErrors | null {
    const errors: ValidationErrors = {};

    const checkErrors = (group: FormGroup, prefix = '') => {
      Object.keys(group.controls).forEach(key => {
        const ctrl = group.get(key);
        const fullKey = prefix ? `${prefix}.${key}` : key;

        if (ctrl?.errors) {
          errors[fullKey] = ctrl.errors;
        }

        if (ctrl instanceof FormGroup) {
          checkErrors(ctrl, fullKey);
        }
      });
    };

    checkErrors(this.form);
    return Object.keys(errors).length > 0 ? errors : null;
  }

  writeValue(value: T | null): void {
    if (value) {
      this.form.patchValue(value, { emitEvent: false });
    } else {
      this.form.reset(undefined, { emitEvent: false });
    }
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.valueChangesSub?.unsubscribe();
    this.valueChangesSub = this.form.valueChanges.subscribe(value => {
      fn(value);
    });
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  ngOnDestroy(): void {
    this.valueChangesSub?.unsubscribe();
  }
}
