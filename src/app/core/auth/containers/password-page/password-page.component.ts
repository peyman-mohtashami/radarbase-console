import {Component, effect, inject, signal} from '@angular/core';
import {ProfileService} from '../../services/profile.service';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {TranslatePipe} from "@ngx-translate/core";
import {MatFormField} from "@angular/material/select";
import {MatError} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatInput} from "@angular/material/input";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorMessageBoxComponent} from '../../../../shared/components/message-box/error-message-box.component';
import {requiredField} from '../../../../shared/utils/signal-form-validators';
import {form, FormField, validate} from '@angular/forms/signals';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-password-page',
  templateUrl: './password-page.component.html',
  imports: [
    MatCard,
    MatCardHeader,
    TranslatePipe,
    MatCardContent,
    MatFormField,
    MatIcon,
    MatError,
    MatButton,
    MatProgressSpinner,
    MatInput,
    MatCardTitle,
    ErrorMessageBoxComponent,
    ReactiveFormsModule,
    FormField
  ]
})
export class PasswordPageComponent {
  private profileService = inject(ProfileService);

  loading = signal(false);
  error = signal<HttpErrorResponse | null>(null);
  success = signal(false);

  hidePassword = true;
  hideConfirmPassword = true;

  model = signal({
    password: '',
    confirmPassword: ''
  });

  form = form(this.model, (schema) => {
    requiredField(schema.password);
    validate(schema.password, ({value}) => {
      if (measureStrength(value())) {
        return null;
      } else {
        return {
          kind: 'passwordStrength',
          message: 'SHARED.validatorError.passwordStrength',
        };
      }
    });
    requiredField(schema.confirmPassword);
    validate(schema.password, ({value, valueOf}) => {
      const password = value();
      const confirmPassword = valueOf(schema.confirmPassword);
      if (password && confirmPassword) {
        if (password !== confirmPassword) {
          return {
            kind: 'passwordMismatch',
            message: 'SHARED.validatorError.passwordMismatch',
          }
        }
        return null;
      }
      return null;
    });
  });

  constructor() {
    effect(() => {
      if (this.model()) {
        this.error.set(null);
      }
    });
  }

  update(): void {
    this.loading.set(true);
    this.success.set(false);
    this.error.set(null);
    const password = this.model().password;
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

export function measureStrength(p?: string): boolean {
  if (!p) {
    return false;
  }
  const strongPassword = new RegExp(
    '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})'
  );
  return strongPassword.test(p);
}
