import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../base-entities/enums/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AppSourceData} from '../models/source-data';
import {SourceTypeStore} from '../../source-type/services/source-type.store';
import {SourceDataDialogComponent} from '../dialogs/source-data-dialog/source-data-dialog.component';

@Injectable({providedIn: 'root'})
export class SourceDataDialogService {
  private sourceTypeStore = inject(SourceTypeStore);
  private dialog = inject(MatDialog);

  async openDialog(mode: DialogMode, entity?: AppSourceData) {
    if (mode !== DialogMode.ADD && !entity) return;
    await this.createDialogRef(mode, entity);
  }

  private async createDialogRef(mode: DialogMode, entity?: AppSourceData): Promise<MatDialogRef<SourceDataDialogComponent>> {
    const sourceTypeFullList = this.sourceTypeStore.items();

    const _data = {id: 'source-data-dialog', mode, entity, sourceTypeFullList};

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
