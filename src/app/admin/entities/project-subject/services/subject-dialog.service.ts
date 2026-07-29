import {inject, Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AppSubject} from '../models/subject';
import {AppProject} from '../../project/models/project';
import {SubjectDialogMode} from '../enums/dialog';
import {SubjectConfigService} from './subject-config.service';
import {ProjectStore} from '../../project/services/project.store';
import {OrganizationStore} from '../../organization/services/organization.store';
import {SourceTypeStore} from '../../source-type/services/source-type.store';
import {ActivatedRoute} from '@angular/router';
import {SubjectStore} from './subject.store';
import {SubjectDialogComponent} from '../dialogs/subject-dialog/subject-dialog.component';
import {
  SubjectDialogDiscontinueComponent
} from '../dialogs/subject-dialog-discontinue/subject-dialog-discontinue.component';
import {
  SubjectDialogPairSourceComponent
} from '../dialogs/subject-dialog-pair-source/subject-dialog-pair-source.component';
import {SubjectDialogPairAppComponent} from '../dialogs/subject-dialog-pair-app/subject-dialog-pair-app.component';
import {
  SubjectDialogAssignGroupComponent
} from '../dialogs/subject-dialog-assign-group/subject-dialog-assign-group.component';
import {ClientStore} from '../../client/services/client.store';
import {GroupStore} from '../../project-group/services/group.store';
import {SourceStore} from '../../project-source/services/source.store';

@Injectable({providedIn: 'root'})
export class SubjectDialogService {
  private subjectStore = inject(SubjectStore);
  private projectStore = inject(ProjectStore);
  private groupStore = inject(GroupStore);
  private sourceStore = inject(SourceStore);
  private clientStore = inject(ClientStore);
  private organizationStore = inject(OrganizationStore);
  private sourceTypeStore = inject(SourceTypeStore);
  private configService = inject(SubjectConfigService);
  private dialog = inject(MatDialog);
  private activatedRoute = inject(ActivatedRoute);


  async openDialog(mode: SubjectDialogMode, entity?: AppSubject) {
    if (mode !== SubjectDialogMode.ADD && !entity) return;
    await this.createDialogRef(mode, entity);
  }

  // groupService = inject(GroupService);
  // clientService = inject(ClientService);
  // sourceService = inject(SourceService);

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

  // override processDialogAction(actionType: SubjectDialogMode, entity: AppSubject): Observable<AppSubject | void> {
  //   switch (actionType) {
  //     case SubjectDialogMode.ADD:
  //       return this.entityService.add(entity);
  //     case SubjectDialogMode.EDIT:
  //       return this.entityService.update(entity);
  //     case SubjectDialogMode.DELETE:
  //       return this.entityService.delete(entity);
  //     case SubjectDialogMode.DISCONTINUE:
  //       return this.entityService.discontinue(entity);
  //     case SubjectDialogMode.PAIR_APP:
  //       return this.entityService.discontinue(entity);
  //     case SubjectDialogMode.PAIR_SOURCE:
  //       return this.entityService.update(entity);
  //     default:
  //       // this.clearFragmentUrl();
  //       return of();
  //   }
  // }

  private async createDialogRef(mode: SubjectDialogMode, entity?: AppSubject):
    Promise<MatDialogRef<SubjectDialogComponent | SubjectDialogDiscontinueComponent | SubjectDialogPairSourceComponent | SubjectDialogPairAppComponent>> {
    const project = this.projectStore.selected()!;
    const groupFullList = this.groupStore.items();
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
    const clientFullList = this.clientStore.items().filter(c => c.additionalInformation?.['dynamic_registration'] && c.additionalInformation?.['dynamic_registration'] === 'true')

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
    const sourcesFullList = this.sourceStore.items().filter(s => !s.assigned);
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
    // const dialogRef = this.createAssignGroupToSubjectsDialogRef(subjects);
    //
    // const dialogActionSubscription = dialogRef.componentInstance.dialogActionEvent.subscribe(
    //   (value) => {
    //     if (value.entity) {
    //       this.entityService.addSubjectsToGroup(project.projectName, value.entity.name, subjects).subscribe({
    //         next: () => {
    //           this.dialogUpdateEvent.set({mode: SubjectDialogMode.ASSIGN_GROUP, entity: undefined})
    //           dialogRef.close();
    //         },
    //         error: (error: HttpErrorResponse) => dialogRef.componentInstance.errorHappened(error),
    //       });
    //     } else {
    //       dialogRef.close();
    //     }
    //   }
    // );
    //
    // dialogRef.afterClosed().subscribe(() => {
    //   dialogActionSubscription.unsubscribe();
    // });
  }

  createAssignGroupToSubjectsDialogRef(selectedSubjects: { login: string; }[] = []) {
    // const projectId = this.activatedRoute.snapshot.paramMap.get('projectId');
    const project = this.projectStore.selected()!; //: AppProject = findRouteDataFromRoot(this.router, 'project');

    // const project = this.selectedEntitiesService.getSelected().project();
    // const groupFullList = this.groupService.getWithQuery(undefined, project?.projectName);
    const groupFullList = this.groupStore.items();//this.groupService.getWithQuery(undefined, project.projectName);
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


