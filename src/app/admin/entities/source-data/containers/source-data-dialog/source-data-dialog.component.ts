import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';

import { Validator } from '../../../../../shared/utils/validators';
import { BaseDialogComponent } from '../../../../components/base-dialog/base-dialog.component';
import {
  MatSelectAutocompleteComponent,
  RadarOption
} from '../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import { AppSourceData } from "../../models/source-data";
import { AppSourceType } from "../../../source-type/models/source-type";
import {ENTITY_NAME} from "../../../../enums/entities";
import {DialogTitleComponent} from "../../../../components/base-dialog/dialog-title/dialog-title.component";
import {
  DialogBodyDescriptionComponent
} from "../../../../components/base-dialog/dialog-body-description/dialog-body-description.component";
import {TranslatePipe} from "@ngx-translate/core";
import {MatFormField, MatInput} from "@angular/material/input";
import {AsyncPipe, NgIf} from "@angular/common";
import {ErrorMessageComponent} from "../../../../../core/error/components/message/error-message.component";
import {DialogActionsComponent} from "../../../../components/base-dialog/dialog-actions/dialog-actions.component";
import {MatLabel, MatSelect} from "@angular/material/select";
import {MatOption} from "@angular/material/core";
import {MatError} from "@angular/material/form-field";
import {ProcessingState} from '../../../../../shared/models/radar-source-data.model';

@Component({
  selector: 'rb-source-data-dialog',
  templateUrl: './source-data-dialog.component.html',
  imports: [
    DialogTitleComponent,
    MatDialogContent,
    DialogBodyDescriptionComponent,
    ReactiveFormsModule,
    MatFormField,
    TranslatePipe,
    MatLabel,
    MatInput,
    NgIf,
    MatSelectAutocompleteComponent,
    MatSelect,
    MatOption,
    ErrorMessageComponent,
    DialogActionsComponent, MatError, AsyncPipe
  ]
})
export class SourceDataDialogComponent extends BaseDialogComponent<
  AppSourceData,
  SourceDataDialogComponent
> {
  override name = ENTITY_NAME.sourceData;

  override form = new FormGroup({
    id: new FormControl({ value: undefined, disabled: true }),
    sourceDataType: new FormControl("",[Validator.requiredValidator, Validator.normalTextValidator]),
    sourceType: new FormControl("", [Validator.requiredValidator]),
    sourceDataName: new FormControl("",[Validator.requiredValidator]),
    processingState: new FormControl(""),
    topic: new FormControl(""),
    keySchema: new FormControl(""),
    valueSchema: new FormControl(""),
    frequency: new FormControl(""),
    unit: new FormControl(""),
  });

  ProcessingState = ProcessingState;

  sourceTypesOptions: RadarOption[];
  // = this.data.sourceTypes.sort((a, b) =>
  //   a.name.localeCompare(b.name)
  // );

  constructor(
    router: Router,
    dialogRef: MatDialogRef<SourceDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public override data: {
      mode: string;
      entity: AppSourceData;
      sourceTypes: AppSourceType[];
    }
  ) {
    super(router, dialogRef, data);
    this.sourceTypesOptions = this.data.sourceTypes.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }
}
