import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../enums/dialog';
import {MatDialogRef} from '@angular/material/dialog';
import {AppGroup} from '../models/group';
import {GroupService} from './group.service';
import {GroupDialogComponent} from '../containers/group-dialog/group-dialog.component';
import {BaseDialogService} from '../../../services/base-dialog.service';
import {GroupConfigService} from './group-config.service';

@Injectable({providedIn: 'root'})
export class GroupDialogService extends BaseDialogService<AppGroup, GroupDialogComponent>{
  override entityService = inject(GroupService);
  override configService = inject(GroupConfigService);

  override createDialogRef(mode: DialogMode, data: {entity: AppGroup | undefined, entities: AppGroup[]}): MatDialogRef<GroupDialogComponent> {
    const {entity, entities} = data;
    switch (mode) {
      case DialogMode.DELETE:
        return this.dialog.open(GroupDialogComponent, {
          data: {mode, entity, entities},
          width: '50%',
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
      default:
        return this.dialog.open(GroupDialogComponent, {
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
