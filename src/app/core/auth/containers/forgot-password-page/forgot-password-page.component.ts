import {Component, effect, inject, signal, ChangeDetectionStrategy} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

import {Validator, ValidatorError} from '../../../../shared/utils/validators';
import {ProfileService} from '../../services/profile.service';
import {debounceTime} from 'rxjs/operators';
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
import {toSignal} from "@angular/core/rxjs-interop";
import {ErrorMessageBoxComponent} from '../../../../shared/components/message-box/error-message-box.component';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    AuthCardComponent,
    TranslatePipe,
    MatButton,
    ReactiveFormsModule,
    MatFormField,
    MatError,
    MatInput,
    MatProgressSpinner,
    RouterLink,
    MatIcon,
    ErrorMessageBoxComponent
  ],
})
export class ForgotPasswordPageComponent {
  protected readonly ValidatorError = ValidatorError;

  private profileService = inject(ProfileService)

  form = new FormGroup({
    email: new FormControl("", [Validator.requiredValidator, Validator.emailValidator]),
  })

  loading = signal(false);
  error = signal<HttpErrorResponse | null>(null);
  success = signal(false);

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

  send() {
    const email = this.form.controls.email?.value;

    if (email) {
      this.profileService.requestResetPassword(email).subscribe({
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
