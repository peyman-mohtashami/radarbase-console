import {
  Component,
  inject,
  signal,
  AfterViewInit, effect, OnInit, OnDestroy
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef, MatDialogTitle,
} from '@angular/material/dialog';
import {AppSubject} from "../../models/subject";
import {AppClient, RadarPairInfo} from "../../../client/models/client";
import {QrCodeComponent} from "ng-qrcode";
import {TranslatePipe} from "@ngx-translate/core";
import {DatePipe, JsonPipe} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {SubjectConfigService} from '../../services/subject-config.service';
import {SubjectDialogMode} from '../../enums/dialog';
import {MatFormField, MatOption, MatSelect} from '@angular/material/select';
import {SubjectDetailsComponent} from '../../components/subject-details/subject-details.component';
import {DetailType} from '../../../../shared/enums/detail-type';
import {
  DetailElementComponent
} from '../../../../shared/components/detail-element/detail-element.component';
import {DurationPipe} from '../../../../../shared/pipes/duration.pipe';
import {ErrorMessageBoxComponent} from '../../../../../shared/components/message-box/error-message-box.component';
import {animateDialogIn, animateDialogOut} from '../../../../shared/utils/dialog.util';
import {form, FormField} from '@angular/forms/signals';
import {ClientStore} from '../../../client/services/client.store';

export interface PairAppForm {
  id: string;
  login: string,
  client: string;
}

export interface StoredPairAppDialog {
  mode: SubjectDialogMode;
  entity?: AppSubject;
  model: PairAppForm;
}

@Component({
  selector: 'app-subject-dialog-pair-app',
  templateUrl: './subject-dialog-pair-app.component.html',
  imports: [
    MatDialogContent,
    DetailElementComponent,
    TranslatePipe,
    DatePipe,
    MatButton,
    MatIcon,
    MatProgressSpinner,
    MatIconButton,
    MatFormField,
    MatSelect,
    MatOption,
    SubjectDetailsComponent,
    QrCodeComponent,
    DurationPipe,
    ErrorMessageBoxComponent,
    MatDialogTitle,
    FormField,
    JsonPipe
  ]
})
export class SubjectDialogPairAppComponent implements OnInit, AfterViewInit, OnDestroy {
  protected readonly SubjectDialogMode = SubjectDialogMode;
  protected readonly DetailType = DetailType;
  private readonly printBodyClass = 'print-dialog-only';

  protected store = inject(ClientStore);
  protected configService = inject(SubjectConfigService);
  private dialogRef = inject(MatDialogRef<SubjectDialogPairAppComponent>);
  protected dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: SubjectDialogMode;
    entity: AppSubject;
    clientFullList: AppClient[];
    restoredModel?: PairAppForm;
  };

  formFields = this.configService.getFormFields();

  private model = signal<PairAppForm>(this.dialogData.restoredModel ?? {
    ...this.dialogData.entity,
    id: `${this.dialogData.entity?.id ?? ''}`,
    login: this.dialogData.entity?.login ?? '',
    client: '',
  });

  protected form = form(this.model);

  pairInfo = signal<RadarPairInfo | undefined>(undefined)


  constructor() {
    effect(() => {
      const model = this.model();
      if (this.dialogData.mode === SubjectDialogMode.ADD || this.dialogData.mode === SubjectDialogMode.EDIT) {
        this.configService.setDialogState({
          mode: this.dialogData.mode,
          entity: this.dialogData.entity,
          model,
        });
      }
    });
  }

  ngAfterViewInit() {
    animateDialogIn(this.dialogData.id);
  }

  close() {
    this.configService.clearDialogState();
    animateDialogOut(this.dialogData.id, this.dialogRef);
  }

  ngOnInit() {
    document.body.classList.add(this.printBodyClass);
  }

  async generateQRCode(persistent: boolean) {
    const clientId = this.model().client;
    const client = this.dialogData.clientFullList.find((c) => c.id === clientId);
    if (!client) {
      return;
    }

    const pairInfo = await this.store.getClientPairInfo(client, this.dialogData.entity, persistent);
    if (!pairInfo) return;

    const oldPairInfo = this.pairInfo();
    if (oldPairInfo?.tokenName) {
      await this.store.deletePairInfoToken(oldPairInfo.tokenName);
    }
    this.pairInfo.set(pairInfo);
  }


  ngOnDestroy(): void {
    document.body.classList.remove(this.printBodyClass);
  }

  print(): void {
    window.print();
  }
}
