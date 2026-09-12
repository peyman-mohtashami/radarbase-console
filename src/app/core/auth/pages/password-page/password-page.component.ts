import {Component, computed, inject, linkedSignal, signal} from '@angular/core';
import {ProfileService} from '../../services/profile.service';
import {MatCard, MatCardContent} from "@angular/material/card";
import {TranslatePipe} from "@ngx-translate/core";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorMessageBoxComponent} from '../../../../shared/components/message-box/error-message-box.component';
import {
  requiredField,
  validatePasswordMatch,
  validatePasswordStrength
} from '../../../../shared/utils/signal-form-validators';
import {form} from '@angular/forms/signals';
import {
  InputFormFieldComponent
} from '../../../../shared/components/app-form-fields/input-form-field/input-form-field.component';
import {MatSuffix} from '@angular/material/input';

@Component({
  selector: 'app-password-page',
  templateUrl: './password-page.component.html',
  imports: [
    MatCard,
    TranslatePipe,
    MatCardContent,
    MatIcon,
    MatButton,
    MatProgressSpinner,
    ErrorMessageBoxComponent,
    InputFormFieldComponent,
    MatIconButton,
    MatSuffix
  ]
})
export class PasswordPageComponent {
  private readonly profileService = inject(ProfileService);

  protected readonly loading = signal(false);
  protected readonly success = signal(false);
  protected readonly error = linkedSignal<HttpErrorResponse | null>(() => {
    this.model();
    return null;
  });

  protected readonly formSubmitDisabled = computed(() =>
    this.form().invalid() || !this.form().dirty() || this.loading() || this.success()
  );

  hidePassword = true;
  hideConfirmPassword = true;

  protected readonly model = signal({
    password: '',
    confirmPassword: ''
  });

  protected readonly form = form(this.model, (schema) => {
    requiredField(schema.password);
    validatePasswordStrength(schema.password);
    requiredField(schema.confirmPassword);
    validatePasswordMatch(schema.password, schema.confirmPassword);
  });

  protected onSubmit(event: SubmitEvent): void {
    event.preventDefault();
    this.loading.set(true);
    const password = this.model().password;

    this.profileService.updatePassword(password).subscribe({
      next: () => {
        this.success.set(true);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set(error);
        this.success.set(false);
        this.loading.set(false);
      },
    });
  }
}

