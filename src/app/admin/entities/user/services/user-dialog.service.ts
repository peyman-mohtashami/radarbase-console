import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../base-entities/enums/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Observable, of} from 'rxjs';
import {UserService} from './user.service';
import {AppUser, UserDto} from '../models/user';
import {UserDialogComponent} from '../dialogs/user-dialog/user-dialog.component';
import {UserActivateDialogComponent} from '../dialogs/user-activate-dialog/user-activate-dialog.component';
import {BaseDialogService} from '../../../base-entities/services/base-dialog.service';
import {UserConfigService} from './user-config.service';
import {ProjectService} from '../../project/services/project.service';
// import {OrganizationService} from '../../organization/services/organization.service';
import {OrganizationStore} from '../../organization/services/organization.store';
import {ProjectStore} from '../../project/services/project.store';
import {ClientStore} from '../../client/services/client.store';
import {SourceTypeStore} from '../../source-type/services/source-type.store';
import {ActivatedRoute} from '@angular/router';
import {UserStore} from './user.store';
import {GroupStore} from '../../project-group/services/group.store';
import {SourceStore} from '../../project-source/services/source.store';
import {SubjectConfigService} from '../../project-subject/services/subject-config.service';

@Injectable({providedIn: 'root'})
export class UserDialogService {
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

  // override processDialogAction(actionType: DialogMode | string, entity: AppUser): Observable<AppUser | void> {
  //   switch (actionType) {
  //     case DialogMode.ADD:
  //       return this.entityService.add(entity);
  //     case DialogMode.EDIT:
  //       return this.entityService.update(entity);
  //     case DialogMode.DELETE:
  //       return this.entityService.delete(entity);
  //     case 'activate':
  //       return this.entityService.sendActivationEmail(entity);
  //     default:
  //       // this.clearFragmentUrl();
  //       return of();
  //   }
  // }

  // override processUrlFragment(fragment: string){
  //   const entityMetadata = this.configService.getEntityMetadata()
  //   const [, action, entityType, entityId] = fragment.split('/');
  //   if (entityType === entityMetadata.name) {
  //     const entity = entityId ? this.entityService.getEntity(entityId) : undefined;
  //     switch (action) {
  //       case 'add':
  //         this.openDialog(DialogMode.ADD);
  //         break;
  //       case 'edit':
  //         if (entity) this.openDialog(DialogMode.EDIT, entity);
  //         break;
  //       case 'delete':
  //         if (entity) this.openDialog(DialogMode.DELETE, entity);
  //         break;
  //       case 'activate':
  //         if (entity) this.openDialog('activate', entity);
  //         break;
  //     }
  //   }
  // }

  private async createDialogRef(mode: DialogMode | string, entity?: AppUser): Promise<MatDialogRef<UserDialogComponent | UserActivateDialogComponent>> {
    const userFullList = this.userStore.items();
    const projectFullList = this.projectStore.items();
    const organizationFullList = this.organizationStore.items();
    const _data = {id: 'user-dialog', mode, entity, userFullList, projectFullList, organizationFullList};

    switch (mode) {
      case 'activate':
        console.log('Class: UserDialogService, Function: createDialogRef, Line 68 ' , );
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
          id: 'user-dialog',
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
