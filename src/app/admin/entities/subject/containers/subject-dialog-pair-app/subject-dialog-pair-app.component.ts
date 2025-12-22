import {
  AfterViewInit,
  Component,
  effect,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';


import { AppSubject } from "../../models/subject";
import {AppClient, RadarPairInfo} from "../../../client/models/client";
import {QrCodeComponent, QrCodeModule} from "ng-qrcode";
import {TranslatePipe} from "@ngx-translate/core";
import {AsyncPipe, DatePipe} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {SubjectConfigService} from '../../services/subject-config.service';
import {SubjectDialogMode} from '../../enums/dialog';
import {HttpErrorResponse} from '@angular/common/http';
import {toSignal} from '@angular/core/rxjs-interop';
import {debounceTime, map, tap} from 'rxjs/operators';
import {MatFormField, MatOption, MatSelect} from '@angular/material/select';
import {ClientPairService} from '../../../client/services/client-pair.service';
import {Observable} from 'rxjs';
import {SubjectDetailsComponent} from '../../components/subject-details/subject-details.component';
import {ClientService} from '../../../client/services/client.service';
import {DetailType} from '../../../../enums/detail-type';
import {
  DialogBodyDescriptionComponent
} from '../../../../components/dialog/dialog-body-description/dialog-body-description.component';
import {DhmsPipe} from '../../../../../shared/pipes/dhms.pipe';
import {DetailElementComponent} from '../../../../components/detail-element/detail-element.component';

@Component({
  selector: 'app-subject-dialog-pair-app',
  templateUrl: './subject-dialog-pair-app.component.html',
  imports: [
    MatDialogContent,
    DialogBodyDescriptionComponent,
    DetailElementComponent,
    TranslatePipe,
    DatePipe,
    DhmsPipe,
    ReactiveFormsModule,
    MatDialogClose,
    MatButton,
    MatIcon,
    MatProgressSpinner,
    MatIconButton,
    MatDialogTitle,
    MatFormField,
    MatSelect,
    MatOption,
    SubjectDetailsComponent,
    AsyncPipe,
    QrCodeComponent
  ]
})
export class SubjectDialogPairAppComponent implements OnInit, AfterViewInit {
  private configService = inject(SubjectConfigService);
  private dialogRef = inject(MatDialogRef<SubjectDialogPairAppComponent>);
  public dialogData = inject(MAT_DIALOG_DATA) as {
    mode: SubjectDialogMode;
    entity: AppSubject;
    clientFullList: Observable<AppClient[]>;
  };
  private clientService = inject(ClientService);
  private clientPairService = inject(ClientPairService);

  protected readonly DialogMode = SubjectDialogMode;

  formFields = this.configService.getFormFields();
  tableFields = this.configService.getTableFields();

  clients$: Observable<AppClient[]> = this.clientService.getWithQuery().pipe(
    map(clients => clients.filter(c => c.additionalInformation?.['dynamic_registration'] && c.additionalInformation?.['dynamic_registration'] === 'true'))
  )

  pairInfo = signal<RadarPairInfo | undefined>(undefined)

  form = new FormGroup({
    id: new FormControl<string | number | undefined>({ value: undefined, disabled: true }, {nonNullable: true}),
    login: new FormControl<string | undefined>({ value: undefined, disabled: true }, {nonNullable: true}),
    client: new FormControl<AppClient | undefined>(undefined, {nonNullable: true}),
  });

  loading = signal(false);
  error = signal<HttpErrorResponse | null>(null);

  @Output()
  dialogActionEvent = new EventEmitter<{ action: SubjectDialogMode, entity?: AppSubject }>();

  private readonly formValueChanges = toSignal(
    this.form.valueChanges.pipe(debounceTime(300)),
    {initialValue: this.form.getRawValue()}
  );

  constructor() {
    effect(() => {
      if (this.formValueChanges()) {
        this.error.set(null);
      }
    });
  }

  ngOnInit() {
    // this.client$ =
    //
    // this.clients = this.dialogData.clients.filter(
    //   (c) =>
    //     c.additionalInformation?.['dynamic_registration'] &&
    //     c.additionalInformation?.['dynamic_registration']
    //       .toString()
    //       .toLowerCase() === 'true'
    // ) //.map(c => ({id: c.clientId, _name: c._name}));
    this.form.patchValue(this.dialogData.entity);
  }

  ngAfterViewInit() {
    const dialogContainer = document.querySelector('.tailwind-slide-panel');
    setTimeout(() => {
      dialogContainer?.classList.add('dialog-enter-active');
    });
  }

  close() {
    this.loading.set(false);
    const container = document.querySelector('.tailwind-slide-panel');
    container?.classList.remove('dialog-enter-active');
    container?.classList.add('dialog-exit-active');

    setTimeout(() => {
      this.dialogActionEvent.emit({action: SubjectDialogMode.CLOSE});
      this.dialogRef.close();
    }, 300);
  }

  errorHappened(error: HttpErrorResponse): void {
    this.loading.set(false);
    this.error.set(error);
  }

  generateQRCode(persistent: boolean) {
    const client = this.form.controls.client.value;
    if (!client) {
      return;
    }
    this.clientPairService.get(client, this.dialogData.entity, persistent)
      .pipe(
        tap(() => {
          // delete old value
          const pairInfo = this.pairInfo();
          if (pairInfo && pairInfo.tokenName) {
            this.deleteToken(pairInfo.tokenName);
          }
        })
      )
      .subscribe((pairInfo: RadarPairInfo | undefined) => (this.pairInfo.set(pairInfo)));
  }

  private deleteToken(tokenName: string) {
    this.clientPairService.delete(tokenName).subscribe((deleteRes: any) => {
      if (!deleteRes.ok) {
        console.log(
          'Failed to delete stale MetaToken: ' +
            JSON.stringify(deleteRes.json())
        );
      }
    });
  }

  protected readonly DetailType = DetailType;
}
