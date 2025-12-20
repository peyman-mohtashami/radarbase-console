import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../enums/dialog';
import {MatDialogRef} from '@angular/material/dialog';
import {AppProject} from '../../project/models/project';
import {AppOrganization} from '../../organization/models/organization';
import {PermissionDialogComponent} from '../containers/permission-dialog/permission-dialog.component';
import {AppUser} from "../../user/models/user";
import {UserService} from "../../user/services/user.service";
import {BaseDialogService} from '../../../services/base-dialog.service';
import {PermissionConfigService} from './permission-config.service';

@Injectable({providedIn: 'root'})
export class PermissionDialogService extends BaseDialogService<AppUser, PermissionDialogComponent> {
  override entityService = inject(UserService);
  override configService = inject(PermissionConfigService);

  override createDialogRef(
    mode: DialogMode,
    data: {
      entity: AppUser | undefined;
      entities: AppUser[];
      project?: AppProject;
      organization?: AppOrganization;
      users: AppUser[];
    }
  ): MatDialogRef<PermissionDialogComponent> {
    const {entity, entities, project, organization, users} = data;
    switch (mode) {
      case DialogMode.DELETE:
        return this.dialog.open(PermissionDialogComponent, {
          data: {mode, entity, entities, project, organization, users},
          width: '50%',
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
      default:
        return this.dialog.open(PermissionDialogComponent, {
          data: {mode, entity, entities, project, organization, users},
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
