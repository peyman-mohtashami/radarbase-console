import {Component, inject, OnDestroy, OnInit, signal} from "@angular/core";
import {ActivatedRoute, RouterLink} from '@angular/router';

import {ProfileService} from '../../services/profile.service';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {AuthCardComponent} from "../../components/auth-card/auth-card.component";
import {TranslatePipe} from "@ngx-translate/core";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorMessageBoxComponent} from '../../../../shared/components/message-box/error-message-box.component';

@Component({
  selector: 'app-activate-page',
  templateUrl: './activate-page.component.html',
  imports: [
    AuthCardComponent,
    TranslatePipe,
    RouterLink,
    ErrorMessageBoxComponent
  ],
})
export class ActivatePageComponent implements OnInit, OnDestroy {
  private profileService = inject(ProfileService);
  private activatedRoute = inject(ActivatedRoute);

  loading = signal(false);
  error = signal<HttpErrorResponse | null>(null);
  success = signal(false);

  key?: string;

  _destroy$: Subject<void> = new Subject<void>();

  ngOnInit() {
    this.activatedRoute.queryParams.pipe(
      takeUntil(this._destroy$)
    ).subscribe((params) => {
      this.key = params['key'];
      this.send();
    });
  }

  send(): void {
    if (this.key) {
      this.profileService.sendActivation(this.key).subscribe({
        next: () => {
          this.success.set(true);
          this.error.set(null);
          this.loading.set(false);
        },
        error: (error) => {
          this.error.set(error);
          this.success.set(false);
          this.loading.set(false);
        }
      });
    }
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
