import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

import { Validator, ValidatorError } from '../../../../shared/utils/validators';
import { ProfileService } from '../../services/profile.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {AuthCardComponent} from "../../components/auth-card/auth-card.component";
import {TranslatePipe} from "@ngx-translate/core";
import {MatButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/select";
import {MatError} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {RouterLink} from "@angular/router";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatIcon} from "@angular/material/icon";
import {ErrorMessageComponent} from "../../../error/components/message/error-message.component";

@Component({
  selector: 'rb-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
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
    ErrorMessageComponent
  ],
})
export class ForgotPasswordPageComponent implements OnInit, OnDestroy {
  protected readonly ValidatorError = ValidatorError;

  private profileService = inject(ProfileService)

  form = new FormGroup({
    email: new FormControl("", [Validator.requiredValidator, Validator.emailValidator]),
  })

  isLoading = false;
  error = false;
  success = false;

  _destroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.form.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
      this.error = false;
      this.success = false;
    });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  send() {
    const email = this.form.controls.email?.value;

    if (email) {
      this.profileService.requestResetPassword(email).subscribe({
        next: () => {
          console.log('Class: ForgotPasswordPageComponent, Function: next, Line 69 ' , );
          this.success = true;
          this.error = false;
          this.isLoading = false;
        },
        error: (error) => {
          console.log('Class: ForgotPasswordPageComponent, Function: error, Line 75 ' , );
          this.error = true;
          this.success = false;
          this.isLoading = false;
          throw error
        },
      });
    }
  }
}
