import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../base-entities/enums/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AppClient} from '../models/client';
import {ClientDialogComponent, ClientForm, StoredClientDialog} from '../dialogs/client-dialog/client-dialog.component';
import {ClientStore} from './client.store';
import {ClientConfigService} from './client-config.service';

@Injectable({providedIn: 'root'})
export class ClientDialogService {
  private store = inject(ClientStore);
  private dialog = inject(MatDialog);
  private configService = inject(ClientConfigService);

  async openDialog(mode: DialogMode, entity?: AppClient, restoredModel?: ClientForm) {
    if (mode !== DialogMode.ADD && !entity) return;
    await this.createDialogRef(mode, entity, restoredModel);
  }

  async restorePendingDialog() {
    if (this.dialog.openDialogs.length) return;

    const state = this.configService.getDialogState<StoredClientDialog>();
    if (!state) return;

    await this.openDialog(state.mode, state.entity, state.model);
  }

  private async createDialogRef(mode: DialogMode, entity?: AppClient, restoredModel?: ClientForm): Promise<MatDialogRef<ClientDialogComponent>> {
    if (!this.store.allItems().length) {
      await this.store.getAll();
    }
    const clientFullList = this.store.allItems();

    const _data = {id: 'client-dialog', mode, entity, clientFullList, restoredModel};

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
