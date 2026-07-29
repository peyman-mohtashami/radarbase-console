import {Component, effect, inject, signal, ChangeDetectionStrategy} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {UserConfigService} from '../../services/user-config.service';
import {UserDetailsComponent} from '../../components/user-details/user-details.component';
import {ActivatedRoute} from '@angular/router';
import {AppUser} from '../../models/user';
import {DialogMode} from '../../../../base-entities/enums/dialog';
import {UserDialogService} from '../../services/user-dialog.service';
import {UserStore} from '../../services/user.store';

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
  protected store = inject(UserStore);
}
