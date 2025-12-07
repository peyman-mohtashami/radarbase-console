import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
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

export interface UpdateTrigger {
  mode: SubjectDialogMode;
  entity?: AppSubject;
}

@Injectable({providedIn: 'root'})
export class SubjectDialogService {
  private entityService = inject(SubjectService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private dialog = inject(MatDialog);

  dialogUpdateEvent: WritableSignal<UpdateTrigger | undefined> = signal(undefined);

  openDialog(mode: SubjectDialogMode, entity?: AppSubject, project?: AppProject) {
    if (mode !== SubjectDialogMode.ADD && !entity) {
      this.clearFragmentUrl();
      return;
    }

    const dialogRef = this.createDialogRef(mode, entity, project);

    const dialogActionSubscription = dialogRef.componentInstance.dialogActionEvent.subscribe({
      next: (value: { action: SubjectDialogMode; entity: AppSubject }) => {
        this.processDialogAction(value.action, value.entity).subscribe({
          next: (res) => {
            console.log('Class: SubjectDialogService, Function: next, Line 46 res' , res);
            this.dialogUpdateEvent.set({mode, entity: res ?? value.entity})
            dialogRef.close();
          },
          error: (error: HttpErrorResponse) => dialogRef.componentInstance.errorHappened(error),
        });
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      dialogActionSubscription.unsubscribe();
    });
  }

  private processDialogAction(actionType: SubjectDialogMode, entity: AppSubject): Observable<AppSubject | void> {
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

  clearFragmentUrl() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'preserve',
      fragment: undefined // Explicitly remove the fragment
    }).then();
  }

  createDialogRef(mode: SubjectDialogMode, entity?: AppSubject, project?: AppProject): MatDialogRef<any> {
    if (mode === SubjectDialogMode.DISCONTINUE) {
      return this.createDiscontinueDialogRef(mode, entity, project);
    } else if (mode === SubjectDialogMode.PAIR_APP) {
      return this.createPairAppDialogRef(mode, entity, project);
    } else if (mode === SubjectDialogMode.PAIR_SOURCE) {
      return this.createPairSourceDialogRef(mode, entity, project);
    } else {
      return this.dialog.open(SubjectDialogComponent, {
        data: {mode, entity, project},
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

  createDiscontinueDialogRef(mode: SubjectDialogMode, entity?: AppSubject, project?: AppProject) {
    return this.dialog.open(SubjectDialogDiscontinueComponent, {
      data: {mode, entity, project},
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

  createPairAppDialogRef(mode: SubjectDialogMode, entity?: AppSubject, project?: AppProject) {
    return this.dialog.open(SubjectDialogPairAppComponent, {
      data: {mode, entity, clients: []},
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

  createPairSourceDialogRef(mode: SubjectDialogMode, entity: AppSubject | undefined, project: AppProject | undefined) {
    return this.dialog.open(SubjectDialogPairSourceComponent, {
      data: {mode, entity, project: project},
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


