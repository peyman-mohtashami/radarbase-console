import {Component, effect, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, RouterLink} from '@angular/router';
import { Subject } from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';

import {
  MatchPasswordValidator,
  PasswordStrengthValidator,
} from '../password-page/password-page.component';
import { ProfileService } from '../../services/profile.service';
import { Validator, ValidatorError } from '../../../../shared/utils/validators';
import {AuthCardComponent} from "../../components/auth-card/auth-card.component";
import {TranslatePipe} from "@ngx-translate/core";
import {MatError, MatInput} from "@angular/material/input";
import {MatFormField} from "@angular/material/select";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {HttpErrorResponse} from "@angular/common/http";
import {toSignal} from "@angular/core/rxjs-interop";
import {ErrorMessageBoxComponent} from '../../../../shared/components/message-box/error-message-box.component';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  imports: [
    AuthCardComponent,
    TranslatePipe,
    RouterLink,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatIcon,
    MatError,
    MatIcon,
    MatButton,
    MatProgressSpinner,
    ErrorMessageBoxComponent
  ]
})
export class ResetPasswordPageComponent implements OnInit, OnDestroy {
  protected readonly ValidatorError = ValidatorError;

  private profileService = inject(ProfileService);
  private activatedRoute = inject(ActivatedRoute);

  loading = signal(false);
  error = signal<HttpErrorResponse | null>(null);
  success = signal(false);

  hidePassword = true;
  hideConfirmPassword = true;

  key?: string;

  form = new FormGroup({
    password: new FormControl<string | null>(null, {
      validators: [Validator.requiredValidator, PasswordStrengthValidator],
      updateOn: 'change'
    }),
    confirmPassword: new FormControl<string | null>(null, {
      validators: [Validator.requiredValidator],
      updateOn: 'change'
    })
  }, {
    validators: [MatchPasswordValidator('password', 'confirmPassword')]
  });

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

  _destroy$: Subject<void> = new Subject<void>();

  ngOnInit() {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this._destroy$))
      .subscribe((params) => {
        this.key = params['key'];
      });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  update(): void {
    this.loading.set(true);
    this.error.set(null);
    this.success.set(false);
    const password = this.form.controls.password?.value;
    if (this.key && password) {
      this.profileService
        .updatePasswordFinish({ key: this.key, newPassword: password })
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
            throw error
          },
        });
    }
  }
}
