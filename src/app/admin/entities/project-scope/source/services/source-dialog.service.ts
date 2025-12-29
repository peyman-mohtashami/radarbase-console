import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../../base-entities/enums/dialog';
import {MatDialogRef} from '@angular/material/dialog';
import {AppSource, RadarSource} from '../models/source';
import {SourceService} from './source.service';
import {SourceDialogComponent} from '../containers/source-dialog/source-dialog.component';
import {BaseDialogService} from '../../../../base-entities/services/base-dialog.service';
import {SourceConfigService} from './source-config.service';
import {SourceTypeService} from '../../../main-scope/source-type/services/source-type.service';

@Injectable({providedIn: 'root'})
export class SourceDialogService extends BaseDialogService<AppSource, RadarSource, SourceDialogComponent> {
  override entityService = inject(SourceService);
  override configService = inject(SourceConfigService);

  sourceTypeService = inject(SourceTypeService);

  override createDialogRef(mode: DialogMode, entity?: AppSource): MatDialogRef<SourceDialogComponent> {
    const project = this.selectedEntitiesService.selectedProject();
    const sourceTypeFullList = this.sourceTypeService.getWithQuery();

    const _data = {mode, entity, sourceTypeFullList, project};

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
