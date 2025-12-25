import {inject, Injectable} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {AppSubject, RadarSubject} from '../models/subject';
import {SubjectService} from './subject.service';
import {SubjectDialogComponent} from '../containers/subject-dialog/subject-dialog.component';
import {AppProject} from '../../project/models/project';
import {SubjectDialogMode} from '../enums/dialog';
import {
  SubjectDialogDiscontinueComponent
} from '../containers/subject-dialog-discontinue/subject-dialog-discontinue.component';
import {SubjectDialogPairAppComponent} from '../containers/subject-dialog-pair-app/subject-dialog-pair-app.component';
import {
  SubjectDialogPairSourceComponent
} from '../containers/subject-dialog-pair-source/subject-dialog-pair-source.component';
import {
  SubjectDialogAssignGroupComponent
} from '../containers/subject-dialog-assign-group/subject-dialog-assign-group.component';
import {AppGroup} from '../../group/models/group';
import {BaseDialogService} from '../../../base-entities/services/base-dialog.service';
import {SubjectConfigService} from './subject-config.service';
import {GroupService} from '../../group/services/group.service';
import {ClientService} from '../../client/services/client.service';

@Injectable({providedIn: 'root'})
export class SubjectDialogService extends BaseDialogService<AppSubject, RadarSubject, SubjectDialogComponent> {
  override entityService = inject(SubjectService);
  override configService = inject(SubjectConfigService);

  groupService = inject(GroupService);
  clientService = inject(ClientService);

  override processUrlFragment(fragment: string) {
    const entityMetadata = this.configService.getEntityMetadata()
    const [, action, entityType, entityId] = fragment.split('/');
    if (entityType === entityMetadata.name) {
      const entity = entityId ? this.entityService.getEntity(entityId) : undefined;
      switch (action) {
        case 'add':
          this.openDialog(SubjectDialogMode.ADD);
          break;
        case 'edit':
          if (entity) this.openDialog(SubjectDialogMode.EDIT, entity);
          break;
        case 'delete':
          if (entity) this.openDialog(SubjectDialogMode.DELETE, entity);
          break;
        case 'discontinue':
          if (entity) this.openDialog(SubjectDialogMode.DISCONTINUE, entity);
          break;
        case 'pair_source':
          if (entity) this.openDialog(SubjectDialogMode.PAIR_SOURCE, entity);
          break;
        case 'pair_app':
          if (entity) this.openDialog(SubjectDialogMode.PAIR_APP, entity);
          break;
      }
    }
  }

  override processDialogAction(actionType: SubjectDialogMode, entity: AppSubject): Observable<AppSubject | void> {
    switch (actionType) {
      case SubjectDialogMode.ADD:
        return this.entityService.add(entity);
      case SubjectDialogMode.EDIT:
        return this.entityService.update(entity);
      case SubjectDialogMode.DELETE:
        return this.entityService.delete(entity);
      case SubjectDialogMode.DISCONTINUE:
        return this.entityService.discontinue(entity);
      case SubjectDialogMode.PAIR_APP:
        return this.entityService.discontinue(entity);
      case SubjectDialogMode.PAIR_SOURCE:
        return this.entityService.update(entity);
      default:
        this.clearFragmentUrl();
        return of();
    }
  }

  override createDialogRef(mode: SubjectDialogMode, entity?: AppSubject): MatDialogRef<any> {
    const project = this.selectedEntitiesService.selectedProject();
    const groupFullList = this.groupService.getWithQuery(undefined, project?.projectName);

    const _data = {mode, entity, project, groupFullList};

    if (mode === SubjectDialogMode.DISCONTINUE) {
      return this.createDiscontinueDialogRef(_data);
    } else if (mode === SubjectDialogMode.PAIR_APP) {
      return this.createPairAppDialogRef(_data);
    } else if (mode === SubjectDialogMode.PAIR_SOURCE) {
      return this.createPairSourceDialogRef(_data);
    } else {
      return this.dialog.open(SubjectDialogComponent, {
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

  createDiscontinueDialogRef(_data: {
    mode: SubjectDialogMode,
    entity?: AppSubject,
    project?: AppProject
  }): MatDialogRef<SubjectDialogDiscontinueComponent> {
    return this.dialog.open(SubjectDialogDiscontinueComponent, {
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

  createPairAppDialogRef(_data: { mode: SubjectDialogMode, entity?: AppSubject, project?: AppProject }) {
    const clientFullList = this.clientService.getWithQuery();
    return this.dialog.open(SubjectDialogPairAppComponent, {
      data: {..._data, clientFullList},
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

  createPairSourceDialogRef(_data: { mode: SubjectDialogMode, entity?: AppSubject, project?: AppProject }) {
    return this.dialog.open(SubjectDialogPairSourceComponent, {
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

  openAssignGroupToSubjectsDialog(subjects: { login: string; }[], project: AppProject) {
    const dialogRef = this.createAssignGroupToSubjectsDialogRef();

    const dialogActionSubscription = dialogRef.componentInstance.dialogActionEvent.subscribe({
      next: (value: { group?: AppGroup }) => {
        if (value.group) {
          this.entityService.addSubjectsToGroup(project.projectName, value.group.name, subjects).subscribe({
            next: () => {
              this.dialogUpdateEvent.set({mode: SubjectDialogMode.ASSIGN_GROUP, entity: undefined})
              dialogRef.close();
            },
            error: (error: HttpErrorResponse) => dialogRef.componentInstance.errorHappened(error),
          });
        } else {
          dialogRef.close();
        }
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      dialogActionSubscription.unsubscribe();
    });
  }

  createAssignGroupToSubjectsDialogRef() {
    const project = this.selectedEntitiesService.selectedProject();
    const groupFullList = this.groupService.getWithQuery(undefined, project?.projectName);

    return this.dialog.open(SubjectDialogAssignGroupComponent, {
      data: {groups: groupFullList},
      panelClass: ['w-full', 'max-w-[700px]!', 'sm:w-1/2'],
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      restoreFocus: false
    });
  }
}


