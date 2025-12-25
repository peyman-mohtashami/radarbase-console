import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../base-entities/enums/dialog';
import {MatDialogRef} from '@angular/material/dialog';
import {SourceDataService} from './source-data.service';
import {SourceDataDialogComponent} from '../containers/source-data-dialog/source-data-dialog.component';
import {AppSourceData, RadarSourceData} from '../models/source-data';
import {BaseDialogService} from '../../../base-entities/services/base-dialog.service';
import {SourceDataConfigService} from './source-data-config.service';
import {SourceTypeService} from '../../source-type/services/source-type.service';

@Injectable({providedIn: 'root'})
export class SourceDataDialogService extends BaseDialogService<AppSourceData, RadarSourceData, SourceDataDialogComponent> {
  override entityService = inject(SourceDataService);
  override configService = inject(SourceDataConfigService);

  sourceTypeService = inject(SourceTypeService);

  override createDialogRef(mode: DialogMode, entity?: AppSourceData): MatDialogRef<SourceDataDialogComponent> {
    const sourceTypeFullList = this.sourceTypeService.getWithQuery();
    const _data = {mode, entity, sourceTypeFullList};

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
