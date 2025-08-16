import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { BaseDialogComponent } from '../base-dialog/base-dialog.component';
import { DialogMode } from '../../enums/dialog';
import { IBaseEntityService } from '../../services/base-entity.service.interface';

export abstract class BaseEntityPage<
  T extends { [key: string]: any },
  U extends BaseDialogComponent<T, U>
> {
  DialogMode = DialogMode;

  loading = false;
  error?: string;

  entity: T; // = this.activatedRoute.snapshot.data['entity'];

  dateFormat?: string = '';

  _destroy$: Subject<void> = new Subject<void>();

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    public location: Location,
    public entityService: IBaseEntityService<T>
  ) {
    this.entity = this.activatedRoute.snapshot.data['entity'];
  }

  destroy() {
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

  onUpdateSuccess(entity: T, dialogRef: MatDialogRef<U>): void {
    this.entity = entity;
    this.navigateOnUpdateSuccess(entity);
    dialogRef.close();
  }

  onError(error: HttpErrorResponse, dialogRef: MatDialogRef<U>) {
    dialogRef.componentInstance.errorHappened(error);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getDialogRef(mode: DialogMode, entity: T): MatDialogRef<U> {
    throw new Error('BaseDetailsPage "getDialogRef" method not implemented');
  }

  update(entity: T, dialogRef: MatDialogRef<U>) {
    this.entityService.update(entity).subscribe({
      next: (_entity) => this.onUpdateSuccess(_entity, dialogRef),
      error: (err) => this.onError(err, dialogRef),
    });
  }

  delete(entity: T, dialogRef: MatDialogRef<U>) {
    this.entityService.delete(entity['name']).subscribe({
      next: () => this.onDeleteSuccess(dialogRef),
      error: (err) => this.onError(err, dialogRef),
    });
  }

  onDeleteSuccess(dialogRef: MatDialogRef<U>): void {
    this.navigateOnDeleteSuccess();
    dialogRef.close();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigateOnUpdateSuccess(entity: T): void {
    throw new Error(
      'BaseDetailsPage "navigateOnUpdateSuccess" method not implemented'
    );
  }

  navigateOnDeleteSuccess(): void {
    throw new Error(
      'BaseDetailsPage "navigateOnDeleteSuccess" method not implemented'
    );
  }

  onBack() {
    this.location.back();
  }
}
