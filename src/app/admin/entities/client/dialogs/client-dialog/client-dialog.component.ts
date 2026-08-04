import {Component, inject, AfterViewInit, signal, effect} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';

import {AppClient, ClientDto, CreateClientDto, UpdateClientDto} from "../../models/client";
import {TranslatePipe} from "@ngx-translate/core";
import {MatError, MatFormField, MatInput, MatSuffix} from "@angular/material/input";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton} from "@angular/material/button";
import {DialogMode} from '../../../../shared/enums/dialog';
import {ClientConfigService} from '../../services/client-config.service';
import {ErrorMessageBoxComponent} from '../../../../../shared/components/message-box/error-message-box.component';
import {DurationPipe} from '../../../../../shared/pipes/duration.pipe';
import {Router} from '@angular/router';
import {ClientStore} from '../../services/client.store';
import {animateDialogIn, animateDialogOut} from '../../../../shared/utils/dialog.util';
import {applyWhen, form, FormField, validate} from '@angular/forms/signals';
import {requiredField} from '../../../../../shared/utils/signal-form-validators';
import {JsonPipe} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {getLastSegment} from '../../../../shared/utils/route.util';

export interface ClientForm {
  clientId: string;
  enableEmptySecret: boolean;
  clientSecret: string;
  scope: string;
  resourceIds: string;
  _authorizedGrantTypes: Record<string, boolean>;
  registeredRedirectUri: string;
  autoApproveScopes: string;
  accessTokenValiditySeconds: string;
  refreshTokenValiditySeconds: string;
  _dynamic_registration: boolean
}

export interface StoredClientDialog {
  mode: DialogMode;
  entity?: AppClient;
  model: ClientForm;
}

@Component({
  selector: 'app-client-dialog',
  templateUrl: './client-dialog.component.html',
  imports: [
    MatDialogContent,
    TranslatePipe,
    ReactiveFormsModule,
    MatCheckbox,
    MatFormField,
    MatError,
    MatInput,
    MatSlideToggle,
    MatButton,
    MatSuffix,
    ErrorMessageBoxComponent,
    DurationPipe,
    MatDialogTitle,
    MatDialogActions,
    JsonPipe,
    MatIcon,
    MatProgressSpinner,
    FormField
  ]
})
export class ClientDialogComponent implements AfterViewInit {
  protected readonly DialogMode = DialogMode;
  protected readonly Number = Number;

  protected store = inject(ClientStore);
  private configService = inject(ClientConfigService);
  private dialogRef = inject(MatDialogRef<ClientDialogComponent>);
  private router = inject(Router);

