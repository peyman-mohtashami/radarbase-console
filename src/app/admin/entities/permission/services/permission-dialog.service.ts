import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../base-entities/enums/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AppUser, UserDto} from "../../user/models/user";
import {UserService} from "../../user/services/user.service";
import {BaseDialogService} from '../../../base-entities/services/base-dialog.service';
import {PermissionConfigService} from './permission-config.service';
import {UserStore} from '../../user/services/user.store';
import {ProjectStore} from '../../project/services/project.store';
import {ClientStore} from '../../client/services/client.store';
import {OrganizationStore} from '../../organization/services/organization.store';
import {SourceTypeStore} from '../../source-type/services/source-type.store';
import {ActivatedRoute} from '@angular/router';
import {PermissionDialogComponent} from '../dialogs/permission-dialog/permission-dialog.component';
import {GroupStore} from '../../project-group/services/group.store';
import {SourceStore} from '../../project-source/services/source.store';
import {SubjectConfigService} from '../../project-subject/services/subject-config.service';

@Injectable({providedIn: 'root'})
export class PermissionDialogService {
  private userStore = inject(UserStore);
  private projectStore = inject(ProjectStore);
  private groupStore = inject(GroupStore);
  private sourceStore = inject(SourceStore);
  private clientStore = inject(ClientStore);
  private organizationStore = inject(OrganizationStore);
  private sourceTypeStore = inject(SourceTypeStore);
  private configService = inject(SubjectConfigService);
  private dialog = inject(MatDialog);
  private activatedRoute = inject(ActivatedRoute);

  // projectService = inject(ProjectService);
  // organizationService = inject(OrganizationStore);

  async openDialog(mode: DialogMode, entity?: AppUser) {
    if (mode !== DialogMode.ADD && !entity) return;
    await this.createDialogRef(mode, entity);
  }

  private async createDialogRef(mode: DialogMode, entity?: AppUser): Promise<MatDialogRef<PermissionDialogComponent>> {
    const userFullList = this.userStore.items();
    const project = this.projectStore.selected();
    const organization = this.organizationStore.selected();

    const _data = {id: 'permission-dialog', mode, entity, project, organization, userFullList};

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
          id: 'permission-dialog',
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
