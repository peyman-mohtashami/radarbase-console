import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import { AppUser } from "../../models/user";
import {TranslatePipe} from "@ngx-translate/core";
import {UserDetailsComponent} from "../../components/user-details/user-details.component";
import {UserConfigService} from '../../services/user-config.service';
import {UserDialogService} from '../../services/user-dialog.service';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatPrefix} from '@angular/material/input';
import {BaseEntityPageComponent} from '../../../../components/entity-page/base-entity-page.component';
import {UserActionsComponent} from '../../components/user-actions/user-actions.component';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  imports: [
    TranslatePipe,
    UserDetailsComponent,
    MatPrefix,
    MatCard,
    MatCardContent,
    MatPrefix,
    UserActionsComponent,
  ]
})
export class UserPageComponent extends BaseEntityPageComponent<AppUser> implements OnInit, OnDestroy {
  override configService = inject(UserConfigService);
  override dialogService = inject(UserDialogService);

  override entity = signal<AppUser>(this.activatedRoute.snapshot.data['user']);

  deleteDisabled = false;

  ngOnInit(): void {
    super.init();

    //TODO not relevant to users
    if (this.entity().roles && this.entity().roles!.length > 0) {
      if (this.entity().roles?.[0]?.authorityName === 'ROLE_PARTICIPANT') {
        this.deleteDisabled = true;
      }
      if (this.entity().roles?.[0]?.authorityName === 'ROLE_INACTIVE_PARTICIPANT') {
        this.deleteDisabled = true;
      }
    }
  }

  ngOnDestroy() {
    super.destroy();
  }

  override navigateOnUpdateSuccess(entity: AppUser) {
    this.router.navigate(['/admin', 'users', entity.login]).then();
  }

  override navigateOnDeleteSuccess() {
    this.router.navigate(['/admin', 'users']).then();
  }

  override getDialogData(entity?: AppUser) {
    return {
      entity,
    }
  }
}
