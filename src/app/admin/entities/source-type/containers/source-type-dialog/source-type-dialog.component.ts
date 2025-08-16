import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';

import { Validator } from '../../../../../shared/utils/validators';
import { BaseDialogComponent } from '../../../../components/base-dialog/base-dialog.component';
import { AppSourceType } from "../../models/source-type";
import {ENTITY_NAME} from "../../../../enums/entities";
import {Store} from "@ngrx/store";
import {DialogTitleComponent} from "../../../../components/base-dialog/dialog-title/dialog-title.component";
import {
  DialogBodyDescriptionComponent
} from "../../../../components/base-dialog/dialog-body-description/dialog-body-description.component";
import {TranslatePipe} from "@ngx-translate/core";
import {MatError, MatFormField, MatHint, MatInput} from "@angular/material/input";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {ErrorMessageComponent} from "../../../../../core/error/components/message/error-message.component";
import {DialogActionsComponent} from "../../../../components/base-dialog/dialog-actions/dialog-actions.component";
import {MatLabel, MatSelect} from "@angular/material/select";
import {MatOption} from "@angular/material/core";

@Component({
  selector: 'rb-source-type-dialog',
  templateUrl: './source-type-dialog.component.html',
  imports: [
    DialogTitleComponent,
    MatDialogContent,
    DialogBodyDescriptionComponent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    TranslatePipe,
    MatInput,
    MatError,
    NgIf,
    MatSelect,
    MatOption,
    MatSlideToggle,
    ErrorMessageComponent,
    DialogActionsComponent,
    AsyncPipe,
    MatHint
  ]
})
export class SourceTypeDialogComponent
  extends BaseDialogComponent<AppSourceType, SourceTypeDialogComponent>
  implements OnInit
{
  override name = ENTITY_NAME.sourceType;

  override form = new FormGroup({
    id: new FormControl({ value: undefined, disabled: true }),
    producer: new FormControl("", [Validator.requiredValidator, Validator.normalTextValidator]),
    model: new FormControl("", [Validator.requiredValidator, Validator.normalTextValidator]),
    catalogVersion: new FormControl("", [Validator.requiredValidator, Validator.normalTextValidator]),
    sourceTypeScope: new FormControl("", [Validator.requiredValidator]),
    canRegisterDynamically: new FormControl(false),
    name: new FormControl(""),
    description: new FormControl("", [Validator.longTextValidator]),
    assessmentType: new FormControl(""),
    appProvider: new FormControl(""),
  });

  entities; // = this.data.entities;

  constructor(
    router: Router,
    dialogRef: MatDialogRef<SourceTypeDialogComponent>,
    store: Store,
    @Inject(MAT_DIALOG_DATA)
    public override data: {
      entity: AppSourceType;
      entities: AppSourceType[];
      mode: string;
    }
  ) {
    super(router, dialogRef, data, store);
    this.entities = this.data.entities;
  }

  override ngOnInit() {
    super.ngOnInit();
  }


  //! sourcetype with exact duplicate producer & model & version
  private duplicateProducerValidator = (control: AbstractControl) => {
    if (
      this.entities.find(
        (entity) =>
          entity.producer === control.value &&
          entity.model === this.form?.value.model &&
          entity.catalogVersion === this.form?.value.catalogVersion &&
          this.entity?.producer !== entity.producer &&
          this.entity?.model !== entity.model &&
          this.entity?.catalogVersion !== entity.catalogVersion
      )
    ) {
      return { duplicate: true };
    }
    return null;
  };

  private duplicateModelValidator = (control: AbstractControl) => {
    if (
      this.entities.find(
        (entity) =>
          entity.producer === this.form?.value.producer &&
          entity.model === control.value &&
          entity.catalogVersion === this.form?.value.catalogVersion &&
          this.entity?.producer !== entity.producer &&
          this.entity?.model !== entity.model &&
          this.entity?.catalogVersion !== entity.catalogVersion
      )
    ) {
      return { duplicate: true };
    }
    return null;
  };

  private duplicateCatalogVersionValidator = (control: AbstractControl) => {
    if (
      this.entities.find(
        (entity) =>
          entity.producer === this.form?.value.producer &&
          entity.model === this.form?.value.model &&
          entity.catalogVersion === control.value &&
          this.entity?.producer !== entity.producer &&
          this.entity?.model !== entity.model &&
          this.entity?.catalogVersion !== entity.catalogVersion
      )
    ) {
      return { duplicate: true };
    }
    return null;
  };
}
