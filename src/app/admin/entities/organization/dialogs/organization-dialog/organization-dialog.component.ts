import {Component, inject, signal, effect, AfterViewInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {AppOrganization, CreateOrganizationDto, UpdateOrganizationDto} from "../../models/organization";
import {TranslatePipe} from "@ngx-translate/core";
import {DialogMode} from '../../../../shared/enums/dialog';
import {OrganizationConfigService} from '../../services/organization-config.service';
import {ErrorMessageBoxComponent} from '../../../../../shared/components/message-box/error-message-box.component';
import {form} from '@angular/forms/signals';
import {
  longTextField,
  normalTextField,
  requiredField,
  validateDuplicate
} from '../../../../../shared/utils/signal-form-validators';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {OrganizationStore} from '../../services/organization.store';
import {ActivatedRoute, Router} from '@angular/router';
import {JsonPipe} from '@angular/common';
import {animateDialogIn, animateDialogOut} from '../../../../shared/utils/dialog.util';
import {getLastSegment} from '../../../../shared/utils/route.util';
import {
  InputFormFieldComponent
} from '../../../../shared/components/app-form-fields/input-form-field/input-form-field.component';
import {
  TextareaFormFieldComponent
} from '../../../../shared/components/app-form-fields/textarea-form-field/textarea-form-field.component';

export interface OrganizationForm {
  id: string;
  name: string;
  description: string;
  location: string;
}

export interface StoredOrganizationDialog {
  mode: DialogMode;
  entity?: AppOrganization;
  model: OrganizationForm;
}

@Component({
  selector: 'app-organization-dialog',
  templateUrl: './organization-dialog.component.html',
  imports: [
    MatDialogContent,
    TranslatePipe,
    ErrorMessageBoxComponent,
    MatDialogTitle,
    MatButton,
    MatIcon,
    MatProgressSpinner,
    MatDialogActions,
    JsonPipe,
    InputFormFieldComponent,
    TextareaFormFieldComponent,
  ]
})
export class OrganizationDialogComponent implements AfterViewInit {
  protected readonly DialogMode = DialogMode;

  protected store = inject(OrganizationStore);
  private configService = inject(OrganizationConfigService);
  private dialogRef = inject(MatDialogRef<OrganizationDialogComponent>);
  private router = inject(Router);
  protected activatedRoute = inject(ActivatedRoute);

  protected dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: DialogMode;
    entity: AppOrganization | undefined;
    organizationFullList: AppOrganization[];
    restoredModel?: OrganizationForm;
  };

  protected formFields = this.configService.getFormFields();

  private model = signal<OrganizationForm>(this.dialogData.restoredModel ?? {
    ...this.dialogData.entity,
    id: `${this.dialogData.entity?.id ?? ''}`,
    name: this.dialogData.entity?.name ?? '',
    location: this.dialogData.entity?.location ?? '',
    description: this.dialogData.entity?.description ?? '',
  });

  protected form = form(this.model, (schema) => {
    requiredField(schema.name);
    normalTextField(schema.name);
    validateDuplicate(schema.name, this.dialogData.organizationFullList, this.dialogData.entity, 'name');
    longTextField(schema.description);
    normalTextField(schema.location);
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

  protected async save(): Promise<void> {
    if (this.dialogData.mode === DialogMode.ADD) {
      await this.store.add(this.toCreateDtoModel(this.model()));
    } else if (this.dialogData.mode === DialogMode.EDIT) {
      await this.store.update(this.toUpdateDtoModel(this.model()));
    }

    if (this.store.error()) return;

    this.configService.clearDialogState();
    this.dialogRef.close();
    this.navigateOnUpdateSuccess(this.model().name);
  }

  protected async delete(): Promise<void> {
    await this.store.delete(this.dialogData.entity!);
    this.configService.clearDialogState();
    this.dialogRef.close();
    this.navigateOnDeleteSuccess();
  }

  close() {
    this.configService.clearDialogState();
    animateDialogOut(this.dialogData.id, this.dialogRef);
  }

  navigateOnUpdateSuccess(entityName: string) {
    const selectedOrganization = this.store.selected();
    if (!selectedOrganization) return;

    const urlTree = this.router.parseUrl(this.router.url);
    this.router.navigate(
      [
        './admin/organizations',
        entityName,
        getLastSegment(urlTree)
      ],
      {queryParams: urlTree.queryParams}
    ).then();
  }

  navigateOnDeleteSuccess() {
    this.router.navigate(['/admin/organizations'], {queryParamsHandling: 'preserve'}).then();
  }

  toCreateDtoModel(model: OrganizationForm): CreateOrganizationDto {
    return {
      name: model.name,
      description: model.description,
      location: model.location,
    };
  }

  toUpdateDtoModel(model: OrganizationForm): UpdateOrganizationDto {
    return {
      id: Number(model.id),
      name: model.name,
      description: model.description,
      location: model.location,
    };
  }
}
