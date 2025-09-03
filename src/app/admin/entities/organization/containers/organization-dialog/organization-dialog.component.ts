import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';

import { Validator } from '../../../../../shared/utils/validators';
import { BaseDialogComponent } from '../../../../base/base-dialog.component';
import { AppOrganization } from "../../models/organization";
import {ENTITY_NAME} from "../../../../enums/entities";
import {DialogTitleComponent} from "../../../../components/base-dialog/dialog-title/dialog-title.component";
import {
  DialogBodyDescriptionComponent
} from "../../../../components/base-dialog/dialog-body-description/dialog-body-description.component";
import {OrganizationDetailsComponent} from "../../components/organization-details/organization-details.component";
import {MatError, MatFormField, MatHint, MatInput} from "@angular/material/input";
import {TranslatePipe} from "@ngx-translate/core";
import {AsyncPipe} from "@angular/common";
import {ErrorMessageComponent} from "../../../../../core/error/components/message/error-message.component";
import {DialogActionsComponent} from "../../../../components/base-dialog/dialog-actions/dialog-actions.component";
import {MatLabel} from "@angular/material/select";
import {Store} from "@ngrx/store";

@Component({
  selector: 'rb-organization-dialog',
  templateUrl: './organization-dialog.component.html',
  imports: [
    DialogTitleComponent,
    MatDialogContent,
    DialogBodyDescriptionComponent,
    OrganizationDetailsComponent,
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    TranslatePipe,
    MatHint,
    MatError,
    MatFormField,
    ErrorMessageComponent,
    DialogActionsComponent,
    AsyncPipe,
  ]
})
export class OrganizationDialogComponent
  extends BaseDialogComponent<AppOrganization, OrganizationDialogComponent>
  implements OnInit
{
  override name = ENTITY_NAME.organization;

  override form = new FormGroup({
    id: new FormControl({value: "", disabled: true}),
    name: new FormControl("", [Validator.requiredValidator, Validator.normalTextValidator],),
    description: new FormControl(""),// , []), //[Validator.requiredValidator, Validator.longTextValidator],),
    location: new FormControl(""),//, [])//[Validator.requiredValidator, Validator.normalTextValidator],),
  });

  entities; // = this.data.entities;

  constructor(
    router: Router,
    dialogRef: MatDialogRef<OrganizationDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public override data: {
      entity: AppOrganization;
      entities: AppOrganization[];
      mode: string;
    },
    store: Store,
  ) {
    super(router, dialogRef, data, store);
    this.entities = this.data.entities;
  }

  override ngOnInit() {
    super.ngOnInit();
    this.form.controls.name?.addValidators(this.duplicateValidator);
  }

  private duplicateValidator = (control: AbstractControl) => {
    console.log('Class: OrganizationDialogComponent, Function: duplicateValidator, Line 81 ' , );
    return this.entities?.find(
      (entity) =>
        control.value === entity.name && this.entity?.name !== entity.name
    )
      ? { duplicate: true }
      : null;
  };
}
