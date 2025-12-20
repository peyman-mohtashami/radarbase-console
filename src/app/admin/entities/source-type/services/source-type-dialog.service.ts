import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../enums/dialog';
import {MatDialogRef} from '@angular/material/dialog';
import {AppSourceType} from '../models/source-type';
import {SourceTypeDialogComponent} from '../containers/source-type-dialog/source-type-dialog.component';
import {SourceTypeService} from './source-type.service';
import {BaseDialogService} from '../../../services/base-dialog.service';
import {SourceTypeConfigService} from './source-type-config.service';

@Injectable({providedIn: 'root'})
export class SourceTypeDialogService extends BaseDialogService<AppSourceType, SourceTypeDialogComponent>{
  override entityService = inject(SourceTypeService);
  override configService = inject(SourceTypeConfigService);

  override createDialogRef(mode: DialogMode, data: {entity?: AppSourceType}): MatDialogRef<SourceTypeDialogComponent> {
    const {entity} = data;
    switch (mode) {
      case DialogMode.DELETE:
        return this.dialog.open(SourceTypeDialogComponent, {
          data: {mode, entity},
          width: '50%',
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
      default:
        return this.dialog.open(SourceTypeDialogComponent, {
          data: {mode, entity},
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
