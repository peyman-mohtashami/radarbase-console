import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../../base-entities/enums/dialog';
import {MatDialogRef} from '@angular/material/dialog';
import {AppGroup, RadarGroup} from '../models/group';
import {GroupService} from './group.service';
import {GroupDialogComponent} from '../containers/group-dialog/group-dialog.component';
import {BaseDialogService} from '../../../../base-entities/services/base-dialog.service';
import {GroupConfigService} from './group-config.service';

@Injectable({providedIn: 'root'})
export class GroupDialogService extends BaseDialogService<AppGroup, RadarGroup, GroupDialogComponent>{
  override entityService = inject(GroupService);
  override configService = inject(GroupConfigService);

  override createDialogRef(mode: DialogMode, entity?: AppGroup): MatDialogRef<GroupDialogComponent> {
    // const project = this.selectedEntitiesService.getSelected().project();
    const projectId = this.activatedRoute.snapshot.paramMap.get('projectId');
    // const groupFullList = this.entityService.getWithQuery(undefined, projectId ?? project?._name);
    const groupFullList = this.entityService.getWithQuery(undefined, projectId ?? undefined);
    const _data = {id: 'group-dialog', mode, entity, groupFullList};
    switch (mode) {
      case DialogMode.DELETE:
        return this.dialog.open(GroupDialogComponent, {
          data: _data,
          width: '50%',
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
      default:
        return this.dialog.open(GroupDialogComponent, {
          id: 'group-dialog',
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
