import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../enums/dialog';
import {MatDialogRef} from '@angular/material/dialog';
import {AppClient} from '../models/client';
import {ClientService} from './client.service';
import {ClientDialogComponent} from '../containers/client-dialog/client-dialog.component';
import {BaseDialogService} from '../../../services/base-dialog.service';
import {ClientConfigService} from './client-config.service';

@Injectable({providedIn: 'root'})
export class ClientDialogService extends BaseDialogService<AppClient, ClientDialogComponent>{
  override entityService = inject(ClientService);
  override configService = inject(ClientConfigService);

  override createDialogRef(mode: DialogMode, entity?: AppClient): MatDialogRef<ClientDialogComponent> {
    const clientFullList = this.entityService.getWithQuery();
    const _data = {mode, entity, clientFullList};

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
