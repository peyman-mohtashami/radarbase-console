import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../base-entities/enums/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AppSource} from '../models/source';
import {ProjectStore} from '../../project/services/project.store';
import {SourceTypeStore} from '../../source-type/services/source-type.store';
import {SourceDialogComponent, SourceForm, StoredSourceDialog} from '../dialogs/source-dialog/source-dialog.component';
import {SourceConfigService} from './source-config.service';

@Injectable({providedIn: 'root'})
export class SourceDialogService {
  private projectStore = inject(ProjectStore);
  private sourceTypeStore = inject(SourceTypeStore);
  private configService = inject(SourceConfigService);
  private dialog = inject(MatDialog);

  async openDialog(mode: DialogMode, entity?: AppSource, restoredModel?: SourceForm) {
    if (mode !== DialogMode.ADD && !entity) return;
    await this.createDialogRef(mode, entity, restoredModel);
  }

  async restorePendingDialog() {
    if (this.dialog.openDialogs.length) return;

    const state = this.configService.getDialogState<StoredSourceDialog>();
    if (!state) return;

    await this.openDialog(state.mode, state.entity, state.model);
  }

  private async createDialogRef(mode: DialogMode, entity?: AppSource, restoredModel?: SourceForm): Promise<MatDialogRef<SourceDialogComponent>> {
    const project = this.projectStore.selected()!;

    if (this.sourceTypeStore.items().length === 0) {
      await this.sourceTypeStore.getAll();
    }
    const sourceTypeFullList = this.sourceTypeStore.items();

    const _data = {id: 'source-dialog', mode, entity, sourceTypeFullList, project, restoredModel};

    switch (mode) {
      case DialogMode.DELETE:
        return this.dialog.open(SourceDialogComponent, {
          data: _data,
          width: '50%',
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
      default:
        return this.dialog.open(SourceDialogComponent, {
          id: 'source-dialog',
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
