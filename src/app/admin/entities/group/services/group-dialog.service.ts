import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {DialogMode} from '../../../enums/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AppGroup} from '../models/group';
import {GroupService} from './group.service';
import {GroupDialogComponent} from '../containers/group-dialog/group-dialog.component';
import {SourceTypeDialogComponent} from '../../source-type/containers/source-type-dialog/source-type-dialog.component';

export interface UpdateTrigger {
  mode: DialogMode;
  entity: AppGroup;
}

@Injectable({providedIn: 'root'})
export class GroupDialogService {
  private entityService = inject(GroupService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private dialog = inject(MatDialog);

  dialogUpdateEvent: WritableSignal<UpdateTrigger | undefined> = signal(undefined);

  openDialog(mode: DialogMode, entity: AppGroup | undefined, entities: AppGroup[], projectName: string) {
    if (mode !== DialogMode.ADD && !entity) {
      this.clearFragmentUrl();
      return;
    }

    const dialogRef = this.createDialogRef(mode, entity, entities);

    const dialogActionSubscription = dialogRef.componentInstance.dialogActionEvent.subscribe({
      next: (value: { action: DialogMode; entity: AppGroup }) => {
        this.processDialogAction(value.action, value.entity, projectName).subscribe({
          next: (res) => {
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

  private processDialogAction(actionType: DialogMode, entity: AppGroup, projectName: string): Observable<AppGroup | void> {
    switch (actionType) {
      case DialogMode.ADD:
        return this.entityService.add(projectName, entity);
      case DialogMode.EDIT:
        return this.entityService.update(projectName, entity);
      case DialogMode.DELETE:
        return this.entityService.delete(projectName, entity);
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

  createDialogRef(mode: DialogMode, entity: AppGroup | undefined, entities: AppGroup[]): MatDialogRef<GroupDialogComponent> {
    switch (mode) {
      case DialogMode.DELETE:
        return this.dialog.open(GroupDialogComponent, {
          data: {mode, entity, entities},
          width: '50%',
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
      default:
        return this.dialog.open(GroupDialogComponent, {
          data: {mode, entity, entities},
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
