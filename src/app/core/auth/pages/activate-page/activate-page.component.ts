import {Component, inject, signal} from "@angular/core";
import {ActivatedRoute, RouterLink} from '@angular/router';

import {ProfileService} from '../../services/profile.service';
import {TranslatePipe} from "@ngx-translate/core";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorBoxComponent} from '../../../../shared/components/error-box/error-box.component';import {BrandingComponent} from '../../components/branding/branding.component';
import {MatCard, MatCardContent} from '@angular/material/card';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-activate-page',
  templateUrl: './activate-page.component.html',
  imports: [
    TranslatePipe,
    RouterLink,
    ErrorBoxComponent,
    BrandingComponent,
    MatCard,
    MatCardContent,
    ReactiveFormsModule
  ],
})
export class ActivatePageComponent {
  private readonly profileService = inject(ProfileService);
  private readonly activatedRoute = inject(ActivatedRoute);

  protected readonly key = this.activatedRoute.snapshot.queryParamMap.get('key') ?? undefined;

  protected readonly loading = signal(true);
  protected readonly error = signal<HttpErrorResponse | null>(null);
  protected readonly success = signal(false);

  constructor() {
    if (this.key) {
      this.activate(this.key);
    }
  }

  private activate(key: string): void {
    this.loading.set(true);

    this.profileService.sendActivation(key).subscribe({
      next: () => {
        this.success.set(true);
        this.loading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.error.set(error);
        this.loading.set(false);
      },
    });
  }
}
