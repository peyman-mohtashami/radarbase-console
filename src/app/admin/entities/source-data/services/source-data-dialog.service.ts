import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../shared/enums/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AppSourceData} from '../models/source-data';
import {SourceTypeStore} from '../../source-type/services/source-type.store';
import {
  SourceDataDialogComponent,
  SourceDataForm,
  StoredSourceDataDialog
} from '../dialogs/source-data-dialog/source-data-dialog.component';
import {SourceDataConfigService} from './source-data-config.service';

@Injectable({providedIn: 'root'})
export class SourceDataDialogService {
  private sourceTypeStore = inject(SourceTypeStore);
  private dialog = inject(MatDialog);
  private configService = inject(SourceDataConfigService);

  async openDialog(mode: DialogMode, entity?: AppSourceData, restoredModel?: SourceDataForm) {
    if (mode !== DialogMode.ADD && !entity) return;
    await this.createDialogRef(mode, entity, restoredModel);
  }

  async restorePendingDialog() {
    if (this.dialog.openDialogs.length) return;

    const state = this.configService.getDialogState<StoredSourceDataDialog>();
    if (!state) return;

    await this.openDialog(state.mode, state.entity, state.model);
  }

  private async createDialogRef(mode: DialogMode, entity?: AppSourceData, restoredModel?: SourceDataForm): Promise<MatDialogRef<SourceDataDialogComponent>> {
    if (!this.sourceTypeStore.allItems().length) {
      await this.sourceTypeStore.getAll();
    }
    const sourceTypeFullList = this.sourceTypeStore.allItems();

    const _data = {id: 'source-data-dialog', mode, entity, sourceTypeFullList, restoredModel};

    switch (mode) {
      case DialogMode.DELETE:
        return this.dialog.open(SourceDataDialogComponent, {
          data: _data,
          width: '50%',
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
      default:
        return this.dialog.open(SourceDataDialogComponent, {
          id: 'source-data-dialog',
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
