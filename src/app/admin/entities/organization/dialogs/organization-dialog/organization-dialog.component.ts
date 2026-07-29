import {Component, inject, signal, AfterViewInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {AppOrganization, CreateOrganizationDto, UpdateOrganizationDto} from "../../models/organization";
import {MatError, MatFormField, MatHint, MatInput} from "@angular/material/input";
import {TranslatePipe} from "@ngx-translate/core";
import {DialogMode} from '../../../../base-entities/enums/dialog';
import {OrganizationConfigService} from '../../services/organization-config.service';
import {
  DialogAction,
} from '../../../../base-entities/containers/entity-dialog/dialog-actions/dialog-actions.component';
import {ErrorMessageBoxComponent} from '../../../../../shared/components/message-box/error-message-box.component';
import {form, FormField, validate} from '@angular/forms/signals';
import {longTextField, normalTextField, requiredField} from '../../../../../shared/utils/signal-form-validators';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {OrganizationStore} from '../../services/organization.store';
import {ActivatedRoute, Router} from '@angular/router';
import {JsonPipe} from '@angular/common';
import {animateDialogIn, animateDialogOut} from '../../../../shared/utils/dialog.util';

export interface OrganizationForm {
  id: string;
  name: string;
  description: string;
  location: string;
}

@Component({
  selector: 'app-organization-dialog',
  templateUrl: './organization-dialog.component.html',
  imports: [
    MatDialogContent,
    MatFormField,
    MatInput,
    TranslatePipe,
    MatHint,
    MatError,
    MatFormField,
    ErrorMessageBoxComponent,
    MatDialogTitle,
    FormField,
    MatButton,
    MatIcon,
    MatProgressSpinner,
    MatDialogActions,
    JsonPipe,
  ]
})
export class OrganizationDialogComponent implements AfterViewInit {
  protected readonly DialogMode = DialogMode;
  protected readonly DialogAction = DialogAction;

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
  };

  protected formFields = this.configService.getFormFields();

  private model = signal<OrganizationForm>({
    ...this.dialogData.entity,
    id: `${this.dialogData.entity?.id}`,
    name: this.dialogData.entity?.name ?? '',
    location: this.dialogData.entity?.location ?? '',
    description: this.dialogData.entity?.description ?? '',
  });

  protected form = form(this.model, (schema) => {
    requiredField(schema.name);
    normalTextField(schema.name);
    validate(schema.name, ({value}) => {
      const matchedOrganization = this.dialogData.organizationFullList?.find((organization) => organization.name === value());
      if (!matchedOrganization) return null;
      if (this.dialogData.entity?.name === value()) return null;
      return {
        kind: 'duplicate',
        message: 'SHARED.validatorError.duplicateName',
      };
    });
    longTextField(schema.description);
    normalTextField(schema.location);
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

  toCreateDtoModel(model: OrganizationForm): CreateOrganizationDto {
    return {
      ...model,
    };
  }

  toUpdateDtoModel(model: OrganizationForm): UpdateOrganizationDto {
    return {
      ...model,
      id: Number(model.id),
    };
  }
}