  protected dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: DialogMode;
    entity?: AppClient;
    clientFullList: AppClient[];
    restoredModel?: ClientForm;
  };

  protected formFields = this.configService.getFormFields();

  protected model = signal<ClientForm>(this.dialogData.restoredModel ?? {
    ...this.dialogData.entity,
    clientId: this.dialogData.entity?.clientId ?? '',
    enableEmptySecret: false,
    clientSecret: '',
    resourceIds: this.dialogData.entity?.resourceIds.join(', ') ?? '',
    scope: this.dialogData.entity?.scope?.join(', ') ?? '',
    registeredRedirectUri: this.dialogData.entity?.registeredRedirectUri?.join(', ') ?? '',
    accessTokenValiditySeconds: this.dialogData.entity?.accessTokenValiditySeconds?.toString() ?? '',
    refreshTokenValiditySeconds: this.dialogData.entity?.refreshTokenValiditySeconds?.toString() ?? '',
    autoApproveScopes: this.dialogData.entity?.autoApproveScopes?.join(', ') ?? '',
    _dynamic_registration: this.dialogData.entity?._dynamic_registration ?? false,
    _authorizedGrantTypes: {
      authorization_code: this.dialogData.entity?._authorizedGrantTypes?.['authorization_code'] ?? false,
      client_credentials: this.dialogData.entity?._authorizedGrantTypes?.['client_credentials'] ?? false,
      implicit: this.dialogData.entity?._authorizedGrantTypes?.['implicit'] ?? false,
      password: this.dialogData.entity?._authorizedGrantTypes?.['password'] ?? false,
      refresh_token: this.dialogData.entity?._authorizedGrantTypes?.['refresh_token'] ?? false
    },
  });

  protected form = form(this.model, (schema) => {
    requiredField(schema.clientId);
    validate(schema.clientId, ({value}) => {
      const matchedClient = this.dialogData.clientFullList?.find((client) => client.name === value());
      if (!matchedClient) return null;
      if (this.dialogData.entity?.name === value()) return null;
      return {
        kind: 'duplicate',
        message: 'SHARED.validatorError.duplicateName',
      };
    });
    applyWhen(
      schema,
      ({valueOf}) => !valueOf(schema.enableEmptySecret),
      (schema) => {
        requiredField(schema.clientSecret);
      },
    );
    requiredField(schema.scope);
    requiredField(schema.resourceIds);
    requiredField(schema.accessTokenValiditySeconds);
    requiredField(schema.refreshTokenValiditySeconds);
  });

  constructor() {
    effect(() => {
      const model = this.model();
      if (this.dialogData.mode === DialogMode.ADD || this.dialogData.mode === DialogMode.EDIT) {
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

  protected async save(): Promise<void> {
    switch(this.dialogData.mode) {
      case DialogMode.ADD:
        await this.store.add(this.toCreateDtoModel(this.model()));
        break;
      case DialogMode.EDIT:
        await this.store.update(this.toUpdateDtoModel(this.model()));
        break;
    }

    if (this.store.error()) return;

    this.configService.clearDialogState();
    this.dialogRef.close();
    this.navigateOnUpdateSuccess(this.model());
  }

  protected async delete(): Promise<void> {
    await this.store.delete(this.dialogData.entity!);
    this.configService.clearDialogState();
    this.dialogRef.close();
    this.navigateOnDeleteSuccess();
  }

  private navigateOnUpdateSuccess(model: ClientForm) {
    const selectedClient = this.store.selected();
    if (!selectedClient) return;

    const urlTree = this.router.parseUrl(this.router.url);
    this.router.navigate(['./admin/clients', model.clientId, getLastSegment(urlTree)], {queryParams: urlTree.queryParams}).then();
  }

  private navigateOnDeleteSuccess() {
    this.router.navigate(['/admin/clients'], { queryParamsHandling: 'preserve' }).then();
  }

  private toCreateDtoModel(model: ClientForm): CreateClientDto {
    return this.toDtoModel(model);
  }

  private toUpdateDtoModel(model: ClientForm): UpdateClientDto {
    return this.toDtoModel(model);
  }

  private toDtoModel(model: ClientForm): ClientDto {
    return {
      ...model,
      additionalInformation: model._dynamic_registration ? {dynamic_registration: true} : {dynamic_registration: false},
      authorizedGrantTypes: Object.keys(model._authorizedGrantTypes ?? {}).filter(
        (k) => model._authorizedGrantTypes[k] ?? false
      ),
      scope: model.scope.split(',').map((s) => s.trim()),
      resourceIds: model.resourceIds.split(',').map((s) => s.trim()),
      autoApproveScopes: model.autoApproveScopes.split(',').map((s) => s.trim()),
      accessTokenValiditySeconds: Number(model.accessTokenValiditySeconds),
      refreshTokenValiditySeconds: Number(model.refreshTokenValiditySeconds),
      registeredRedirectUri: model.registeredRedirectUri.split(',').map((s) => s.trim()),
    };
  }

  generateRandomSecret(length: number) {
    const text: string[] = [];
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text.push(possible.charAt(Math.floor(Math.random() * possible.length)));
    }
    this.model.update(value => ({...value, clientSecret: text.join('')}));
  }
}
