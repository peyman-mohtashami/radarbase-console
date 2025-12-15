import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../enums/dialog';
import {MatDialogRef} from '@angular/material/dialog';
import {AppClient} from '../models/client';
import {ClientService} from './client.service';
import {ClientDialogComponent} from '../containers/client-dialog/client-dialog.component';
import {BaseDialogService} from '../../../services/base-dialog.service';

@Injectable({providedIn: 'root'})
export class ClientDialogService extends BaseDialogService<AppClient, ClientDialogComponent>{
  override entityService = inject(ClientService);

  override createDialogRef(mode: DialogMode, data: {entity: AppClient | undefined, entities: AppClient[]}): MatDialogRef<ClientDialogComponent> {
    const {entity, entities} = data;
    switch (mode) {
      case DialogMode.DELETE:
        return this.dialog.open(ClientDialogComponent, {
          data: {mode, entity, entities},
          width: '50%',
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
      default:
        return this.dialog.open(ClientDialogComponent, {
          data: {mode, entity, entities},
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
