import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../shared/enums/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AppSourceType} from '../models/source-type';
import {
  SourceTypeDialogComponent,
  SourceTypeForm,
  StoredSourceTypeDialog
} from '../dialogs/source-type-dialog/source-type-dialog.component';
import {SourceTypeStore} from './source-type.store';
import {SourceTypeConfigService} from './source-type-config.service';

@Injectable({providedIn: 'root'})
export class SourceTypeDialogService {
  private store = inject(SourceTypeStore);
  private dialog = inject(MatDialog);
  private configService = inject(SourceTypeConfigService);

  async openDialog(mode: DialogMode, entity?: AppSourceType, restoredModel?: SourceTypeForm) {
    if (mode !== DialogMode.ADD && !entity) return;
    await this.createDialogRef(mode, entity, restoredModel);
  }

  async restorePendingDialog() {
    if (this.dialog.openDialogs.length) return;

    const state = this.configService.getDialogState<StoredSourceTypeDialog>();
    if (!state) return;

    await this.openDialog(state.mode, state.entity, state.model);
  }

  private async createDialogRef(mode: DialogMode, entity?: AppSourceType, restoredModel?: SourceTypeForm): Promise<MatDialogRef<SourceTypeDialogComponent>> {
    if (!this.store.allItems().length) {
      await this.store.getAll();
    }
    const sourceTypeFullList = this.store.allItems();

    const _data = {id: 'source-type-dialog', mode, entity: entity, sourceTypeFullList, restoredModel};

    switch (mode) {
      case DialogMode.DELETE:
        return this.dialog.open(SourceTypeDialogComponent, {
          data: _data,
          width: '50%',
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
      default:
        return this.dialog.open(SourceTypeDialogComponent, {
          id: 'source-type-dialog',
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
