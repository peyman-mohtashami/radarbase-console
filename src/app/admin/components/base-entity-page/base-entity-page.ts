import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { BaseDialogComponent } from '../../base/base-dialog.component';
import { DialogMode } from '../../enums/dialog';
import { IBaseEntityService } from '../../services/base-entity.service.interface';
import {takeUntil} from 'rxjs/operators';
import {OnInit} from '@angular/core';

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

  name: string = '';

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    public location: Location,
    public entityService: IBaseEntityService<T>
  ) {
    this.entity = this.activatedRoute.snapshot.data['entity'];
  }

  init(): void {
    this.activatedRoute.fragment
      .pipe(takeUntil(this._destroy$))
      .subscribe(fragment => {
        if (!fragment) return;

        const fragmentItems = fragment.split('/');
        console.log('Class: BaseEntityPage, Function: , Line 44 fragmentItems' , fragmentItems, this.name);
        // console.log('Class: ImplEntitiesPageComponent, Function: , Line 296 fragmentItems', fragmentItems);
        // console.log('Class: ImplEntitiesPageComponent, Function: , Line 297 this.name', this.name);
        const actionType = fragmentItems[1];
        const actionEntity = fragmentItems[2];
        const actionId = fragmentItems[3];
        console.log('Class: BaseEntityPage, Function: , Line 50 actionType, actionEntity, actionId' , actionType, actionEntity, actionId);

        if (actionEntity === this.name) {
        // if (actionType === 'add') {
        //   this.openDialog(DialogMode.ADD);
        // } else if (actionType === 'edit') {
        if (actionType === 'edit') {
        console.log('Class: BaseEntityPage, Function: , Line 57 ' , );
        // const id = fragment.split('/')[2];
        // const entity = this.entities.find(e => e['id'] == actionId);
        this.entityService.openDialog({mode: DialogMode.EDIT, entity: this.entity});
        // this.entityService.openDialog(DialogMode.EDIT, this.entity);
      } else if (actionType === 'delete') {
        // const id = fragment.split('/')[2];
        // console.log('Class: ImplEntitiesPageComponent, Function: , Line 274 id', id);
        // console.log('Class: ImplEntitiesPageComponent, Function: , Line 275 this.entities', this.entities);
        // const entity = this.entities.find(e => {
        // console.log('Class: ImplEntitiesPageComponent, Function: , Line 277 e ', e, e['id'], id, e['id'] == id);
        // return e['id'] == actionId
        // });
        // console.log('Class: ImplEntitiesPageComponent, Function: , Line 276 entity', entity);
        this.entityService.openDialog({mode: DialogMode.DELETE, entity: this.entity});
        // this.entityService.openDialog(DialogMode.DELETE, this.entity);
      }
      }
    });
  }

  destroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onAction(mode: DialogMode, entity: T): void {
    // return this.openDialog(mode, entity);
  }

  // private openDialog(mode: DialogMode, entity: T) {
  //   const dialogRef = this.getDialogRef(mode, entity);
  //
  //   const dialogActionSubscription =
  //     dialogRef.componentInstance.actionTriggered.subscribe({
  //       next: (value: { action: DialogMode | string; entity: T }) => {
  //         if (value.action === DialogMode.EDIT) {
  //           this.update(value.entity, dialogRef);
  //         } else if (value.action === DialogMode.DELETE) {
  //           this.delete(value.entity, dialogRef);
  //         }
  //       },
  //     });
  //   dialogRef.afterClosed().subscribe(() => {
  //     dialogActionSubscription.unsubscribe();
  //   });
  // }

  onUpdateSuccess(entity: T, dialogRef: MatDialogRef<U>): void {
    this.entity = entity;
    this.navigateOnUpdateSuccess(entity);
    dialogRef.close();
  }

  onError(error: HttpErrorResponse, dialogRef: MatDialogRef<U>) {
    dialogRef.componentInstance.errorHappened(error);
  }

  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
