import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../base-entities/enums/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AppGroup} from '../models/group';
import {GroupDialogComponent} from '../dialogs/group-dialog/group-dialog.component';
import {ProjectStore} from '../../project/services/project.store';
import {GroupStore} from './group.store';

@Injectable({providedIn: 'root'})
export class GroupDialogService {
  private projectStore = inject(ProjectStore);
  private groupStore = inject(GroupStore);
  private dialog = inject(MatDialog);

  async openDialog(mode: DialogMode, entity?: AppGroup) {
    if (mode !== DialogMode.ADD && !entity) return;
    await this.createDialogRef(mode, entity);
  }

  private async createDialogRef(mode: DialogMode, entity?: AppGroup): Promise<MatDialogRef<GroupDialogComponent>> {
    const project = this.projectStore.selected()!;
    const groupFullList = this.groupStore.items();

    const _data = {id: 'group-dialog', mode, entity, groupFullList};
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
