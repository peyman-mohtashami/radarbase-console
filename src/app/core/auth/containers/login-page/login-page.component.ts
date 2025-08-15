import {Component, inject, OnInit} from '@angular/core';
import {Validator, ValidatorError} from "../../../../shared/utils/validators";
import {Subject} from "rxjs";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {first, takeUntil} from "rxjs/operators";
// import {CredentialAuthRequest} from "@rb/models";
import {StorageService} from "../../../storage/services/storage.service";
import {AuthCardComponent} from "../../components/auth-card/auth-card.component";
import {TranslatePipe} from "@ngx-translate/core";
import {MatFormField} from "@angular/material/select";
import {MatError} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {ErrorMessageComponent} from "../../../error/components/message/error-message.component";
import {CredentialAuthRequest} from '../../../../shared/models/auth.model';

@Component({
  selector: 'rb-login-page',
  templateUrl: './login-page.component.html',
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
    ErrorMessageComponent,
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

  // form = this.fb.group({
  //   username: ["", [Validator.requiredValidator]],
  //   password: ["", [Validator.requiredValidator]],
  // });
  //
  // controls = {
  //   username: this.form.get("username"),
  //   password: this.form.get("password"),
  //   // remember: this.form.get("remember"),
  // };

  isLoading = false;
  stateError = false;
  error = false;


  _destroy$: Subject<void> = new Subject<void>();

  // constructor(
  //   private router: Router,
  //   private authService: AuthService,
  //   private fb: FormBuilder
  // ) {}

  ngOnInit(): void {
    this.stateError = !!history.state?.['error'];
    this.form.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
      this.error = false;
    });
  }

  loginHandler(): void {
    this.isLoading = true;
    this.login();
  }

  private login() {
    const credentials = this.form.value as CredentialAuthRequest;
    this.authService
      .authenticateWithCredential(credentials)
      .pipe(first())
      .subscribe({
        next: () => {
          this.error = false;
          const lastLocation = StorageService.getLastLocation();
          this.router.navigateByUrl(lastLocation || '/admin').then(() => {
            StorageService.clearLastLocation();
          });
        },
        error: (error) => {
          this.isLoading = false;
          this.error = true;
          throw error;
        },
      });
  }
}
