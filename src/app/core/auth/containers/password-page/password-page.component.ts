import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule,
  ValidatorFn
} from "@angular/forms";
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ProfileService} from '../../services/profile.service';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {TranslatePipe} from "@ngx-translate/core";
import {MatFormField} from "@angular/material/select";
import {MatError, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatInput} from "@angular/material/input";
import {ErrorMessageComponent} from "../../../error/components/message/error-message.component";
import {Validator, ValidatorError} from '../../../../shared/utils/validators';

@Component({
  selector: 'rb-password-page',
  templateUrl: './password-page.component.html',
  imports: [
    MatCard,
    MatCardHeader,
    TranslatePipe,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatIcon,
    MatError,
    MatButton,
    MatProgressSpinner,
    MatInput,
    MatCardSubtitle,
    MatCardTitle,
    ErrorMessageComponent
  ]
})
export class PasswordPageComponent implements OnInit, OnDestroy {
  protected readonly ValidatorError = ValidatorError;

  isLoading = false;
  error = false;
  success = false;

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

  _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService
  ) {
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
      this.error = false;
      this.success = false;
    });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  update(): void {
    this.isLoading = true;
    this.success = false;
    this.error = false;
    const password = this.form.controls.password?.value;
    if (password) {
      this.profileService.updatePassword(password).subscribe({
        next: () => {
          this.success = true;
          this.error = false;
          this.isLoading = false;
        },
        error: (error) => {
          this.error = true;
          this.success = false;
          this.isLoading = false;
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
