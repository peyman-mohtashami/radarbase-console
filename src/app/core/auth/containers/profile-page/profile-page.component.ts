import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {debounceTime} from 'rxjs/operators';
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
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {ManagementPortalUser} from '../../models/auth.model';
import {AuthService} from "../../services/auth.service";
import {toSignal} from "@angular/core/rxjs-interop";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorMessageBoxComponent} from '../../../../shared/components/message-box/error-message-box.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    TranslatePipe,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatHint,
    MatError,
    MatButton,
    MatIcon,
    MatCardTitle,
    MatCardSubtitle,
    MatProgressSpinner,
    ErrorMessageBoxComponent
  ]
})
export class ProfilePageComponent implements OnInit {
  protected readonly ValidatorHint = ValidatorHint;
  protected readonly ValidatorError = ValidatorError;

  private profileService = inject(ProfileService);
  authService = inject(AuthService);

  loading = signal(false);
  error = signal<HttpErrorResponse | null>(null);
  success = signal(false);

  form = new FormGroup({
    login: new FormControl({value: '', disabled: true}),
    firstName: new FormControl('', [Validator.normalTextValidator]),
    lastName: new FormControl('', [Validator.normalTextValidator]),
    email: new FormControl({value: '', disabled: true}, [Validator.requiredValidator, Validator.emailValidator]),
  })

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

  ngOnInit() {
    const user = this.authService.user();
    if (user) {
      this.form.patchValue(user);
    }
  }

  save(): void {
    this.loading.set(true);
    this.error.set(null);
    this.profileService.update(this.form.value as ManagementPortalUser).subscribe({
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
