import {Component, inject, OnInit, signal} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {first} from "rxjs/operators";
import {AuthCardComponent} from "../../components/auth-card/auth-card.component";
import {TranslatePipe} from "@ngx-translate/core";
import {MatFormField} from "@angular/material/select";
import {MatError} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorMessageBoxComponent} from '../../../../shared/components/message-box/error-message-box.component';
import {LastUrlService} from '../../../navigation-tracker/services/last-url.service';
import {requiredField} from '../../../../shared/utils/signal-form-validators';
import {form, FormField} from "@angular/forms/signals";
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  imports: [
    AuthCardComponent,
    TranslatePipe,
    MatFormField,
    MatError,
    MatIcon,
    MatProgressSpinner,
    RouterLink,
    MatInput,
    MatButton,
    ErrorMessageBoxComponent,
    ReactiveFormsModule,
    FormField,
  ]
})
export class LoginPageComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  model = signal({
    username: '',
    password: '',
  });

  form = form(this.model, (schema) => {
    requiredField(schema.username);
    requiredField(schema.password);
  });

  loading = signal(false);
  error = signal<HttpErrorResponse | null>(null);
  success = signal(false);
  stateError = signal(false);

  ngOnInit(): void {
    this.stateError.set(!!history.state?.['error']);
  }

  loginHandler(event: SubmitEvent): void {
    event.preventDefault();
    this.loading.set(true);
    this.login();
  }

  private login() {
    this.authService
      .authenticateWithCredential(this.model())
      .pipe(first())
      .subscribe({
        next: () => {
          this.error.set(null);
          const lastLocation = LastUrlService.getLastUrl();
          this.router.navigateByUrl(lastLocation || '/admin').then(() => {
            LastUrlService.clearLastUrl();
          });
        },
        error: (error) => {
          this.loading.set(false);
          this.error.set(error);
          throw error;
        },
      });
  }
}
