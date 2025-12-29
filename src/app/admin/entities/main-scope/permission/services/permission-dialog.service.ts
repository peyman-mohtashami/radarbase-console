import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../../base-entities/enums/dialog';
import {MatDialogRef} from '@angular/material/dialog';
import {PermissionDialogComponent} from '../containers/permission-dialog/permission-dialog.component';
import {AppUser, RadarUser} from "../../user/models/user";
import {UserService} from "../../user/services/user.service";
import {BaseDialogService} from '../../../../base-entities/services/base-dialog.service';
import {PermissionConfigService} from './permission-config.service';

@Injectable({providedIn: 'root'})
export class PermissionDialogService extends BaseDialogService<AppUser, RadarUser, PermissionDialogComponent> {
  override entityService = inject(UserService);
  override configService = inject(PermissionConfigService);

  override createDialogRef(mode: DialogMode, entity?: AppUser): MatDialogRef<PermissionDialogComponent> {
    const userFullList = this.entityService.getWithQuery();
    const project = this.selectedEntitiesService.selectedProject();
    const organization = this.selectedEntitiesService.selectedOrganization();

    const _data = {mode, entity, project, organization, userFullList};

    switch (mode) {
      case DialogMode.DELETE:
        return this.dialog.open(PermissionDialogComponent, {
          data: _data,
          width: '50%',
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
      default:
        return this.dialog.open(PermissionDialogComponent, {
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
