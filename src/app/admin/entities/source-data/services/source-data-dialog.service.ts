import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../enums/dialog';
import {MatDialogRef} from '@angular/material/dialog';
import {SourceDataService} from './source-data.service';
import {SourceDataDialogComponent} from '../containers/source-data-dialog/source-data-dialog.component';
import {AppSourceData} from '../models/source-data';
import {AppSourceType} from '../../source-type/models/source-type';
import {BaseDialogService} from '../../../services/base-dialog.service';

@Injectable({providedIn: 'root'})
export class SourceDataDialogService extends BaseDialogService<AppSourceData, SourceDataDialogComponent> {
  override entityService = inject(SourceDataService);

  override createDialogRef(mode: DialogMode, data: {entity: AppSourceData | undefined, sourceTypes: AppSourceType[]}): MatDialogRef<SourceDataDialogComponent> {
    const {entity , sourceTypes} = data;
    switch (mode) {
      case DialogMode.DELETE:
        return this.dialog.open(SourceDataDialogComponent, {
          data: {mode, entity, sourceTypes},
          width: '50%',
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
      default:
        return this.dialog.open(SourceDataDialogComponent, {
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
