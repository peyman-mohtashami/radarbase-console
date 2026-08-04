import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../shared/enums/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AppGroup} from '../models/group';
import {GroupDialogComponent, GroupForm, StoredGroupDialog} from '../dialogs/group-dialog/group-dialog.component';
import {GroupStore} from './group.store';
import {GroupConfigService} from './group-config.service';

@Injectable({providedIn: 'root'})
export class GroupDialogService {
  private store = inject(GroupStore);
  private dialog = inject(MatDialog);
  private configService = inject(GroupConfigService);

  async openDialog(mode: DialogMode, entity?: AppGroup, restoredModel?: GroupForm) {
    if (mode !== DialogMode.ADD && !entity) return;
    await this.createDialogRef(mode, entity, restoredModel);
  }

  async restorePendingDialog() {
    if (this.dialog.openDialogs.length) return;

    const state = this.configService.getDialogState<StoredGroupDialog>();
    if (!state) return;

    await this.openDialog(state.mode, state.entity, state.model);
  }

  private async createDialogRef(mode: DialogMode, entity?: AppGroup, restoredModel?: GroupForm): Promise<MatDialogRef<GroupDialogComponent>> {
    if (!this.store.items().length) {
      await this.store.getAll();
    }
    const groupFullList = this.store.items();

    const _data = {id: 'group-dialog', mode, entity, groupFullList, restoredModel};
    switch (mode) {
      case DialogMode.DELETE:
        return this.dialog.open(GroupDialogComponent, {
          data: _data,
          width: '50%',
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
      default:
        return this.dialog.open(GroupDialogComponent, {
          id: 'group-dialog',
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
