import {Component, inject} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';

import {Validator} from '../../../../../../shared/utils/validators';
import {AppClient} from "../../models/client";
import {TranslatePipe} from "@ngx-translate/core";
import {MatError, MatFormField, MatHint, MatInput, MatSuffix} from "@angular/material/input";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton} from "@angular/material/button";
import {DialogMode} from '../../../../../base-entities/enums/dialog';
import {DialogTitleComponent} from '../../../../../base-entities/containers/entity-dialog/dialog-title/dialog-title.component';
import {
  DialogBodyDescriptionComponent
} from '../../../../../base-entities/containers/entity-dialog/dialog-body-description/dialog-body-description.component';
import {DialogActionsComponent} from '../../../../../base-entities/containers/entity-dialog/dialog-actions/dialog-actions.component';
import {ClientConfigService} from '../../services/client-config.service';
import {BaseEntityDialogComponent} from '../../../../../base-entities/containers/entity-dialog/base-entity-dialog.component';
import {Observable} from 'rxjs';
import {ErrorMessageBoxComponent} from '../../../../../../shared/components/message-box/error-message-box.component';
import {DurationPipe} from '../../../../../../shared/pipes/duration.pipe';

@Component({
  selector: 'app-client-dialog',
  templateUrl: './client-dialog.component.html',
  imports: [
    DialogTitleComponent,
    MatDialogContent,
    DialogBodyDescriptionComponent,
    TranslatePipe,
    ReactiveFormsModule,
    DialogActionsComponent,
    MatCheckbox,
    MatFormField,
    MatError,
    MatInput,
    MatHint,
    MatSlideToggle,
    MatButton,
    MatSuffix,
    ErrorMessageBoxComponent,
    DurationPipe
  ]
})
export class ClientDialogComponent extends BaseEntityDialogComponent<AppClient> {
  override configService = inject(ClientConfigService);
  override dialogRef = inject(MatDialogRef<ClientDialogComponent>);
  override dialogData = inject(MAT_DIALOG_DATA) as {
    mode: DialogMode;
    entity: AppClient;
    clientFullList: Observable<AppClient[]>;
  };

  override formFields = this.configService.getFormFields();

  override form = new FormGroup({
    clientId: new FormControl<string>(
      {value: '', disabled: this.dialogData.mode !== DialogMode.ADD},
      {nonNullable: true, validators: [Validator.requiredValidator, Validator.stringIdValidator]}
    ),
    enableEmptySecret: new FormControl<boolean>(false),
    clientSecret: new FormControl<string>(''),
    scope: new FormControl<string[]>([], {validators: [Validator.requiredValidator]}),
    resourceIds: new FormControl<string[]>([], {nonNullable: true, validators: [Validator.requiredValidator]}),
    _authorizedGrantTypes: new FormGroup({
        refresh_token: new FormControl<boolean>(false),
        password: new FormControl<boolean>(false),
        authorization_code: new FormControl<boolean>(false),
        client_credentials: new FormControl<boolean>(false),
        implicit: new FormControl<boolean>(false),
      },
    ),
    registeredRedirectUri: new FormControl<string[]>([]),
    autoApproveScopes: new FormControl<string[]>([]),
    accessTokenValiditySeconds: new FormControl<number | null>(
      null, {validators: [Validator.requiredValidator]}
    ),
    refreshTokenValiditySeconds: new FormControl<number | null>(
      null, {validators: [Validator.requiredValidator]}
    ),
    additionalInformation: new FormGroup({
      dynamic_registration: new FormControl<boolean>(false),
    })
  });

  clientFullList: AppClient[] = [];

  override ngOnInit() {
    this.dialogData.clientFullList.subscribe(clients => {
      this.clientFullList = clients;
      this.form.controls.clientId.addValidators(this.duplicateValidator);
    });

    super.ngOnInit();

    this.form.controls.enableEmptySecret?.valueChanges.subscribe((value) => {
      this.form.controls.clientSecret?.setValidators(
        value ? null : Validator.requiredValidator
      );
      this.form.controls.clientSecret?.updateValueAndValidity();
    });
  }

  override handleSaveAction(): void {
    this.dialogActionEvent.emit({
      action: this.dialogData.mode,
      entity: {...this.dialogData.entity, ...this.form.value},
    });
  }

  override handleDeleteAction(): void {
    this.dialogActionEvent.emit({action: this.dialogData.mode, entity: this.dialogData.entity});
  }

  generateRandomSecret(length: number) {
    const text = [];
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text.push(possible.charAt(Math.floor(Math.random() * possible.length)));
    }
    this.form?.patchValue({
      clientSecret: text.join(''),
    });
  }

  private duplicateValidator = (control: AbstractControl) => {
    return this.clientFullList.find(
      (entity) =>
        control.value === entity.clientId &&
        this.dialogData.entity?.clientId !== entity.clientId
    )
      ? { duplicate: true }
      : null;
  };
}
