import {Component, inject, OnInit, signal, ChangeDetectionStrategy} from '@angular/core';
import {Validator, ValidatorError} from "../../../../shared/utils/validators";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {first} from "rxjs/operators";
import {AuthCardComponent} from "../../components/auth-card/auth-card.component";
import {TranslatePipe} from "@ngx-translate/core";
import {MatFormField} from "@angular/material/select";
import {MatError} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {CredentialAuthRequest} from '../../models/auth.model';
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorMessageBoxComponent} from '../../../../shared/components/message-box/error-message-box.component';
import {LastUrlService} from '../../../navigation-tracker/services/last-url.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    AuthCardComponent,
    TranslatePipe,
    ReactiveFormsModule,
    MatFormField,
    MatError,
    MatIcon,
    MatProgressSpinner,
    RouterLink,
    MatInput,
    MatButton,
    ErrorMessageBoxComponent,
  ]
})
export class LoginPageComponent implements OnInit {
  protected readonly ValidatorError = ValidatorError;

  private authService = inject(AuthService);
  private router = inject(Router);

  form = new FormGroup({
    username: new FormControl("", [Validator.requiredValidator]),
    password: new FormControl("", [Validator.requiredValidator]),
    // remember: this.fb.control(false),
  })

  loading = signal(false);
  error = signal<HttpErrorResponse | null>(null);
  success = signal(false);
  stateError = signal(false);


  ngOnInit(): void {
    this.stateError.set(!!history.state?.['error']);
  }

  loginHandler(): void {
    this.loading.set(true);
    this.login();
  }

  private login() {
    const credentials = this.form.value as CredentialAuthRequest;
    this.authService
      .authenticateWithCredential(credentials)
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
