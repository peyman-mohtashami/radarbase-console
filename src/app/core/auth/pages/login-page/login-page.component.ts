import {Component, computed, inject, linkedSignal, signal} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {first} from "rxjs/operators";
import {TranslatePipe} from "@ngx-translate/core";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatButton} from "@angular/material/button";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorMessageBoxComponent} from '../../../../shared/components/message-box/error-message-box.component';
import {LastUrlService} from '../../../navigation-tracker/services/last-url.service';
import {requiredField} from '../../../../shared/utils/signal-form-validators';
import {form} from "@angular/forms/signals";
import {ReactiveFormsModule} from '@angular/forms';
import {BrandingComponent} from '../../components/branding/branding.component';
import {MatCard, MatCardContent} from '@angular/material/card';
import {
  InputFormFieldComponent
} from '../../../../admin/shared/components/app-form-fields/input-form-field/input-form-field.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  imports: [
    TranslatePipe,
    MatIcon,
    MatProgressSpinner,
    RouterLink,
    MatButton,
    ErrorMessageBoxComponent,
    ReactiveFormsModule,
    BrandingComponent,
    MatCard,
    MatCardContent,
    InputFormFieldComponent,
  ]
})
export class LoginPageComponent {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly model = signal({
    username: '',
    password: '',
  });

  protected readonly form = form(this.model, (schema) => {
    requiredField(schema.username);
    requiredField(schema.password);
  });

  protected readonly loading = signal(false);
  protected readonly stateError = signal(!!history.state?.['error']);
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
    this.authService.authenticateWithCredential(this.model()).pipe(first()).subscribe({
      next: () => this.redirectAfterLogin(),
      error: (error: HttpErrorResponse) => {
        this.loading.set(false);
        this.error.set(error);
      },
    });
  }

  private redirectAfterLogin(): void {
    const lastLocation = LastUrlService.getLastUrl();
    this.router.navigateByUrl(lastLocation || '/admin').then(() => {
      LastUrlService.clearLastUrl();
    });
  }
}
