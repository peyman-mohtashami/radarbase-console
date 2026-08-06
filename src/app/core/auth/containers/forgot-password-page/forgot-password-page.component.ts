import {Component, effect, inject, signal} from '@angular/core';

import {ProfileService} from '../../services/profile.service';
import {AuthCardComponent} from "../../components/auth-card/auth-card.component";
import {TranslatePipe} from "@ngx-translate/core";
import {MatButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/select";
import {MatError} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {RouterLink} from "@angular/router";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatIcon} from "@angular/material/icon";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorMessageBoxComponent} from '../../../../shared/components/message-box/error-message-box.component';
import {email, form, FormField} from "@angular/forms/signals";
import {requiredField} from '../../../../shared/utils/signal-form-validators';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  imports: [
    AuthCardComponent,
    TranslatePipe,
    MatButton,
    MatFormField,
    MatError,
    MatInput,
    MatProgressSpinner,
    RouterLink,
    MatIcon,
    ErrorMessageBoxComponent,
    FormField
  ],
})
export class ForgotPasswordPageComponent {
  private profileService = inject(ProfileService);

  model = signal({
    email: ""
  });

  form = form(this.model, (schema) => {
    requiredField(schema.email);
    email(schema.email);
  });

  loading = signal(false);
  error = signal<HttpErrorResponse | null>(null);
  success = signal(false);

  constructor() {
    effect(() => {
      if (this.model()) {
        this.error.set(null);
      }
    });
  }

  send() {
    if (this.model().email) {
      this.profileService.requestResetPassword(this.model().email).subscribe({
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
