import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../shared/enums/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AppUser} from "../../user/models/user";
import {PermissionConfigService} from './permission-config.service';
import {UserStore} from '../../user/services/user.store';
import {ProjectStore} from '../../project/services/project.store';
import {OrganizationStore} from '../../organization/services/organization.store';
import {
  PermissionDialogComponent,
  PermissionForm,
  StoredPermissionDialog
} from '../dialogs/permission-dialog/permission-dialog.component';
import {PermissionStore} from './permission.store';

@Injectable({providedIn: 'root'})
export class PermissionDialogService {
  private userStore = inject(UserStore);
  private projectStore = inject(ProjectStore);
  private organizationStore = inject(OrganizationStore);
  private configService = inject(PermissionConfigService);
  private dialog = inject(MatDialog);

  async openDialog(mode: DialogMode, entity?: AppUser, restoredModel?: PermissionForm) {
    if (mode !== DialogMode.ADD && !entity) return;
    await this.createDialogRef(mode, entity, restoredModel);
  }

  async restorePendingDialog() {
    if (this.dialog.openDialogs.length) return;

    const state = this.configService.getDialogState<StoredPermissionDialog>();
    if (!state) return;

    await this.openDialog(state.mode, state.entity, state.model);
  }

  private async createDialogRef(mode: DialogMode, entity?: AppUser, restoredModel?: PermissionForm): Promise<MatDialogRef<PermissionDialogComponent>> {
    if (!this.userStore.allItems().length) {
      await this.userStore.getAll();
    }
    const userFullList = this.userStore.allItems();

    const project = this.projectStore.selected();
    const organization = this.organizationStore.selected();

    const _data = {id: 'permission-dialog', mode, entity, project, organization, userFullList, restoredModel};

    switch (mode) {
      case DialogMode.DELETE:
        return this.dialog.open(PermissionDialogComponent, {
          data: _data,
          width: '50%',
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
      default:
        return this.dialog.open(PermissionDialogComponent, {
          id: 'permission-dialog',
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
