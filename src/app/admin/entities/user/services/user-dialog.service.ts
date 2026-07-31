import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../base-entities/enums/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AppUser, UserDialogMode} from '../models/user';
import {StoredUserDialog, UserDialogComponent, UserForm} from '../dialogs/user-dialog/user-dialog.component';
import {UserActivateDialogComponent} from '../dialogs/user-activate-dialog/user-activate-dialog.component';
import {UserConfigService} from './user-config.service';
import {OrganizationStore} from '../../organization/services/organization.store';
import {ProjectStore} from '../../project/services/project.store';
import {UserStore} from './user.store';

@Injectable({providedIn: 'root'})
export class UserDialogService {
  private store = inject(UserStore);
  private projectStore = inject(ProjectStore);
  private organizationStore = inject(OrganizationStore);
  private configService = inject(UserConfigService);
  private dialog = inject(MatDialog);

  async openDialog(mode: UserDialogMode, entity?: AppUser, restoredModel?: UserForm) {
    if (mode !== UserDialogMode.ADD && !entity) return;
    await this.createDialogRef(mode, entity, restoredModel);
  }

  async restorePendingDialog() {
    if (this.dialog.openDialogs.length) return;

    const state = this.configService.getDialogState<StoredUserDialog>();
    if (!state) return;

    await this.openDialog(state.mode, state.entity, state.model);
  }

  private async createDialogRef(mode: UserDialogMode, entity?: AppUser, restoredModel?: UserForm): Promise<MatDialogRef<UserDialogComponent | UserActivateDialogComponent>> {
    await this.store.getAll();
    const userFullList = this.store.items();

    if (!this.projectStore.allItems().length) {
      await this.projectStore.getAll();
    }
    const projectFullList = this.projectStore.items();

    if (!this.organizationStore.allItems().length) {
      await this.organizationStore.getAll();
    }
    const organizationFullList = this.organizationStore.items();

    const _data = {id: 'user-dialog', mode, entity, userFullList, projectFullList, organizationFullList, restoredModel};

    switch (mode) {
      case UserDialogMode.ACTIVATE:
        return this.dialog.open(UserActivateDialogComponent, {
          data: _data,
          width: '50%',
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
      case UserDialogMode.DELETE:
        return this.dialog.open(UserDialogComponent, {
          data: _data,
          width: '50%',
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
      default:
        return this.dialog.open(UserDialogComponent, {
          id: 'user-dialog',
          data: _data,
          panelClass: 'tailwind-slide-panel',
          width: '50%',
          height: '100vh',
          position: {right: '0'},
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
    }
  }
}
