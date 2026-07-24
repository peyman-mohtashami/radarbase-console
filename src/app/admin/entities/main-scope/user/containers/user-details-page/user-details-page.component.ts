import {Component, effect, inject, signal, ChangeDetectionStrategy} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {UserConfigService} from '../../services/user-config.service';
import {UserDetailsComponent} from '../../components/user-details/user-details.component';
import {ActivatedRoute} from '@angular/router';
import {AppUser} from '../../models/user';
import {DialogMode} from '../../../../../base-entities/enums/dialog';
import {UserDialogService} from '../../services/user-dialog.service';

@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details-page.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatCard,
    MatCardContent,
    UserDetailsComponent,
  ]
})
export class UserDetailsPageComponent {
  private activatedRoute = inject(ActivatedRoute);
  private configService = inject(UserConfigService);
  private dialogService = inject(UserDialogService);

  entity = signal<AppUser>(this.activatedRoute.snapshot.parent!.data['user']!);

  tableFields = this.configService.getTableFields();

  constructor() {
    effect(() => {
      const updated = this.dialogService.dialogUpdateEvent();
      if (updated) {
        switch (updated.mode) {
          case DialogMode.EDIT:
            if (updated.entity) {
              this.entity.set(updated.entity);
            }
            break;
        }
      }
    });
  }
}
