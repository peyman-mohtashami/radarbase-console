import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../base-entities/enums/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AppClient} from '../models/client';
import {ClientDialogComponent} from '../dialogs/client-dialog/client-dialog.component';
import {ClientStore} from './client.store';

@Injectable({providedIn: 'root'})
export class ClientDialogService {
  private store = inject(ClientStore);
  private dialog = inject(MatDialog);

  async openDialog(mode: DialogMode, entity?: AppClient) {
    if (mode !== DialogMode.ADD && !entity) return;
    await this.createDialogRef(mode, entity);
  }

  private async createDialogRef(mode: DialogMode, entity?: AppClient): Promise<MatDialogRef<ClientDialogComponent>> {
    const storedEntityString = null; //this.configService.getLatestFormEntry();
    const storedEntity = storedEntityString ? (JSON.parse(storedEntityString) as AppClient) : undefined;

    if (this.store.items()) {
      await this.store.getWithQuery();
    }
    const clientFullList = this.store.items();

    const _data = {id: 'client-dialog', mode, entity, clientFullList};

    switch (mode) {
      case DialogMode.DELETE:
        return this.dialog.open(ClientDialogComponent, {
          data: _data,
          width: '50%',
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
      default:
        return this.dialog.open(ClientDialogComponent, {
          id: 'client-dialog',
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
