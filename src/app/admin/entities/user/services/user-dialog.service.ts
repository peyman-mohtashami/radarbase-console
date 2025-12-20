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

@Injectable({providedIn: 'root'})
export class UserDialogService extends BaseDialogService<AppUser, UserDialogComponent | UserActivateDialogComponent> {
  override entityService = inject(UserService);
  override configService = inject(UserConfigService);

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

  override createDialogRef(mode: DialogMode | string, data: {entity: AppUser | undefined, entities: AppUser[], projects: AppProject[], organizations: AppOrganization[]}): MatDialogRef<UserDialogComponent | UserActivateDialogComponent> {
    const {entity, entities, projects, organizations} = data;
    switch (mode) {
      case 'activate':
        return this.dialog.open(UserActivateDialogComponent, {
          data: {mode, entity, entities, projects, organizations},
          width: '50%',
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
      case DialogMode.DELETE:
        return this.dialog.open(UserDialogComponent, {
          data: {mode, entity, entities, projects, organizations},
          width: '50%',
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
      default:
        return this.dialog.open(UserDialogComponent, {
          data: {mode, entity, entities, projects, organizations},
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
