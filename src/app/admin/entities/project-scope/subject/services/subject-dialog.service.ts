import {inject, Injectable} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {AppSubject, RadarSubject} from '../models/subject';
import {SubjectService} from './subject.service';
import {SubjectDialogComponent} from '../containers/subject-dialog/subject-dialog.component';
import {AppProject} from '../../../main-scope/project/models/project';
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
import {BaseDialogService} from '../../../../base-entities/services/base-dialog.service';
import {SubjectConfigService} from './subject-config.service';
import {GroupService} from '../../group/services/group.service';
import {ClientService} from '../../../main-scope/client/services/client.service';
import {map} from 'rxjs/operators';
import {SourceService} from '../../source/services/source.service';
import {findRouteDataFromRoot} from '../../../main-scope/organization/services/organization.service';

@Injectable({providedIn: 'root'})
export class SubjectDialogService extends BaseDialogService<AppSubject, RadarSubject, SubjectDialogComponent | SubjectDialogDiscontinueComponent | SubjectDialogPairSourceComponent | SubjectDialogPairAppComponent> {
  override entityService = inject(SubjectService);
  override configService = inject(SubjectConfigService);

  groupService = inject(GroupService);
  clientService = inject(ClientService);
  sourceService = inject(SourceService);

  // override processUrlFragment(fragment: string) {
  //   const entityMetadata = this.configService.getEntityMetadata()
  //   const [, action, entityType, entityId] = fragment.split('/');
  //   if (entityType === entityMetadata.name) {
  //     const entity = entityId ? this.entityService.getEntity(entityId) : undefined;
  //     switch (action) {
  //       case 'add':
  //         this.openDialog(SubjectDialogMode.ADD);
  //         break;
  //       case 'edit':
  //         if (entity) this.openDialog(SubjectDialogMode.EDIT, entity);
  //         break;
  //       case 'delete':
  //         if (entity) this.openDialog(SubjectDialogMode.DELETE, entity);
  //         break;
  //       case 'discontinue':
  //         if (entity) this.openDialog(SubjectDialogMode.DISCONTINUE, entity);
  //         break;
  //       case 'pair_source':
  //         if (entity) this.openDialog(SubjectDialogMode.PAIR_SOURCE, entity);
  //         break;
  //       case 'pair_app':
  //         if (entity) this.openDialog(SubjectDialogMode.PAIR_APP, entity);
  //         break;
  //     }
  //   }
  // }

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
        // this.clearFragmentUrl();
        return of();
    }
  }

  override createDialogRef(mode: SubjectDialogMode, entity?: AppSubject):
    MatDialogRef<SubjectDialogComponent | SubjectDialogDiscontinueComponent | SubjectDialogPairSourceComponent | SubjectDialogPairAppComponent> {
    const project = findRouteDataFromRoot(this.router, 'project');
    const groupFullList = this.groupService.getWithQuery(undefined, project?.projectName);
    const _data = {id: 'subject-dialog', mode, entity, project, groupFullList};

    switch (mode) {
      case SubjectDialogMode.DISCONTINUE:
        return this.createDiscontinueDialogRef(_data);
      case SubjectDialogMode.PAIR_APP:
        return this.createPairAppDialogRef(_data);
      case SubjectDialogMode.PAIR_SOURCE:
        return this.createPairSourceDialogRef(_data);
      case SubjectDialogMode.DELETE:
        return this.dialog.open(SubjectDialogComponent, {
          id: 'subject-dialog',
          data: _data,
          width: '50%',
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
      default:
        return this.dialog.open(SubjectDialogComponent, {
          id: 'subject-dialog',
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

  createDiscontinueDialogRef(data: {
    mode: SubjectDialogMode,
    entity?: AppSubject,
    project?: AppProject
  }): MatDialogRef<SubjectDialogDiscontinueComponent> {
    console.log('Class: SubjectDialogService, Function: createDiscontinueDialogRef, Line 121 data' , data);
    const _data = {id: 'subject-discontinue-dialog', mode: data.mode, entity: data.entity, project: data.project};

    return this.dialog.open(SubjectDialogDiscontinueComponent, {
      id: 'subject-discontinue-dialog',
      data: _data,
      width: '50%',
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      restoreFocus: false
    });
  }

  createPairAppDialogRef(data: { mode: SubjectDialogMode, entity?: AppSubject, project?: AppProject }) {
    const clientFullList = this.clientService.getWithQuery().pipe(
      map(clients => clients.filter(c => c.additionalInformation?.['dynamic_registration'] && c.additionalInformation?.['dynamic_registration'] === 'true'))
    );
    const _data = {id: 'subject-pair-app-dialog', mode: data.mode, entity: data.entity, project: data.project, clientFullList};

    return this.dialog.open(SubjectDialogPairAppComponent, {
      id: 'subject-pair-app-dialog',
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

  createPairSourceDialogRef(data: { mode: SubjectDialogMode, entity?: AppSubject, project?: AppProject }) {
    const sourcesFullList = this.sourceService.getWithQuery(undefined, data.project?.projectName).pipe(
      map(sources => sources.filter(s => !s.assigned))
    );
    const _data = {id: 'subject-pair-source-dialog', mode: data.mode, entity: data.entity, project: data.project, sourcesFullList};

    return this.dialog.open(SubjectDialogPairSourceComponent, {
      id: 'subject-pair-source-dialog',
      data: {..._data, sourcesFullList},
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
    const dialogRef = this.createAssignGroupToSubjectsDialogRef(subjects);

    const dialogActionSubscription = dialogRef.componentInstance.dialogActionEvent.subscribe(
      (value) => {
        if (value.entity) {
          this.entityService.addSubjectsToGroup(project.projectName, value.entity.name, subjects).subscribe({
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
    );

    dialogRef.afterClosed().subscribe(() => {
      dialogActionSubscription.unsubscribe();
    });
  }

  createAssignGroupToSubjectsDialogRef(selectedSubjects: { login: string; }[] = []) {
    // const projectId = this.activatedRoute.snapshot.paramMap.get('projectId');
    const project: AppProject = findRouteDataFromRoot(this.router, 'project');

    // const project = this.selectedEntitiesService.getSelected().project();
    // const groupFullList = this.groupService.getWithQuery(undefined, project?.projectName);
    const groupFullList = this.groupService.getWithQuery(undefined, project.projectName);
    const _data = {id: 'subject-assign-group-dialog', groupFullList, selectedSubjects};

    return this.dialog.open(SubjectDialogAssignGroupComponent, {
      id: 'subject-assign-group-dialog',
      data: _data,
      panelClass: ['w-full', 'max-w-[700px]!', 'sm:w-1/2'],
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      restoreFocus: false
    });
  }
}


