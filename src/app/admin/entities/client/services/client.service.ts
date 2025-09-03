import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

import { BaseEntityService } from '../../../services/base.entity.service';
import {AppClient} from "../models/client";
import {RadarClient} from '../../../../shared/models/radar-client.model';
import {DialogMode} from '../../../enums/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AppSourceData} from '../../source-data/models/source-data';
// import {TableType} from '../../../models/table.model';
import {SourceDataDialogComponent} from '../../source-data/containers/source-data-dialog/source-data-dialog.component';
import {DialogData} from '../../source-data/services/source-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientDialogComponent} from '../containers/client-dialog/client-dialog.component';

@Injectable({ providedIn: 'root' })
export class ClientService extends BaseEntityService<
  RadarClient,
  AppClient
> {
  public override resourceUrl = 'api/oauth-clients';
  // type = TableType.GET_WITH_QUERY;

  constructor(
    http: HttpClient,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    super(http);
  }

  override toAppModel(entity: RadarClient): AppClient {
    return {
      ...entity,
      id: entity.clientId,
      name: entity.clientId,
      formAuthorizedGrantTypes: entity.authorizedGrantTypes?.reduce(
        (a: any, c: string) => {
          a[c] = true;
          return a;
        },
        {}
      ),
      additionalInformation: {
        dynamic_registration:
          entity.additionalInformation?.['dynamic_registration'] === 'true',
      },
    };
  }

  override toRadarModel(entity: AppClient): RadarClient {
    // delete entity.id;
    // delete entity.formAuthorizedGrantTypes;
    return {
      ...entity,
      authorizedGrantTypes: Object.keys(entity.formAuthorizedGrantTypes).filter(
        (k) => entity.formAuthorizedGrantTypes[k]
      ),
      // formAuthorizedGrantTypes: undefined,
      // id: undefined,
      scope: this.customSplit(entity?.scope),
      resourceIds: this.customSplit(entity?.resourceIds),
      autoApproveScopes: this.customSplit(entity?.autoApproveScopes),
      registeredRedirectUri: this.customSplit(entity?.registeredRedirectUri),
    };
  }

  customSplit(str?: string | string[], token = ',') {
    // if (!token) {
    //   token = ',';
    // }
    if (!str) {
      return [];
    }
    if (Array.isArray(str)) {
      return str;
    }
    return str.split(token);
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
      dialogActionSubscription.unsubscribe();
    });
  }

  onSuccess(dialogRef: MatDialogRef<any>, entity: AppClient): void {
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

  getDialogRef(data: DialogData): MatDialogRef<ClientDialogComponent> {
    return this.dialog.open(ClientDialogComponent,
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
