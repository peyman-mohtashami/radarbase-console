import {Component, inject, input} from '@angular/core';
import {AppUser, UserDialogMode} from "../../models/user";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from '@angular/material/icon';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UserActivateDialogComponent} from '../../dialogs/user-activate-dialog/user-activate-dialog.component';
import {TranslatePipe} from '@ngx-translate/core';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-user-activate',
  templateUrl: './user-activate.component.html',
  imports: [
    MatIconButton,
    MatIcon,
    TranslatePipe,
    MatTooltip,
  ],
  host: {
    style: 'display: contents;'
  }
})
export class UserActivateComponent {
  private dialog = inject(MatDialog);

  entity = input.required<AppUser>();

  async onAction() {
    await this.createDialogRef(UserDialogMode.ACTIVATE, this.entity());
  }

  private async createDialogRef(mode: UserDialogMode, entity?: AppUser): Promise<MatDialogRef<UserActivateDialogComponent>> {
    return this.dialog.open(UserActivateDialogComponent, {
      data: {id: 'user-activate-dialog', mode, entity},
      width: '50%',
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      restoreFocus: false
    });
  }
}
