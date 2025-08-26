import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

import { BaseEntityService } from '../../../services/base.entity.service';
import { AppSourceData } from "../models/source-data";
import {RadarSourceData} from '../../../../shared/models/radar-source-data.model';
import {DialogMode} from '../../../enums/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SourceDataDialogComponent} from '../containers/source-data-dialog/source-data-dialog.component';
import {TableType} from '../../../enums/table';

@Injectable({ providedIn: 'root' })
export class SourceDataService extends BaseEntityService<
  RadarSourceData,
  AppSourceData
> {
  public override resourceUrl = 'api/source-data';

  constructor(http: HttpClient, public dialog: MatDialog,) {
    super(http);
  }

  override toAppModel(entity: RadarSourceData): AppSourceData {
    return {
      ...entity,
      name: entity.sourceDataName
    };
  }

  /*private openDialog(mode: DialogMode, entity: AppSourceData) {
    const dialogRef = this.getDialogRef(mode, entity);

    const dialogActionSubscription =
      dialogRef.componentInstance.actionTriggered.subscribe({
        next: (value: { action: DialogMode | string; entity: AppSourceData }) => {
          if (value.action === DialogMode.EDIT) {
            this.dialogUpdate(value.entity, dialogRef);
          } else if (value.action === DialogMode.DELETE) {
            this.dialogDelete(value.entity, dialogRef);
          }
        },
      });
    dialogRef.afterClosed().subscribe(() => {
      dialogActionSubscription.unsubscribe();
    });
  }

  private getDialogRef(
    mode: DialogMode,
    entity: AppSourceData
  ): MatDialogRef<SourceDataDialogComponent> {

    return this.dialog.open(SourceDataDialogComponent,
      {
        data: { mode, entity, sourceTypes: this.sourceTypes}, //entities: this.entities },
        panelClass: 'tailwind-slide-panel',
        width: '50%',
        height: '100vh',
        position: { right: '0' },
        hasBackdrop: true,
        disableClose: true,
        autoFocus: false,
        restoreFocus: false
      }
      // {
      //   data: { mode, entity, sourceTypes: this.sourceTypes },
      //   panelClass: ['w-full', 'sm:w-1/2'],
      //   disableClose: true,
      // }
    );
  }

  dialogUpdate(entity: AppSourceData, dialogRef: MatDialogRef<SourceDataDialogComponent>) {
    this.update(entity).subscribe({
      next: (_entity) => this.onUpdateSuccess(_entity, dialogRef),
      error: (err) => this.onError(err, dialogRef),
    });
  }

  onSuccess(mode: string, dialogRef: MatDialogRef<any>, entity: any): void {
    if (this.type === TableType.GET_WITH_QUERY || this.type === TableType.GET_ALL) {
      console.log('Class: ImplEntitiesPageComponent, Function: onSuccess, Line 416 ' , );
      this.updateTrigger$.next(entity['id']?.toString() || '0');
    }
    this.applyStateChangesToUrlQueryParams({ [mode]: null });
    dialogRef.close();
    console.log('Class: BaseEntitiesPage, Function: onSuccess, Line 253 ' , );
    this.updated = entity['id'];
    setTimeout(() => {
      this.updated = undefined;
    }, 1000);
  }

  onError(error: HttpErrorResponse, dialogRef: MatDialogRef<any>) {
    dialogRef.componentInstance.errorHappened(error);
  }*/
}
