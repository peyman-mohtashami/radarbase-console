import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';

import { Validator } from '../../../../../shared/utils/validators';
import { BaseDialogComponent } from '../../../../components/base-dialog/base-dialog.component';
import {
  MatSelectAutocompleteComponent,
  RadarOption
} from '../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import { AppSource } from "../../models/source";
import { AppSourceType } from "../../../source-type/models/source-type";
import {ENTITY_NAME} from "../../../../enums/entities";
import {DialogTitleComponent} from "../../../../components/base-dialog/dialog-title/dialog-title.component";
import {
  DialogBodyDescriptionComponent
} from "../../../../components/base-dialog/dialog-body-description/dialog-body-description.component";
import {SourceDetailsComponent} from "../../components/source-details/source-details.component";
import {TranslatePipe} from "@ngx-translate/core";
import {MatError, MatFormField, MatInput} from "@angular/material/input";
import {AsyncPipe, NgIf} from "@angular/common";
import {ErrorMessageComponent} from "../../../../../core/error/components/message/error-message.component";
import {DialogActionsComponent} from "../../../../components/base-dialog/dialog-actions/dialog-actions.component";
import {MatLabel} from "@angular/material/select";

@Component({
  selector: 'rb-source-dialog',
  templateUrl: './source-dialog.component.html',
  imports: [
    DialogTitleComponent,
    MatDialogContent,
    DialogBodyDescriptionComponent,
    SourceDetailsComponent,
    ReactiveFormsModule,
    MatFormField,
    TranslatePipe,
    MatLabel,
    MatInput,
    MatError,
    NgIf,
    MatSelectAutocompleteComponent,
    ErrorMessageComponent,
    DialogActionsComponent,
    AsyncPipe
  ]
})
export class SourceDialogComponent
  extends BaseDialogComponent<AppSource, SourceDialogComponent>
  implements OnInit, OnDestroy
{
  override name = ENTITY_NAME.source;

  override form = new FormGroup({
    id: new FormControl({ value: undefined, disabled: true }),
    sourceId: new FormControl({value: undefined, disabled: true}),
    sourceName: new FormControl("", [Validator.requiredValidator, Validator.normalTextValidator]),
    expectedSourceName: new FormControl(""),
    sourceType: new FormControl("", [Validator.requiredValidator]),
    attributes: new FormGroup({
      "External-identifier": new FormControl<string | null>(null, [Validator.normalTextValidator]),
    }),
  });

  sourceTypesOptions: RadarOption[];

  constructor(
    router: Router,
    dialogRef: MatDialogRef<SourceDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public override data: {
      mode: string;
      entity: AppSource;
      sourceTypes: AppSourceType[];
    }
  ) {
    super(router, dialogRef, data);
    this.sourceTypesOptions = this.data.sourceTypes.sort(
      (a, b) => a.name.localeCompare(b.name)
    );
  }
}
