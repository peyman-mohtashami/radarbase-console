import {Component, computed, inject, signal} from '@angular/core';
import {ProfileService} from '../../services/profile.service';
import {MatCard, MatCardContent} from "@angular/material/card";
import {TranslatePipe} from "@ngx-translate/core";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {AuthService} from "../../services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorMessageBoxComponent} from '../../../../shared/components/message-box/error-message-box.component';
import {normalTextField, requiredField} from '../../../../shared/utils/signal-form-validators';
import {disabled, email, form} from '@angular/forms/signals';
import {ReactiveFormsModule} from '@angular/forms';
import {
  InputFormFieldComponent
} from '../../../../admin/shared/components/app-form-fields/input-form-field/input-form-field.component';
import {UserDto} from '../../../../admin/entities/user/models/user';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  imports: [
    MatCard,
    MatCardContent,
    TranslatePipe,
    MatButton,
    MatIcon,
    MatProgressSpinner,
    ErrorMessageBoxComponent,
    ReactiveFormsModule,
    InputFormFieldComponent,
  ]
})
export class ProfilePageComponent {

  private readonly profileService = inject(ProfileService);
  protected readonly authService = inject(AuthService);

  protected readonly loading = signal(false);
  protected readonly error = signal<HttpErrorResponse | null>(null);
  protected readonly success = signal(false);

  protected readonly model = signal({
    login: this.authService.user()?.login ?? '',
    firstName: this.authService.user()?.firstName ?? '',
    lastName: this.authService.user()?.lastName ?? '',
    email: this.authService.user()?.email ?? '',
  });

  protected readonly formSubmitDisabled = computed(() =>
    this.form().invalid() || !this.form().dirty() || this.loading() || this.success()
  );

  protected readonly form = form(this.model, (schema) => {
    disabled(schema.login);
    normalTextField(schema.firstName);
    normalTextField(schema.lastName);
    requiredField(schema.email);
    email(schema.email);
  });

  protected onSubmit(event: SubmitEvent): void {
    event.preventDefault();
    this.loading.set(true);
    const user = {
      ...this.authService.user(),
      ...this.model()
    } as UserDto;

    this.profileService.update(user).subscribe({
      next: () => {
        this.success.set(true);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set(error);
        this.success.set(false);
        this.loading.set(false);
      },
    });
  }
}
