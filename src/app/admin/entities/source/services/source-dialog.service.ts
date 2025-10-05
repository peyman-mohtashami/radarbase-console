import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {DialogMode} from '../../../enums/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AppSource} from '../models/source';
import {SourceService} from './source.service';
import {SourceDialogComponent} from '../containers/source-dialog/source-dialog.component';
import {AppSourceType} from '../../source-type/models/source-type';
import {AppProject} from '../../project/models/project';
import {SourceTypeDialogComponent} from '../../source-type/containers/source-type-dialog/source-type-dialog.component';

export interface UpdateTrigger {
  mode: DialogMode;
  entity: AppSource;
}

@Injectable({providedIn: 'root'})
export class SourceDialogService {
  private entityService = inject(SourceService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private dialog = inject(MatDialog);

  dialogUpdateEvent$: WritableSignal<UpdateTrigger | undefined> = signal(undefined);

  openDialog(mode: DialogMode, entity: AppSource | undefined, project: AppProject, sourceTypes: AppSourceType[]) {
    if (mode !== DialogMode.ADD && !entity) {
      this.clearFragmentUrl();
      return;
    }

    const dialogRef = this.createDialogRef(mode, entity, sourceTypes);

    const dialogActionSubscription = dialogRef.componentInstance.dialogActionEvent.subscribe({
      next: (value: { action: DialogMode; entity: AppSource }) => {
        this.processDialogAction(value.action, value.entity, project).subscribe({
          next: (res) => {
            this.dialogUpdateEvent$.set({mode, entity: res ?? value.entity})
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

  private processDialogAction(actionType: DialogMode, entity: AppSource, project: AppProject): Observable<AppSource | void> {
    switch (actionType) {
      case DialogMode.ADD:
        return this.entityService.add(entity, project);
      case DialogMode.EDIT:
        return this.entityService.update(entity, project);
      case DialogMode.DELETE:
        return this.entityService.delete(entity);
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

  createDialogRef(mode: DialogMode, entity: AppSource | undefined, sourceTypes: AppSourceType[]): MatDialogRef<SourceDialogComponent> {
    switch (mode) {
      case DialogMode.DELETE:
        return this.dialog.open(SourceDialogComponent, {
          data: {mode, entity, sourceTypes},
          width: '50%',
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
      default:
        return this.dialog.open(SourceDialogComponent, {
          data: {mode, entity, sourceTypes},
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
