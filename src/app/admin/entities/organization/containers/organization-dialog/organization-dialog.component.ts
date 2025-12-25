import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';

import {Validator} from '../../../../../shared/utils/validators';
import { AppOrganization } from "../../models/organization";
import {MatError, MatFormField, MatHint, MatInput} from "@angular/material/input";
import {TranslatePipe} from "@ngx-translate/core";
import {DialogMode} from '../../../../base-entities/enums/dialog';
import {OrganizationConfigService} from '../../services/organization-config.service';
import {DialogTitleComponent} from '../../../../base-entities/containers/entity-dialog/dialog-title/dialog-title.component';
import {
  DialogBodyDescriptionComponent
} from '../../../../base-entities/containers/entity-dialog/dialog-body-description/dialog-body-description.component';
import {
  DialogActionsComponent
} from '../../../../base-entities/containers/entity-dialog/dialog-actions/dialog-actions.component';
import {ErrorMessageBoxComponent} from '../../../../../shared/components/message-box/error-message-box.component';
import {BaseEntityDialogComponent} from '../../../../base-entities/containers/entity-dialog/base-entity-dialog.component';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-organization-dialog',
  templateUrl: './organization-dialog.component.html',
  imports: [
    DialogTitleComponent,
    MatDialogContent,
    DialogBodyDescriptionComponent,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    TranslatePipe,
    MatHint,
    MatError,
    MatFormField,
    DialogActionsComponent,
    DialogActionsComponent,
    ErrorMessageBoxComponent,
  ]
})
export class OrganizationDialogComponent extends BaseEntityDialogComponent<AppOrganization> implements OnInit, AfterViewInit {
  override configService = inject(OrganizationConfigService);
  override dialogRef = inject(MatDialogRef<OrganizationDialogComponent>);
  override dialogData = inject(MAT_DIALOG_DATA) as {
    mode: DialogMode;
    entity: AppOrganization;
    organizationFullList: Observable<AppOrganization[]>;
  };

  override formFields = this.configService.getFormFields();

  override form = new FormGroup({
    id: new FormControl<string | number>({value: "", disabled: true}, {nonNullable: true}),
    name: new FormControl<string>("", {nonNullable: true, validators: [Validator.requiredValidator, Validator.normalTextValidator]}),
    description: new FormControl<string>("", {validators: [Validator.longTextValidator]}),
    location: new FormControl<string>("", {validators: [Validator.normalTextValidator]}),
  });

  organizations: AppOrganization[] = [];

  ngOnInit() {
    this.dialogData.organizationFullList.subscribe(organizations => {
      this.organizations = organizations;
      this.form.controls.name.addValidators(this.duplicateValidator);
    });
    super.init();
  }

  ngAfterViewInit() {
    super.afterViewInit();
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

  private duplicateValidator = (control: AbstractControl) => {
    return this.organizations.find(
      (entity) =>
        control.value === entity.name && this.dialogData.entity?.name !== entity.name
    )
      ? { duplicate: true }
      : null;
  };
}
