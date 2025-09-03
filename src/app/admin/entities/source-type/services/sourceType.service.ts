import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

import { BaseEntityService } from '../../../services/base.entity.service';
import {AppSourceType} from "../models/source-type";
import {RadarSourceType} from '../../../../shared/models/radar-source-type.model';
// import {TableType} from '../../../models/table.model';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogMode} from '../../../enums/dialog';
import {DialogData} from '../../source-data/services/source-data.service';
import {SourceTypeDialogComponent} from '../containers/source-type-dialog/source-type-dialog.component';

@Injectable({ providedIn: 'root' })
export class SourceTypeService extends BaseEntityService<
  RadarSourceType,
  AppSourceType
> {
  override resourceUrl = 'api/source-types';
  // type = TableType.GET_WITH_QUERY;

  constructor(
    http: HttpClient,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    super(http);
  }

  override toAppModel(entity: RadarSourceType): AppSourceType {
    return {
      ...entity,
      name: `${entity.producer}/${entity.model}/${entity.catalogVersion}`,
    };
  }

  override toRadarModel(entity: AppSourceType): RadarSourceType {
    return { ...entity };
  }

  override openDialog(dialogData: DialogData) {
    const dialogRef = this.getDialogRef(dialogData);

    const dialogActionSubscription =
      dialogRef.componentInstance.actionTriggered.subscribe({
        next: ({action, entity}: { action: DialogMode | string; entity: any }) => {
          switch (action) {
            case DialogMode.EDIT:
              this.update(entity).subscribe({
                next: () => this.onSuccess(dialogRef, entity),
                error: (err) => this.onError(err, dialogRef),
              });
              break;
            case DialogMode.ADD:
              this.add(entity).subscribe({
                next: (res) => this.onSuccess(dialogRef, res),
                error: (err) => this.onError(err, dialogRef),
              });
              break;
            case DialogMode.DELETE:
              this.delete(entity['name']).subscribe({
                next: () => this.onSuccess(dialogRef, entity),
                error: (err) => this.onError(err, dialogRef),
              });
              break;
            case 'close':
              this.router.navigate([], {
                relativeTo: this.activatedRoute,
                queryParamsHandling: 'preserve'
              }).then(() => {
                // dialogRef.componentInstance.close()
              });
            // this.router.navigate([], {
            //   relativeTo: this.activatedRoute,
            //   queryParamsHandling: 'preserve'
            // }).then();
            // break;
          }
        },
      });
    dialogRef.afterClosed().subscribe(() => {
      console.log('Class: SourceDataService, Function: , Line 80 ' , );
      dialogActionSubscription.unsubscribe();
    });
  }

  onSuccess(dialogRef: MatDialogRef<any>, entity: AppSourceType): void {
    // if (this.type === TableType.GET_WITH_QUERY || this.type === TableType.GET_ALL) {
      this.updateTrigger$.next(`${entity?.['id'] ?? '0'}`);
    // }

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'preserve'
    }).then(() => {
      dialogRef.componentInstance.close()
    });

    this.updated.set(`${entity['id']}`);// = undefined;
    // this.updated = entity['id'];
    setTimeout(() => {
      this.updated.set(undefined);// = undefined;
    }, 1000);
  }

  onError(error: HttpErrorResponse, dialogRef: MatDialogRef<any>) {
    dialogRef.componentInstance.errorHappened(error);
  }

  getDialogRef(data: DialogData): MatDialogRef<SourceTypeDialogComponent> {
    return this.dialog.open(SourceTypeDialogComponent,
      {
        data: data,
        panelClass: 'tailwind-slide-panel',
        width: '50%',
        height: '100vh',
        position: {right: '0'},
        hasBackdrop: true,
        disableClose: true,
        autoFocus: false,
        restoreFocus: false
      }
    );
  }
}
