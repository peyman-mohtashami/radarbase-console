import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../enums/dialog';
import {MatDialogRef} from '@angular/material/dialog';
import {AppSource} from '../models/source';
import {SourceService} from './source.service';
import {SourceDialogComponent} from '../containers/source-dialog/source-dialog.component';
import {AppSourceType} from '../../source-type/models/source-type';
import {BaseDialogService} from '../../../services/base-dialog.service';
import {SourceConfigService} from './source-config.service';

@Injectable({providedIn: 'root'})
export class SourceDialogService extends BaseDialogService<AppSource, SourceDialogComponent> {
  override entityService = inject(SourceService);
  override configService = inject(SourceConfigService);

  override createDialogRef(mode: DialogMode, data: {entity: AppSource | undefined, sourceTypes: AppSourceType[]}): MatDialogRef<SourceDialogComponent> {

    const {entity, sourceTypes} = data;
    switch (mode) {
      case DialogMode.DELETE:
        return this.dialog.open(SourceDialogComponent, {
          data: {mode, entity, sourceTypes},
          width: '50%',
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
      default:
        return this.dialog.open(SourceDialogComponent, {
          data: {mode, entity, sourceTypes},
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
