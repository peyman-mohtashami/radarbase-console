import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../base-entities/enums/dialog';
import {MatDialogRef} from '@angular/material/dialog';
import {Observable, of} from 'rxjs';
import {UserService} from './user.service';
import {AppUser, RadarUser} from '../models/user';
import {UserDialogComponent} from '../containers/user-dialog/user-dialog.component';
import {UserActivateDialogComponent} from '../containers/user-activate-dialog/user-activate-dialog.component';
import {BaseDialogService} from '../../../base-entities/services/base-dialog.service';
import {UserConfigService} from './user-config.service';
import {ProjectService} from '../../project/services/project.service';
import {OrganizationService} from '../../organization/services/organization.service';

@Injectable({providedIn: 'root'})
export class UserDialogService extends BaseDialogService<AppUser, RadarUser, UserDialogComponent | UserActivateDialogComponent> {
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

  override processUrlFragment(fragment: string){
    const entityMetadata = this.configService.getEntityMetadata()
    const [, action, entityType, entityId] = fragment.split('/');
    if (entityType === entityMetadata.name) {
      const entity = entityId ? this.entityService.getEntity(entityId) : undefined;
      switch (action) {
        case 'add':
          this.openDialog(DialogMode.ADD);
          break;
        case 'edit':
          if (entity) this.openDialog(DialogMode.EDIT, entity);
          break;
        case 'delete':
          if (entity) this.openDialog(DialogMode.DELETE, entity);
          break;
        case 'activate':
          if (entity) this.openDialog('activate', entity);
          break;
      }
    }
  }

  override createDialogRef(mode: DialogMode | string, entity?: AppUser): MatDialogRef<UserDialogComponent | UserActivateDialogComponent> {
    const userFullList = this.entityService.getWithQuery();
    const projectFullList = this.projectService.getWithQuery();
    const organizationFullList = this.organizationService.getWithQuery();
    const _data = {mode, entity, userFullList, projectFullList, organizationFullList};

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
