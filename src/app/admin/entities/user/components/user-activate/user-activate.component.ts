import {Component, inject, input} from '@angular/core';
import {AppUser, UserDialogMode} from "../../models/user";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from '@angular/material/icon';
// import {UserDialogService} from '../../services/user-dialog.service';
// import {UserDialogComponent, UserForm} from '../../dialogs/user-dialog/user-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UserActivateDialogComponent} from '../../dialogs/user-activate-dialog/user-activate-dialog.component';

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
  private dialog = inject(MatDialog);

  entity = input.required<AppUser>();

  async onAction() {
    await this.createDialogRef(UserDialogMode.ACTIVATE, this.entity());
    // await this.dialogService.openDialog(UserDialogMode.ACTIVATE, this.entity());
  }

  private async createDialogRef(mode: UserDialogMode, entity?: AppUser): Promise<MatDialogRef<UserActivateDialogComponent>> {
    // await this.store.getAll();
    // const userFullList = this.store.items();
    //
    // if (!this.projectStore.allItems().length) {
    //   await this.projectStore.getAll();
    // }
    // const projectFullList = this.projectStore.items();
    //
    // if (!this.organizationStore.allItems().length) {
    //   await this.organizationStore.getAll();
    // }
    // const organizationFullList = this.organizationStore.items();
    //
    const _data = {id: 'user-dialog', mode, entity};

    return this.dialog.open(UserActivateDialogComponent, {
      data: _data,
      width: '50%',
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      restoreFocus: false
    });
  }
}
