import {Injectable} from '@angular/core';
import {BaseEntityService} from '../../../services/base.entity.service';
import {AppSourceData} from "../models/source-data";
import {RadarSourceData} from '../../../../shared/models/radar-source-data.model';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
// import {TableType} from '../../../models/table.model';
import {DialogMode} from '../../../enums/dialog';
import {SourceDataDialogComponent} from '../containers/source-data-dialog/source-data-dialog.component';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

export interface DialogData { mode: DialogMode, entity?: AppSourceData, extra?: any }

@Injectable({providedIn: 'root'})
export class SourceDataService extends BaseEntityService<
  RadarSourceData,
  AppSourceData
> {

  override resourceUrl = 'api/source-data';
  // type = TableType.GET_WITH_QUERY;

  constructor(
    http: HttpClient,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    super(http);
  }

  override toAppModel(entity: RadarSourceData): AppSourceData {
    return {
      ...entity,
      name: entity.sourceDataName
    };
  }

  override openDialog(dialogData: DialogData) {
    const dialogRef = this.getDialogRef(dialogData);

    const dialogActionSubscription =
      dialogRef.componentInstance.actionTriggered.subscribe({
        next: ({action, entity}: { action: DialogMode | string; entity: any }) => {
          console.log('Class: SourceDataService, Function: next, Line 44 action' , action);
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

  onSuccess(dialogRef: MatDialogRef<any>, entity: AppSourceData): void {
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
    console.log('Class: SourceDataService, Function: onError, Line 97 ' , );
    dialogRef.componentInstance.errorHappened(error);
  }

  getDialogRef(data: DialogData): MatDialogRef<SourceDataDialogComponent> {
    return this.dialog.open(SourceDataDialogComponent,
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


