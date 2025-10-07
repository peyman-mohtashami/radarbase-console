import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Subject} from 'rxjs';
import {first, takeUntil} from 'rxjs/operators';
import {
  Validator,
  ValidatorHint,
  ValidatorError,
} from '../../../../shared/utils/validators';
import {ProfileService} from '../../services/profile.service';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {TranslatePipe} from "@ngx-translate/core";
import {MatError, MatHint, MatInput} from "@angular/material/input";
import {MatFormField} from "@angular/material/select";
import {MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {ErrorMessageComponent} from "../../../error/components/message/error-message.component";
import {ManagementPortalUser} from '../../../../shared/models/auth.model';

@Component({
  selector: 'rb-profile-page',
  templateUrl: './profile-page.component.html',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    TranslatePipe,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatHint,
    MatError,
    MatButton,
    MatIcon,
    MatCardTitle,
    MatCardSubtitle,
    MatProgressSpinner,
    ErrorMessageComponent
  ]
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  protected readonly ValidatorHint = ValidatorHint;
  protected readonly ValidatorError = ValidatorError;

  private profileService = inject(ProfileService);

  isLoading = false;
  error = false;
  success = false;

  user?: ManagementPortalUser;

  form = new FormGroup({
    login: new FormControl({value: '', disabled: true}),
    firstName: new FormControl('', [Validator.normalTextValidator]),
    lastName: new FormControl('', [Validator.normalTextValidator]),
    email: new FormControl('', [Validator.requiredValidator, Validator.emailValidator]),
  })

  _destroy$: Subject<void> = new Subject<void>();

  ngOnInit() {
    this.profileService
      .getUser()
      .pipe(first())
      .subscribe({
        next: (user) => {
          if (user) {
            this.user = user as ManagementPortalUser;
            this.form.patchValue(user as ManagementPortalUser);
          }
        },
      });

    this.form?.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
      this.success = false;
      this.error = false;
    });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  save(): void {
    this.isLoading = true;
    this.error = false;
    this.profileService.update(this.form.value as ManagementPortalUser).subscribe({
      next: () => {
        this.success = true;
        this.error = false;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = true;
        this.success = false;
        this.isLoading = false;
        throw error
      },
    });
  }
}
