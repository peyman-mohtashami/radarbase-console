import {Injectable, signal, WritableSignal} from '@angular/core';
import {DialogMode} from '../../../enums/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {SourceDataService} from './source-data.service';
import {SourceDataDialogComponent} from '../containers/source-data-dialog/source-data-dialog.component';
import {AppSourceData} from '../models/source-data';

export interface UpdateTrigger {
  mode: DialogMode;
  entity: AppSourceData;
}

@Injectable({providedIn: 'root'})
export class SourceDataDialogService {
  updateTrigger$: WritableSignal<UpdateTrigger | undefined> = signal(undefined)

  constructor(
    private entityService: SourceDataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) {}

  openDialog(mode: DialogMode, entity?: AppSourceData, extra?: any) {
    if (mode !== DialogMode.ADD && !entity) {
      this.removeFragmentUrl();
      return;
    }

    const dialogRef = this.getDialogRef(mode, entity, extra);

    const dialogActionSubscription =
      dialogRef.componentInstance.actionTriggered.subscribe({
        next: (value: { action: DialogMode | string; entity: AppSourceData }) => {
          if (value.action === DialogMode.EDIT) {
            this.update(value.entity).subscribe({
              next: (res) => {
                this.updateTrigger$.set({mode, entity: res})
                dialogRef.close();
              },
              error: (err) => this.onError(err, dialogRef)
            });
          } else if (value.action === DialogMode.ADD) {
            this.add(value.entity)
              .subscribe({
                next: (res) => {
                  this.updateTrigger$.set({mode, entity: res})
                  dialogRef.close();
                },
                error: (err) => this.onError(err, dialogRef),
              });
          } else if (value.action === DialogMode.DELETE) {
            this.delete(value.entity).subscribe({
              next: () => {
                this.updateTrigger$.set({mode, entity: value.entity})
                dialogRef.close();
              },
              error: (err) => this.onError(err, dialogRef)
            });
          } else if (value.action === DialogMode.CLOSE) {
            this.removeFragmentUrl();
          }
        },
      });
    dialogRef.afterClosed().subscribe(() => {
      dialogActionSubscription.unsubscribe();
    });
  }

  removeFragmentUrl() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'preserve',
      fragment: undefined // Explicitly remove the fragment
    }).then();
  }

  onError(error: HttpErrorResponse, dialogRef: MatDialogRef<any>) {
    dialogRef.componentInstance.errorHappened(error);
  }

  getDialogRef(mode: DialogMode, entity?: AppSourceData, extra?: any): MatDialogRef<any> {
    return this.dialog.open(SourceDataDialogComponent, {
      data: {mode, entity, extra},
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

  update(entity: AppSourceData): Observable<AppSourceData> {
    return this.entityService.update(entity);
  }

  add(entity: AppSourceData): Observable<AppSourceData> {
    return this.entityService.add(entity);
  }

  delete(entity: AppSourceData): Observable<string | number> {
    return this.entityService.delete(entity.name);
  }
}
