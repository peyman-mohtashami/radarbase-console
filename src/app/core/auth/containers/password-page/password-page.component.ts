import {Component, effect, inject, signal} from '@angular/core';
import {
  AbstractControl, FormControl, FormGroup, ReactiveFormsModule,
  ValidatorFn
} from "@angular/forms";
import {debounceTime} from 'rxjs/operators';
import {ProfileService} from '../../services/profile.service';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {TranslatePipe} from "@ngx-translate/core";
import {MatFormField} from "@angular/material/select";
import {MatError} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatInput} from "@angular/material/input";
import {Validator, ValidatorError} from '../../../../shared/utils/validators';
import {HttpErrorResponse} from "@angular/common/http";
import {toSignal} from "@angular/core/rxjs-interop";
import {ErrorMessageBoxComponent} from '../../../../shared/components/message-box/error-message-box.component';

@Component({
  selector: 'app-password-page',
  templateUrl: './password-page.component.html',
  imports: [
    MatCard,
    MatCardHeader,
    TranslatePipe,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatIcon,
    MatError,
    MatButton,
    MatProgressSpinner,
    MatInput,
    MatCardSubtitle,
    MatCardTitle,
    ErrorMessageBoxComponent
  ]
})
export class PasswordPageComponent {
  protected readonly ValidatorError = ValidatorError;

  private profileService = inject(ProfileService);

  loading = signal(false);
  error = signal<HttpErrorResponse | null>(null);
  success = signal(false);

  hidePassword = true;
  hideConfirmPassword = true;

  form = new FormGroup({
    password: new FormControl(null, {
      validators: [Validator.requiredValidator, PasswordStrengthValidator],
      updateOn: 'change'
    }),
    confirmPassword: new FormControl<string | null>(null, {
      validators: [Validator.requiredValidator],
      updateOn: 'change'
    })
  }, {
    validators: [MatchPasswordValidator('password', 'confirmPassword')]
  });

  private readonly formValueChanges = toSignal(
    this.form.valueChanges.pipe(debounceTime(300)),
    {initialValue: this.form.getRawValue()}
  );

  constructor() {
    effect(() => {
      if (this.formValueChanges()) {
        this.error.set(null);
      }
    });
  }

  update(): void {
    this.loading.set(true);
    this.success.set(false);
    this.error.set(null);
    const password = this.form.controls.password?.value;
    if (password) {
      this.profileService.updatePassword(password).subscribe({
        next: () => {
          this.success.set(true);
          this.error.set(null);
          this.loading.set(false);
        },
        error: (error) => {
          this.error.set(error);
          this.success.set(false);
          this.loading.set(false);
          throw error
        },
      });
    }
  }
}

export function PasswordStrengthValidator(control: AbstractControl) {
  if (measureStrength(control.value)) {
    return null;
  }
  return {passwordStrengthValidator: true};
}

export function measureStrength(p?: string): boolean {
  if (!p) {
    return false;
  }
  const strongPassword = new RegExp(
    '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})'
  );
  return strongPassword.test(p);
}

export function MatchPasswordValidator(
  controlName: string,
  matchingControlName: string
): ValidatorFn {
  return (control: AbstractControl) => {
    const password = control.get(controlName);
    const confirmPassword = control.get(matchingControlName);
    if (password && confirmPassword) {
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({confirmPasswordValidator: true});
      } else {
        confirmPassword.setErrors(null);
      }
    }
    return null;
  };
}
