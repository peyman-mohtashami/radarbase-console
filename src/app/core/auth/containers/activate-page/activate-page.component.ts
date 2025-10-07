import {Component, inject, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, RouterLink} from '@angular/router';

import {ProfileService} from '../../services/profile.service';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {AuthCardComponent} from "../../components/auth-card/auth-card.component";
import {TranslatePipe} from "@ngx-translate/core";
import {ErrorMessageComponent} from "../../../error/components/message/error-message.component";

@Component({
  selector: 'rb-activate-page',
  templateUrl: './activate-page.component.html',
  imports: [
    AuthCardComponent,
    TranslatePipe,
    RouterLink,
    ErrorMessageComponent
  ],
})
export class ActivatePageComponent implements OnInit, OnDestroy {
  private profileService = inject(ProfileService);
  private activatedRoute = inject(ActivatedRoute);

  isLoading = false;
  error = false;
  success = false;

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
          this.isLoading = false;
          this.success = true;
          this.error = false;
        },
        error: () => {
          this.isLoading = false;
          this.success = false;
          this.error = true;
        }
      });
    }
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
