import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../enums/dialog';
import {MatDialogRef} from '@angular/material/dialog';
import {Observable, of} from 'rxjs';
import {UserService} from './user.service';
import {AppUser} from '../models/user';
import {UserDialogComponent} from '../containers/user-dialog/user-dialog.component';
import {AppProject} from '../../project/models/project';
import {AppOrganization} from '../../organization/models/organization';
import {UserActivateDialogComponent} from '../containers/user-activate-dialog/user-activate-dialog.component';
import {BaseDialogService} from '../../../services/base-dialog.service';
import {UserConfigService} from './user-config.service';
import {ProjectService} from '../../project/services/project.service';
import {OrganizationService} from '../../organization/services/organization.service';

@Injectable({providedIn: 'root'})
export class UserDialogService extends BaseDialogService<AppUser, UserDialogComponent | UserActivateDialogComponent> {
  override entityService = inject(UserService);
  override configService = inject(UserConfigService);

  projectService = inject(ProjectService);
  organizationService = inject(OrganizationService);

  override processDialogAction(actionType: DialogMode | string, entity: AppUser): Observable<AppUser | void> {
    switch (actionType) {
      case DialogMode.ADD:
        return this.entityService.add(entity);
      case DialogMode.EDIT:
        return this.entityService.update(entity);
      case DialogMode.DELETE:
        return this.entityService.delete(entity);
      case 'activate':
        return this.entityService.sendActivationEmail(entity);
      default:
        this.clearFragmentUrl();
        return of();
    }
  }

  override processUrlFragment(fragment: string, data: {entity?: AppUser, entities?: AppUser[]}) {
    const entityMetadata = this.configService.getEntityMetadata()
    const [, action, entityType, entityId] = fragment.split('/');
    if (entityType === entityMetadata.name) {
      const entity = data.entity ?? data.entities?.find(e => e._name == entityId);
      switch (action) {
        case 'add':
          this.openDialog(DialogMode.ADD, {...data, entity});
          break;
        case 'edit':
          if (entity) this.openDialog(DialogMode.EDIT, {...data, entity});
          break;
        case 'delete':
          if (entity) this.openDialog(DialogMode.DELETE, {...data, entity});
          break;
        case 'activate':
          if (entity) this.openDialog('activate', {...data, entity});
          break;
      }
    }
  }

  override createDialogRef(mode: DialogMode | string, data: {entity: AppUser | undefined, entities: AppUser[], projects: AppProject[], organizations: AppOrganization[]}): MatDialogRef<UserDialogComponent | UserActivateDialogComponent> {
    const userFullList = this.entityService.getAll();
    const projectFullList = this.projectService.getWithQuery();
    const organizationFullList = this.organizationService.getWithQuery();
    const _data = {mode, entity: data.entity, userFullList, projectFullList, organizationFullList};

    switch (mode) {
      case 'activate':
        return this.dialog.open(UserActivateDialogComponent, {
          data: _data,
          width: '50%',
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
      case DialogMode.DELETE:
        return this.dialog.open(UserDialogComponent, {
          data: _data,
          width: '50%',
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
      default:
        return this.dialog.open(UserDialogComponent, {
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
