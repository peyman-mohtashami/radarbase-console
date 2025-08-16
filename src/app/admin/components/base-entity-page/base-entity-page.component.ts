import { Component, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { BaseDialogComponent } from '../base-dialog/base-dialog.component';
import { DialogMode } from '../../enums/dialog';

@Component({
    selector: 'rb-base-details',
    template: '<div></div>',
})
export class BaseEntityPageComponent<
  T extends { [key: string]: any },
  U extends BaseDialogComponent<T, U>
> implements OnDestroy
{
  DialogMode = DialogMode;

  loading = false;
  error?: string;

  entity: T;// = this.activatedRoute.snapshot.data['entity'];

  dateFormat?: string = '';

  _destroy$: Subject<void> = new Subject<void>();

  panelOpenState = false;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    public location: Location
  ) {
    this.entity = this.activatedRoute.snapshot.data['entity'];
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onAction(mode: DialogMode, entity: T): void {
    return this.openDialog(mode, entity);
  }

  private openDialog(mode: DialogMode, entity: T) {
    const dialogRef = this.getDialogRef(mode, entity);

    const dialogActionSubscription =
      dialogRef.componentInstance.actionTriggered.subscribe({
        next: (value: { action: DialogMode | string; entity: T }) => {
          if (value.action === DialogMode.EDIT) {
            this.update(value.entity, dialogRef);
          } else if (value.action === DialogMode.DELETE) {
            this.delete(value.entity, dialogRef);
          }
        },
      });
    dialogRef.afterClosed().subscribe(() => {
      dialogActionSubscription.unsubscribe();
    });
  }

  onSuccess(entity: T, dialogRef: MatDialogRef<U>): void {
    this.entity = entity;
    dialogRef.close();
  }

  onError(error: HttpErrorResponse, dialogRef: MatDialogRef<U>) {
    dialogRef.componentInstance.errorHappened(error);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getDialogRef(mode: DialogMode, entity: T): MatDialogRef<U> {
    throw new Error('BaseDetailsPage "getDialogRef" method not implemented');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(entity: T, dialogRef: MatDialogRef<U>) {
    throw new Error('BaseDetailsPage "update" method not implemented');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delete(entity: T, dialogRef: MatDialogRef<U>) {
    throw new Error('BaseDetailsPage "delete" method not implemented');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigate(entity: T): void {
    throw new Error('BaseDetailsPage "navigate" method not implemented');
  }
}
