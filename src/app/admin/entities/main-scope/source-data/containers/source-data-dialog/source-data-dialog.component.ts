import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {AppSourceData, ProcessingState} from "../../models/source-data";
import {MatOption} from "@angular/material/core";
import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {TranslatePipe} from '@ngx-translate/core';
import {MatSelect} from '@angular/material/select';
import {
  MatSelectAutocompleteComponent
} from '../../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import {Validator} from '../../../../../../shared/utils/validators';
import {DialogMode} from '../../../../../base-entities/enums/dialog';
import {AppSourceType, RadarSourceType} from '../../../source-type/models/source-type';
import {SourceDataConfigService} from '../../services/source-data-config.service';
import {DialogTitleComponent} from '../../../../../base-entities/containers/entity-dialog/dialog-title/dialog-title.component';
import {
  DialogBodyDescriptionComponent
} from '../../../../../base-entities/containers/entity-dialog/dialog-body-description/dialog-body-description.component';
import {
  DialogActionsComponent
} from '../../../../../base-entities/containers/entity-dialog/dialog-actions/dialog-actions.component';
import {BaseEntityDialogComponent} from '../../../../../base-entities/containers/entity-dialog/base-entity-dialog.component';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {ErrorMessageBoxComponent} from '../../../../../../shared/components/message-box/error-message-box.component';

@Component({
  selector: 'app-source-data-dialog',
  templateUrl: './source-data-dialog.component.html',
  imports: [
    DialogTitleComponent,
    MatDialogContent,
    DialogBodyDescriptionComponent,
    ReactiveFormsModule,
    MatFormField,
    TranslatePipe,
    MatInput,
    MatSelectAutocompleteComponent,
    MatSelect,
    MatOption,
    DialogActionsComponent,
    MatError,
    AsyncPipe,
    ErrorMessageBoxComponent,
  ]
})
export class SourceDataDialogComponent extends BaseEntityDialogComponent<AppSourceData> implements OnInit, AfterViewInit {
  protected readonly ProcessingState = ProcessingState;

  override configService = inject(SourceDataConfigService);
  override dialogRef = inject(MatDialogRef<SourceDataDialogComponent>);
  override dialogData = inject(MAT_DIALOG_DATA) as {
    mode: DialogMode;
    entity: AppSourceData;
    sourceTypeFullList: Observable<AppSourceType[]>;
  };

  override formFields = this.configService.getFormFields();

  override form = new FormGroup({
    id: new FormControl<string | number>({ value: '', disabled: true }, {nonNullable: true}),
    sourceDataType: new FormControl<string | null>('', {
      validators: [Validator.requiredValidator, Validator.normalTextValidator]
    }),
    sourceType: new FormControl<RadarSourceType | null>(null, {validators: [Validator.requiredValidator]}),
    sourceDataName: new FormControl<string>('', {nonNullable: true, validators: [Validator.requiredValidator]}),
    processingState: new FormControl<ProcessingState | null>(null),
    topic: new FormControl<string>(''),
    keySchema: new FormControl<string>(''),
    valueSchema: new FormControl<string>(''),
    frequency: new FormControl<string>(''),
    unit: new FormControl<string>(''),
  });

  // sourceTypesOptions: RadarOption[] = (this.dialogData.sourceTypeFullList as AppSourceType[]).sort((a, b) =>
  //   a._name.localeCompare(b._name)
  // );

  ngOnInit() {
    super.init();
  }

  ngAfterViewInit() {
    super.afterViewInit();
  }

  protected override handleSaveAction(): void {
    this.dialogActionEvent.emit({
      action: this.dialogData.mode,
      entity: {...this.dialogData.entity, ...this.form.value},
    });
  }

  protected override handleDeleteAction(): void {
    this.dialogActionEvent.emit({action: this.dialogData.mode, entity: this.dialogData.entity});
  }
}
