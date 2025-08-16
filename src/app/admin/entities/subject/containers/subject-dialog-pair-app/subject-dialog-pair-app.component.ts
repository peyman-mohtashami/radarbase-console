import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';


import { ClientPairService } from '../../../client/services/client-pair.service';
import { BaseDialogComponent } from '../../../../components/base-dialog/base-dialog.component';
import { AppSubject } from "../../models/subject";
import { AppClient } from "../../../client/models/client";
import {PROPERTIES} from "../../config";
import {QrCodeModule} from "ng-qrcode";
import {
  DialogBodyDescriptionComponent
} from "../../../../components/base-dialog/dialog-body-description/dialog-body-description.component";
import {DetailElementComponent} from "../../../../components/base-details/detail-element/detail-element.component";
import {TranslatePipe} from "@ngx-translate/core";
import {DatePipe} from "@angular/common";
import {DhmsPipe} from "../../../../pipes/dhms.pipe";
import {
  MatSelectAutocompleteComponent
} from "../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component";
import {SubjectDetailsComponent} from "../../components/subject-details/subject-details.component";
import {ErrorMessageComponent} from "../../../../../core/error/components/message/error-message.component";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {RadarPairInfo} from '../../../../../shared/models/radar-client.model';

@Component({
  selector: 'rb-subject-dialog-pair-app',
  templateUrl: './subject-dialog-pair-app.component.html',
  imports: [
    MatDialogContent,
    QrCodeModule,
    DialogBodyDescriptionComponent,
    DetailElementComponent,
    TranslatePipe,
    DatePipe,
    DhmsPipe,
    MatSelectAutocompleteComponent,
    ReactiveFormsModule,
    SubjectDetailsComponent,
    ErrorMessageComponent,
    MatDialogClose,
    MatButton,
    MatIcon,
    MatProgressSpinner,
    MatIconButton,
    MatDialogTitle
  ]
})
export class SubjectDialogPairAppComponent
  extends BaseDialogComponent<AppSubject, SubjectDialogPairAppComponent>
  implements OnInit, OnDestroy
{
  override form = new FormGroup({
    id: new FormControl({ value: undefined, disabled: true }),
    login: new FormControl({ value: undefined, disabled: true }),
    client: new FormControl<AppClient | undefined>(undefined),
  });

  clients; // = this.data.clients;

  pairInfo?: RadarPairInfo;

  constructor(
    router: Router,
    dialogRef: MatDialogRef<SubjectDialogPairAppComponent>,
    @Inject(MAT_DIALOG_DATA)
    public override data: {
      mode: string;
      entity: AppSubject;
      // projects: RadarProjectDef[];
      // projectName: string;
      clients: AppClient[];
    },
    private clientPairService: ClientPairService
  ) {
    super(router, dialogRef, data);
    this.clients = this.data.clients;
  }

  override ngOnInit() {
    super.ngOnInit();
    this.clients = this.clients.filter(
      (c) =>
        c.additionalInformation?.['dynamic_registration'] &&
        c.additionalInformation?.['dynamic_registration']
          .toString()
          .toLowerCase() === 'true'
    );
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }

  // override initForm(): void {
  //   console.log(this.entity);
  //   this.form = this.fb.group({
  //     id: [{ value: this.entity ? this.entity.id : undefined, disabled: true }],
  //     login: [
  //       { value: this.entity ? this.entity.login : undefined, disabled: true },
  //     ],
  //     client: [null],
  //   });
  // }

  generateQRCode(persistent: boolean) {
    const client = this.form.controls.client.value;
    if (!client) {
      return;
    }
    this.clientPairService
      .get(client, this.entity, persistent)
      .pipe(
        tap(() => {
          // delete old value
          if (this.pairInfo && this.pairInfo.tokenName) {
            this.deleteToken(this.pairInfo.tokenName);
          }
        })
      )
      .subscribe((pairInfo) => (this.pairInfo = pairInfo));
  }

  private deleteToken(tokenName: string): Subscription {
    return this.clientPairService.delete(tokenName).subscribe((deleteRes) => {
      if (!deleteRes.ok) {
        console.log(
          'Failed to delete stale MetaToken: ' +
            JSON.stringify(deleteRes.json())
        );
      }
    });
  }

  protected readonly parseInt = parseInt;
  protected readonly PROPERTIES = PROPERTIES;
}
