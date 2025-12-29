import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../../base-entities/enums/dialog';
import {MatDialogRef} from '@angular/material/dialog';
import {AppSourceType, RadarSourceType} from '../models/source-type';
import {SourceTypeDialogComponent} from '../containers/source-type-dialog/source-type-dialog.component';
import {SourceTypeService} from './source-type.service';
import {BaseDialogService} from '../../../../base-entities/services/base-dialog.service';
import {SourceTypeConfigService} from './source-type-config.service';

@Injectable({providedIn: 'root'})
export class SourceTypeDialogService extends BaseDialogService<AppSourceType, RadarSourceType, SourceTypeDialogComponent>{
  override entityService = inject(SourceTypeService);
  override configService = inject(SourceTypeConfigService);

  override createDialogRef(mode: DialogMode, entity?: AppSourceType): MatDialogRef<SourceTypeDialogComponent> {
    const sourceTypeFullList = this.entityService.getWithQuery();
    const _data = {mode, entity, sourceTypeFullList};

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
