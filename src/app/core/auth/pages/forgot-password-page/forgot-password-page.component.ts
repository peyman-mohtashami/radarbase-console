import {Component, computed, inject, linkedSignal, signal} from '@angular/core';

import {ProfileService} from '../../services/profile.service';
import {TranslatePipe} from "@ngx-translate/core";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatIcon} from "@angular/material/icon";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorMessageBoxComponent} from '../../../../shared/components/message-box/error-message-box.component';
import {form} from "@angular/forms/signals";
import {emailField, requiredField} from '../../../../shared/utils/signal-form-validators';
import {BrandingComponent} from '../../components/branding/branding.component';
import {
  InputFormFieldComponent
} from '../../../../admin/shared/components/app-form-fields/input-form-field/input-form-field.component';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatSuffix} from '@angular/material/input';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  imports: [
    TranslatePipe,
    MatButton,
    MatProgressSpinner,
    RouterLink,
    MatIcon,
    ErrorMessageBoxComponent,
    BrandingComponent,
    InputFormFieldComponent,
    MatCard,
    MatCardContent,
    MatSuffix,
  ],
})
export class ForgotPasswordPageComponent {

  private readonly profileService = inject(ProfileService);

  protected readonly model = signal({
    email: ""
  });

  protected readonly form = form(this.model, (schema) => {
    requiredField(schema.email);
    emailField(schema.email);
  });

  protected readonly loading = signal(false);
  protected readonly success = signal(false);
  protected readonly error = linkedSignal<HttpErrorResponse | null>(() => {
    this.model();
    return null;
  });

  protected readonly formSubmitDisabled = computed(() =>
    this.form().invalid() || !this.form().dirty() || this.loading()
  );

  protected onSubmit(event: SubmitEvent): void {
    event.preventDefault();
    this.loading.set(true);
    this.profileService.requestResetPassword(this.model().email).subscribe({
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
