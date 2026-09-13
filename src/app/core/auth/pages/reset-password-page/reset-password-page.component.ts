import {Component, computed, inject, linkedSignal, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ProfileService} from '../../services/profile.service';
import {TranslatePipe} from "@ngx-translate/core";
import {MatSuffix} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorBoxComponent} from '../../../../shared/components/error-box/error-box.component';import {
  requiredField, validatePasswordMatch,
  validatePasswordStrength
} from '../../../../shared/utils/signal-form-validators';
import {form} from '@angular/forms/signals';
import {MatCard, MatCardContent} from '@angular/material/card';
import {BrandingComponent} from '../../components/branding/branding.component';
import {
  InputFormFieldComponent
} from '../../../../shared/components/form-fields/input-form-field/input-form-field.component';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  imports: [
    TranslatePipe,
    RouterLink,
    MatIcon,
    MatIcon,
    MatButton,
    MatProgressSpinner,
    ErrorBoxComponent,
    MatCard,
    MatCardContent,
    MatSuffix,
    BrandingComponent,
    InputFormFieldComponent,
    MatIconButton,
  ]
})
export class ResetPasswordPageComponent {
  private readonly profileService = inject(ProfileService);
  private readonly activatedRoute = inject(ActivatedRoute);

  protected readonly key = this.activatedRoute.snapshot.queryParamMap.get('key') ?? undefined;

  protected readonly loading = signal(false);
  protected readonly success = signal(false);
  protected readonly error = linkedSignal<HttpErrorResponse | null>(() => {
    this.model();
    return null;
  });

  protected readonly formSubmitDisabled = computed(() =>
    this.form().invalid() || !this.form().dirty() || this.loading()
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

  onSubmit(event: SubmitEvent): void {
    event.preventDefault();
    this.loading.set(true);
    this.success.set(false);
    const password = this.model().password;
    if (this.key && password) {
      this.profileService
        .updatePasswordFinish({key: this.key, newPassword: password})
        .subscribe({
          next: () => {
            this.success.set(true);
            this.error.set(null);
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
}
