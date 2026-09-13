import {Component, inject, input} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {TranslatePipe} from '@ngx-translate/core';
import {AppUser, UserDialogMode} from '../../models/user';
import {MatTooltip} from "@angular/material/tooltip";
import {MatIcon} from '@angular/material/icon';
import {UserDialogService} from '../../services/user-dialog.service';
import {AuthService} from '../../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-user-actions',
  imports: [
    MatIconButton,
    MatMenu,
    MatMenuItem,
    TranslatePipe,
    MatMenuTrigger,
    MatTooltip,
    MatIcon,
  ],
  templateUrl: './user-actions.component.html',
})
export class UserActionsComponent {

  protected readonly authService = inject(AuthService);
  private readonly dialogService = inject(UserDialogService);

  protected readonly UserDialogMode = UserDialogMode;

  readonly entity = input.required<AppUser>();
  readonly isExpanded = input<boolean>(true);

  async onAction(mode: UserDialogMode) {
    await this.dialogService.openDialog(mode, this.entity());
  }

}
