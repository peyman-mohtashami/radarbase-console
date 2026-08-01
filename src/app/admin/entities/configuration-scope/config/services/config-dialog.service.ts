import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../../base-entities/enums/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AppConfig} from '../models/config';
import {ConfigDialogComponent, ConfigForm, StoredConfigDialog} from '../dialogs/config-dialog/config-dialog.component';
import {ConfigPublishDialogComponent} from '../dialogs/config-publish-dialog/config-publish-dialog.component';
import {ConfigConfigService} from './config-config.service';
import {ConfigStore} from './config.store';

@Injectable({providedIn: 'root'})
export class ConfigDialogService {
  private store = inject(ConfigStore);
  private dialog = inject(MatDialog);
  private configService = inject(ConfigConfigService);

  async openDialog(mode: DialogMode, entity?: AppConfig, restoredModel?: ConfigForm) {
    if (mode !== DialogMode.ADD && !entity) return;
    await this.createDialogRef(mode, entity, restoredModel);
  }

  async openPublishDialog(mode: "publish" | "discard") {
    await this.createPublishDialogRef(mode);
  }

  async restorePendingDialog() {
    if (this.dialog.openDialogs.length) return;

    const state = this.configService.getDialogState<StoredConfigDialog>();
    if (!state) return;

    await this.openDialog(state.mode, state.entity, state.model);
  }

  private async createDialogRef(mode: DialogMode, entity?: AppConfig, restoredModel?: ConfigForm): Promise<MatDialogRef<ConfigDialogComponent>> {
    const _data = {id: 'config-dialog', mode, entity, restoredModel};

    return this.dialog.open(ConfigDialogComponent, {
      id: 'config-dialog',
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

  private async createPublishDialogRef(mode: "publish" | "discard"): Promise<MatDialogRef<ConfigPublishDialogComponent>> {
    const _data = {id: 'publish-dialog', mode, configs: this.store.allItems(), differences: this.store.differences()};
    return this.dialog.open(ConfigPublishDialogComponent, {
      id: 'publish-dialog',
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

