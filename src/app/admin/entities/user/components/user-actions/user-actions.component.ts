import {Component, inject, input} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {DialogMode} from '../../../../shared/enums/dialog';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {TranslatePipe} from '@ngx-translate/core';
import {AppUser, UserDialogMode} from '../../models/user';
import {MatTooltip} from "@angular/material/tooltip";
import {UserConfigService} from '../../services/user-config.service';
import {MatIcon} from '@angular/material/icon';
import {UserDialogService} from '../../services/user-dialog.service';

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

  protected readonly DialogMode = DialogMode;

  private configService = inject(UserConfigService);
  private dialogService = inject(UserDialogService);

  entity = input.required<AppUser>();
  isExpanded = input<boolean>(true);

  entityName = this.configService.getEntityMetadata().name;

  async onAction(mode: UserDialogMode) {
    await this.dialogService.openDialog(mode, this.entity());
  }

  protected readonly UserDialogMode = UserDialogMode;
}
