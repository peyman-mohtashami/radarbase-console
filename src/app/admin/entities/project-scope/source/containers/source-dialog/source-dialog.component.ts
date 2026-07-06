import {
  Component,
  inject,
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';

import {Validator} from '../../../../../../shared/utils/validators';
import {
  MatSelectAutocompleteComponent,
} from '../../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import {TranslatePipe} from "@ngx-translate/core";
import {MatError, MatFormField, MatInput} from "@angular/material/input";
import {SourceConfigService} from '../../services/source-config.service';
import {SourceDialogService} from '../../services/source-dialog.service';
import {DialogMode} from '../../../../../base-entities/enums/dialog';
import {AppSource} from '../../models/source';
import {AppSourceType, RadarSourceType} from '../../../../main-scope/source-type/models/source-type';
import {DialogActionsComponent} from '../../../../../base-entities/containers/entity-dialog/dialog-actions/dialog-actions.component';
import {BaseEntityDialogComponent} from '../../../../../base-entities/containers/entity-dialog/base-entity-dialog.component';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {ErrorMessageBoxComponent} from '../../../../../../shared/components/message-box/error-message-box.component';
import {AppProject} from '../../../../main-scope/project/models/project';

@Component({
  selector: 'app-source-dialog',
  templateUrl: './source-dialog.component.html',
  imports: [
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    TranslatePipe,
    MatInput,
    MatError,
    MatSelectAutocompleteComponent,
    DialogActionsComponent,
    AsyncPipe,
    ErrorMessageBoxComponent,
    MatDialogTitle,
  ]
})
export class SourceDialogComponent extends BaseEntityDialogComponent<AppSource> {
  override configService = inject(SourceConfigService);
  override dialogRef = inject(MatDialogRef<SourceDialogService>);
  override dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: DialogMode;
    entity?: AppSource;
    project: AppProject;
    sourceTypeFullList: Observable<AppSourceType[]>;
  };

  override formFields = this.configService.getFormFields();

  override form = new FormGroup({
    id: new FormControl<string | number | undefined>({ value: undefined, disabled: true }, {nonNullable: true}),
    sourceId: new FormControl<string | undefined>({value: undefined, disabled: true}, {nonNullable: true}),
    sourceName: new FormControl<string | undefined>("", {nonNullable: true, validators: [Validator.requiredValidator, Validator.normalTextValidator]}),
    expectedSourceName: new FormControl<string | undefined>("", {nonNullable: true}),
    sourceType: new FormControl<RadarSourceType | undefined>(undefined, {nonNullable: true, validators: [Validator.requiredValidator]}),
    attributes: new FormGroup({
      "External-identifier": new FormControl<string | undefined>(undefined, {nonNullable: true, validators: [Validator.normalTextValidator]}),
    }),
  });

  override handleSaveAction(): void {
    this.dialogActionEvent.emit({
      action: this.dialogData.mode,
      entity: {
        ...(this.dialogData.entity ?? ({} as AppSource)),
        ...(this.form.getRawValue() as Partial<AppSource>),
        project: this.dialogData.project
      } as AppSource,
    });
  }

  // override handleDeleteAction(): void {
  //   this.dialogActionEvent.emit({action: this.dialogData.mode, entity: this.dialogData.entity});
  // }

  // private duplicateValidator = (control: AbstractControl) => {
  //   return this.dialogData.entities?.find(
  //     (entity) =>
  //       control.value === entity.name && this.dialogData.entity?.name !== entity.name
  //   )
  //     ? { duplicate: true }
  //     : null;
  // };
}
