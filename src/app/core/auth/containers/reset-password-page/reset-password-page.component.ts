import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, RouterLink} from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
import {MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {ErrorMessageComponent} from "../../../error/components/message/error-message.component";

@Component({
  selector: 'rb-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  imports: [
    AuthCardComponent,
    TranslatePipe,
    RouterLink,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatIcon,
    MatError,
    MatIcon,
    MatButton,
    MatProgressSpinner,
    ErrorMessageComponent
  ]
})
export class ResetPasswordPageComponent implements OnInit, OnDestroy {
  protected readonly ValidatorError = ValidatorError;

  private profileService = inject(ProfileService);
  private activatedRoute = inject(ActivatedRoute);

  isLoading = false;
  error = false;
  success = false;

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
  })

  _destroy$: Subject<void> = new Subject<void>();

  ngOnInit() {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this._destroy$))
      .subscribe((params) => {
        this.key = params['key'];
      });

    this.form?.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
      this.error = false;
      this.success = false;
    });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  update(): void {
    this.isLoading = true;
    this.success = false;
    this.error = false;
    const password = this.form.controls.password?.value;
    if (this.key && password) {
      this.profileService
        .updatePasswordFinish({ key: this.key, newPassword: password })
        .subscribe({
          next: () => {
            this.success = true;
            this.error = false;
            this.isLoading = false;
          },
          error: () => {
            this.error = true;
            this.success = false;
            this.isLoading = false;
          },
        });
    }
  }
}
