import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {DialogMode} from '../../../enums/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {SourceDataService} from './source-data.service';
import {SourceDataDialogComponent} from '../containers/source-data-dialog/source-data-dialog.component';
import {AppSourceData} from '../models/source-data';
import {AppSourceType} from '../../source-type/models/source-type';

export interface UpdateTrigger {
  mode: DialogMode;
  entity: AppSourceData;
}

@Injectable({providedIn: 'root'})
export class SourceDataDialogService {
  private entityService = inject(SourceDataService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private dialog = inject(MatDialog);

  dialogUpdateEvent$: WritableSignal<UpdateTrigger | undefined> = signal(undefined);

  openDialog(mode: DialogMode, entity: AppSourceData | undefined, sourceTypes: AppSourceType[]) {
    if (mode !== DialogMode.ADD && !entity) {
      this.clearFragmentUrl();
      return;
    }

    const dialogRef = this.createDialogRef(mode, entity, sourceTypes);

    const dialogActionSubscription = dialogRef.componentInstance.dialogActionEvent.subscribe({
      next: (value: { action: DialogMode; entity: AppSourceData }) => {
        this.processDialogAction(value.action, value.entity).subscribe({
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

  private processDialogAction(actionType: DialogMode, entity: AppSourceData): Observable<AppSourceData | void> {
    switch (actionType) {
      case DialogMode.ADD:
        return this.entityService.add(entity);
      case DialogMode.EDIT:
        return this.entityService.update(entity);
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

  createDialogRef(mode: DialogMode, entity: AppSourceData | undefined, sourceTypes: AppSourceType[]): MatDialogRef<SourceDataDialogComponent> {
    return this.dialog.open(SourceDataDialogComponent, {
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
