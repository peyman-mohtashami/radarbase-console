import {inject, Injectable} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {AppSubject} from '../models/subject';
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
import {BaseDialogService} from '../../../services/base-dialog.service';
import {SubjectConfigService} from './subject-config.service';
import {GroupService} from '../../group/services/group.service';
import {ClientService} from '../../client/services/client.service';
import {getSelectedProject} from '../../../services/util';

@Injectable({providedIn: 'root'})
export class SubjectDialogService extends BaseDialogService<AppSubject, SubjectDialogComponent> {
  override entityService = inject(SubjectService);
  override configService = inject(SubjectConfigService);

  groupService = inject(GroupService);
  clientService = inject(ClientService);

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
    const groupFullList = this.groupService.getWithQuery();
    const project = getSelectedProject(this.router.routerState.snapshot.root);

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

  createDiscontinueDialogRef(_data: {mode: SubjectDialogMode, entity?: AppSubject, project?: AppProject}): MatDialogRef<SubjectDialogDiscontinueComponent> {
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

  createPairAppDialogRef(_data: {mode: SubjectDialogMode, entity?: AppSubject, project?: AppProject}) {
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

  createPairSourceDialogRef(_data: {mode: SubjectDialogMode, entity?: AppSubject, project?: AppProject}) {
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

  openAssignGroupToSubjectsDialog(subjects: {login: string;}[], project: AppProject, groups: AppGroup[]) {
    const dialogRef = this.createAssignGroupToSubjectsDialogRef(groups);

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

  createAssignGroupToSubjectsDialogRef(groups: AppGroup[]) {
    return this.dialog.open(SubjectDialogAssignGroupComponent, {
      data: { groups },
      panelClass: ['w-full', 'max-w-[700px]!', 'sm:w-1/2'],
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      restoreFocus: false
    });
  }



  // private openAssignGroupToSubjectsDialog() {
  //   const dialogRef = this.getAssignGroupToSubjectsDialogRef();
  //   // this.applyStateChangesToUrlQueryParams({ [mode]: entity? entity.name : 'new' });
  //
  //   const dialogActionSubscription =
  //     dialogRef.componentInstance.actionTriggered.subscribe({
  //       next: (value: { action: DialogMode | string; groupName: string }) => {
  //         if (value.action === DialogMode.EDIT) {
  //           this.entityService
  //             .addSubjectsToGroup(
  //               this.project$().projectName,
  //               value.groupName,
  //               this.selection().selected.map((s) => {
  //                 return { login: s.login };
  //               })
  //             )
  //             .subscribe({
  //               next: () => this.onAssignGroupToSubjectsSuccess(dialogRef),
  //               error: (err) =>
  //                 this.onAssignGroupToSubjectsError(err, dialogRef),
  //             });
  //         } else if (value.action === 'close') {
  //           // this.applyStateChangesToUrlQueryParams({[mode]: null});
  //         }
  //       },
  //     });
  //   dialogRef.afterClosed().subscribe(() => {
  //     dialogActionSubscription.unsubscribe();
  //   });
  // }



  // private onAssignGroupToSubjectsSuccess(
  //   dialogRef: MatDialogRef<SubjectDialogAssignGroupComponent>
  // ): void {
  //   this.updateTrigger.emit('0');
  //   // this.applyStateChangesToUrlQueryParams({[mode]: null});
  //   dialogRef.close();
  // }
  //
  // protected onAssignGroupToSubjectsError(
  //   err: HttpErrorResponse,
  //   dialogRef: MatDialogRef<SubjectDialogAssignGroupComponent>
  // ) {
  //   dialogRef.componentInstance.errorHappened(err);
  // }
}


