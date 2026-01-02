import {
  Component,
  inject,
  signal
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import {AppSubject} from "../../models/subject";
import {AppClient, RadarPairInfo} from "../../../../main-scope/client/models/client";
import {QrCodeComponent} from "ng-qrcode";
import {TranslatePipe} from "@ngx-translate/core";
import {AsyncPipe, DatePipe} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {SubjectConfigService} from '../../services/subject-config.service';
import {SubjectDialogMode} from '../../enums/dialog';
import {catchError, map, switchMap} from 'rxjs/operators';
import {MatFormField, MatOption, MatSelect} from '@angular/material/select';
import {Observable, of} from 'rxjs';
import {SubjectDetailsComponent} from '../../components/subject-details/subject-details.component';
import {ClientService} from '../../../../main-scope/client/services/client.service';
import {DetailType} from '../../../../../base-entities/enums/detail-type';
import {
  DialogBodyDescriptionComponent
} from '../../../../../base-entities/containers/entity-dialog/dialog-body-description/dialog-body-description.component';
import {
  DetailElementComponent
} from '../../../../../base-entities/components/entity-details/detail-element/detail-element.component';
import {DurationPipe} from '../../../../../../shared/pipes/duration.pipe';
import {
  DialogTitleComponent
} from '../../../../../base-entities/containers/entity-dialog/dialog-title/dialog-title.component';
import {ErrorMessageBoxComponent} from '../../../../../../shared/components/message-box/error-message-box.component';
import {
  BaseEntityDialogComponent
} from '../../../../../base-entities/containers/entity-dialog/base-entity-dialog.component';

@Component({
  selector: 'app-subject-dialog-pair-app',
  templateUrl: './subject-dialog-pair-app.component.html',
  imports: [
    MatDialogContent,
    DialogBodyDescriptionComponent,
    DetailElementComponent,
    TranslatePipe,
    DatePipe,
    ReactiveFormsModule,
    MatButton,
    MatIcon,
    MatProgressSpinner,
    MatIconButton,
    MatFormField,
    MatSelect,
    MatOption,
    SubjectDetailsComponent,
    AsyncPipe,
    QrCodeComponent,
    DurationPipe,
    DialogTitleComponent,
    ErrorMessageBoxComponent
  ]
})
export class SubjectDialogPairAppComponent extends BaseEntityDialogComponent<AppSubject> {
  override configService = inject(SubjectConfigService);
  override dialogRef = inject(MatDialogRef<SubjectDialogPairAppComponent>);
  override dialogData = inject(MAT_DIALOG_DATA) as {
    mode: SubjectDialogMode;
    entity: AppSubject;
    clientFullList: Observable<AppClient[]>;
  };
  private clientService = inject(ClientService);

  protected readonly DetailType = DetailType;
  protected readonly SubjectDialogMode = SubjectDialogMode;
  private readonly printBodyClass = 'print-dialog-only';

  pairInfo = signal<RadarPairInfo | undefined>(undefined)

  override form = new FormGroup({
    id: new FormControl<string | number | undefined>({value: undefined, disabled: true}, {nonNullable: true}),
    login: new FormControl<string | undefined>({value: undefined, disabled: true}, {nonNullable: true}),
    client: new FormControl<AppClient | undefined>(undefined, {nonNullable: true}),
  });

  override ngOnInit() {
    super.ngOnInit();
    document.body.classList.add(this.printBodyClass);
  }

  generateQRCode(persistent: boolean) {
    const client = this.form.controls.client.value;
    if (!client) {
      return;
    }
    this.clientService.getClientPairInfo(client, this.dialogData.entity, persistent).pipe(
      switchMap((newPairInfo: RadarPairInfo | undefined) => {
        const oldPairInfo = this.pairInfo();

        if (oldPairInfo?.tokenName) {
          return this.clientService.deletePairInfoToken(oldPairInfo.tokenName).pipe(
            catchError(() => of(null)),
            map(() => newPairInfo)
          );
        }

        return of(newPairInfo);
      })
    ).subscribe((pairInfo: RadarPairInfo | undefined) => this.pairInfo.set(pairInfo));
  }


  override ngOnDestroy(): void {
    document.body.classList.remove(this.printBodyClass);
  }

  print(): void {
    window.print();
  }
}
