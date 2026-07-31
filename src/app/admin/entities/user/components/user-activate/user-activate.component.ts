import {Component, inject, input} from '@angular/core';
import {AppUser, UserDialogMode} from "../../models/user";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from '@angular/material/icon';
// import {UserDialogService} from '../../services/user-dialog.service';

@Component({
  selector: 'app-user-activate',
  templateUrl: './user-activate.component.html',
  imports: [
    MatIconButton,
    MatIcon,
  ]
})
export class UserActivateComponent {
  // private dialogService = inject(UserDialogService);

  entity = input.required<AppUser>();

  async onAction() {
    // await this.dialogService.openDialog(UserDialogMode.ACTIVATE, this.entity());
  }
}
