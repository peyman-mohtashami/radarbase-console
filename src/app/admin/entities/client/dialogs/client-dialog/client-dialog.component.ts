import {Component, inject, AfterViewInit, signal} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';

import {AppClient, CreateClientDto, UpdateClientDto} from "../../models/client";
import {TranslatePipe} from "@ngx-translate/core";
import {MatError, MatFormField, MatInput, MatSuffix} from "@angular/material/input";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton} from "@angular/material/button";
import {DialogMode} from '../../../../base-entities/enums/dialog';
import {
  DialogAction,
  DialogActionsComponent
} from '../../../../base-entities/containers/entity-dialog/dialog-actions/dialog-actions.component';
import {ClientConfigService} from '../../services/client-config.service';
import {ErrorMessageBoxComponent} from '../../../../../shared/components/message-box/error-message-box.component';
import {DurationPipe} from '../../../../../shared/pipes/duration.pipe';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientStore} from '../../services/client.store';
import {animateDialogIn, animateDialogOut} from '../../../../shared/utils/dialog.util';
import {applyWhen, form, FormField, validate} from '@angular/forms/signals';
import {requiredField} from '../../../../../shared/utils/signal-form-validators';
import {JsonPipe} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

export interface ClientForm {
  id: string;
  name: string;
  description: string;
  location: string;
  clientId: string;
  enableEmptySecret: boolean;
  clientSecret: string;
  scope: string;
  resourceIds: string;
  _authorizedGrantTypes: Record<string, boolean>;
// {
//     refresh_token: boolean;
//     password: boolean;
//     authorization_code: boolean;
//     client_credentials: boolean;
//     implicit: boolean
//   };
  registeredRedirectUri: string;
  autoApproveScopes: string;
  accessTokenValiditySeconds: string;
  refreshTokenValiditySeconds: string;
  _dynamic_registration: boolean
}


@Component({
  selector: 'app-client-dialog',
  templateUrl: './client-dialog.component.html',
  imports: [
    MatDialogContent,
    TranslatePipe,
    ReactiveFormsModule,
    DialogActionsComponent,
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
  protected readonly DialogAction = DialogAction;

  protected store = inject(ClientStore);
  private configService = inject(ClientConfigService);
  private dialogRef = inject(MatDialogRef<ClientDialogComponent>);
  private router = inject(Router);
  protected activatedRoute = inject(ActivatedRoute);

  protected dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: DialogMode;
    entity: AppClient | undefined;
    clientFullList: AppClient[];
  };

  protected formFields = this.configService.getFormFields();

  protected model = signal<ClientForm>({
    _authorizedGrantTypes: {
      authorization_code: false,
      client_credentials: false,
      implicit: false,
      password: false,
      refresh_token: false
    },
    _dynamic_registration: false,
    accessTokenValiditySeconds: '',
    autoApproveScopes: '',
    clientId: '',
    clientSecret: '',
    description: '',
    enableEmptySecret: false,
    id: '',
    location: '',
    name: '',
    refreshTokenValiditySeconds: '',
    registeredRedirectUri: '',
    resourceIds: '',
    scope: ''
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

  ngAfterViewInit() {
    animateDialogIn(this.dialogData.id);
  }

  async onAction($event: DialogAction) {
    switch ($event) {
      case DialogAction.CLOSE:
        this.close();
        break;
      case DialogAction.DELETE:
        await this.handleDeleteAction();
        break;
      case DialogAction.SAVE:
        await this.handleSaveAction();
        break;
    }
  }

  protected async handleSaveAction(): Promise<void> {
    this.configService.setLatestFormEntry(this.model());

    if (this.dialogData.mode === DialogMode.ADD) {
      await this.store.add(this.toCreateDtoModel(this.model()));
    } else if (this.dialogData.mode === DialogMode.EDIT) {
      await this.store.update(this.toUpdateDtoModel(this.model()));
    }

    if (this.store.error()) return;

    this.configService.setLatestFormEntry(null);
    this.dialogRef.close();
    this.navigateOnUpdateSuccess(this.model().name);
  }

  protected async handleDeleteAction(): Promise<void> {
    await this.store.delete(this.dialogData.entity!);
    this.configService.setLatestFormEntry(null);
    this.dialogRef.close();
    this.navigateOnDeleteSuccess();
  }



  close() {
    animateDialogOut(this.dialogData.id, this.dialogRef);
  }

  navigateOnUpdateSuccess(entityName: string) {
    const selectedOrganization = this.store.selected();
    if (!selectedOrganization) return;



    const urlTree = this.router.parseUrl(this.router.url);
    const primaryRoute = urlTree.root.children['primary'];

    if (!primaryRoute) {
      return;
    }

    const segments = primaryRoute.segments.map(segment => segment.path);
    const organizationsIndex = segments.indexOf('organizations');
    const organizationNameIndex = organizationsIndex + 1;

    const hasOrganizationNameInUrl =
      organizationsIndex !== -1 &&
      organizationNameIndex < segments.length;

    if (!hasOrganizationNameInUrl) {
      return;
    }

    segments[organizationNameIndex] = entityName;

    this.router.navigate(segments, {queryParams: urlTree.queryParams}).then();
  }

  navigateOnDeleteSuccess() {
    this.router.navigate(['/admin/organizations'], { queryParamsHandling: 'preserve' }).then();
  }

  toCreateDtoModel(model: ClientForm): CreateClientDto {
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

  toUpdateDtoModel(model: ClientForm): UpdateClientDto {
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

  protected readonly Number = Number;
}
