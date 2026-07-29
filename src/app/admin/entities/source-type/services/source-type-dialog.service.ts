import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../base-entities/enums/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AppSourceType} from '../models/source-type';
import {SourceTypeDialogComponent} from '../dialogs/source-type-dialog/source-type-dialog.component';
import {SourceTypeStore} from './source-type.store';

@Injectable({providedIn: 'root'})
export class SourceTypeDialogService {
  private store = inject(SourceTypeStore);
  private dialog = inject(MatDialog);

  async openDialog(mode: DialogMode, entity?: AppSourceType) {
    if (mode !== DialogMode.ADD && !entity) return;
    await this.createDialogRef(mode, entity);
  }

  private async createDialogRef(mode: DialogMode, entity?: AppSourceType): Promise<MatDialogRef<SourceTypeDialogComponent>> {
    const storedEntityString = null; //this.configService.getLatestFormEntry();
    const storedEntity = storedEntityString ? (JSON.parse(storedEntityString) as AppSourceType) : undefined;

    if (this.store.items()) {
      await this.store.getWithQuery();
    }
    const sourceTypeFullList = this.store.items();

    const _data = {id: 'source-type-dialog', mode, entity: storedEntity ?? entity, sourceTypeFullList};

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
