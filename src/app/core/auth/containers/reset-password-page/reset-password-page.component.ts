import {Component, effect, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import { ProfileService } from '../../services/profile.service';
import {AuthCardComponent} from "../../components/auth-card/auth-card.component";
import {TranslatePipe} from "@ngx-translate/core";
import {MatError, MatInput} from "@angular/material/input";
import {MatFormField} from "@angular/material/select";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorMessageBoxComponent} from '../../../../shared/components/message-box/error-message-box.component';
import {requiredField} from '../../../../shared/utils/signal-form-validators';
import {validate, form, FormField} from '@angular/forms/signals';
import {measureStrength} from '../password-page/password-page.component';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  imports: [
    AuthCardComponent,
    TranslatePipe,
    RouterLink,
    MatFormField,
    MatInput,
    MatIcon,
    MatError,
    MatIcon,
    MatButton,
    MatProgressSpinner,
    ErrorMessageBoxComponent,
    FormField,
  ]
})
export class ResetPasswordPageComponent implements OnInit, OnDestroy {
  private profileService = inject(ProfileService);
  private activatedRoute = inject(ActivatedRoute);

  loading = signal(false);
  error = signal<HttpErrorResponse | null>(null);
  success = signal(false);

  hidePassword = true;
  hideConfirmPassword = true;

  key?: string;

  model = signal({
    password: '',
    confirmPassword: ''
  });

  form = form(this.model, (schema) => {
    requiredField(schema.password);
    validate(schema.password, ({value}) => {
      if (measureStrength(value())) {
        return null;
      } else {
        return {
          kind: 'passwordStrength',
          message: 'SHARED.validatorError.passwordStrength',
        };
      }
    });
    requiredField(schema.confirmPassword);
    validate(schema.password, ({value, valueOf}) => {
      const password = value();
      const confirmPassword = valueOf(schema.confirmPassword);
      if (password && confirmPassword) {
        if (password !== confirmPassword) {
          return {
            kind: 'passwordMismatch',
            message: 'SHARED.validatorError.passwordMismatch',
          }
        }
        return null;
      }
      return null;
    });
  });

  constructor() {
    effect(() => {
      if (this.model()) {
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

  update(event: SubmitEvent): void {
    event.preventDefault();
    this.loading.set(true);
    this.error.set(null);
    this.success.set(false);
    const password = this.model().password;
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
