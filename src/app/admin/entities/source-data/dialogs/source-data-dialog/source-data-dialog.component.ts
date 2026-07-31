import {
  Component,
  inject,
  AfterViewInit, signal, effect
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {
  AppSourceData,
  CreateSourceDataDto, PROCESSING_STATE,
  toProcessingState,
  UpdateSourceDataDto
} from "../../models/source-data";
import {MatOption} from "@angular/material/core";
import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {TranslatePipe} from '@ngx-translate/core';
import {MatSelect} from '@angular/material/select';
import {DialogMode} from '../../../../base-entities/enums/dialog';
import {AppSourceType} from '../../../source-type/models/source-type';
import {SourceDataConfigService} from '../../services/source-data-config.service';
import {JsonPipe} from '@angular/common';
import {ErrorMessageBoxComponent} from '../../../../../shared/components/message-box/error-message-box.component';
import {LocaleService} from '../../../../../core/locale/services/locale.service';
import {ActivatedRoute, Router} from '@angular/router';
import {animateDialogIn, animateDialogOut} from '../../../../shared/utils/dialog.util';
import {SourceDataStore} from '../../services/source-data.store';
import {form, FormField} from '@angular/forms/signals';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatButton} from '@angular/material/button';
import {getLastSegment} from '../../../../shared/utils/route.util';
import {normalTextField, requiredField} from '../../../../../shared/utils/signal-form-validators';
import {
  SearchableMultiSelectComponent
} from '../../../../../shared/components/searchable-multi-select/searchable-multi-select';

export interface SourceDataForm {
  id: string;
  sourceDataType: string,
  sourceDataName: string;
  sourceType: string;
  processingState: string,
  topic: string,
  keySchema: string,
  valueSchema: string,
  frequency: string,
  unit: string,
}

export interface StoredSourceDataDialog {
  mode: DialogMode;
  entity?: AppSourceData;
  model: SourceDataForm;
}

@Component({
  selector: 'app-source-data-dialog',
  templateUrl: './source-data-dialog.component.html',
  imports: [
    MatDialogContent,
    MatFormField,
    TranslatePipe,
    MatInput,
    MatSelect,
    MatOption,
    MatError,
    ErrorMessageBoxComponent,
    MatDialogTitle,
    MatDialogActions,
    JsonPipe,
    MatIcon,
    MatProgressSpinner,
    MatButton,
    FormField,
    SearchableMultiSelectComponent,
  ]
})
export class SourceDataDialogComponent implements AfterViewInit {
  protected readonly DialogMode = DialogMode;
  protected readonly PROCESSING_STATE = PROCESSING_STATE;

  protected localeService = inject(LocaleService);
  protected store = inject(SourceDataStore);
  protected configService = inject(SourceDataConfigService);
  private dialogRef = inject(MatDialogRef<SourceDataDialogComponent>);
  private router = inject(Router);
  protected activatedRoute = inject(ActivatedRoute);

  tableFields = this.configService.getTableFields();
  extraFields = this.configService.getExtraFields();

  protected dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: DialogMode;
    entity?: AppSourceData;
    sourceTypeFullList: AppSourceType[];
    restoredModel?: SourceDataForm;
  };

  formFields = this.configService.getFormFields();

  private model = signal<SourceDataForm>(this.dialogData.restoredModel ?? {
    ...this.dialogData.entity,
    id: `${this.dialogData.entity?.id ?? ''}`,
    sourceDataType: this.dialogData.entity?.sourceDataType ?? '',
    sourceDataName: this.dialogData.entity?.sourceDataName ?? '',
    sourceType: `${this.dialogData.entity?.sourceType?.id ?? ''}`,
    processingState: this.dialogData.entity?.processingState ?? '',
    topic: this.dialogData.entity?.topic ?? '',
    keySchema: this.dialogData.entity?.keySchema ?? '',
    valueSchema: this.dialogData.entity?.valueSchema ?? '',
    frequency: this.dialogData.entity?.frequency ?? '',
    unit: this.dialogData.entity?.unit ?? '',
  });

  protected form = form(this.model, (schema) => {
    normalTextField(schema.sourceDataType);
    requiredField(schema.sourceType);
    requiredField(schema.sourceDataName);
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
    switch(this.dialogData.mode) {
      case DialogMode.ADD:
        await this.store.add(this.toCreateDtoModel(this.model()));
        break;
      case DialogMode.EDIT:
        await this.store.update(this.toUpdateDtoModel(this.model()));
        break;
    }

    if (this.store.error()) return;

    this.configService.clearDialogState();
    this.dialogRef.close();
    this.navigateOnUpdateSuccess(this.model());
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

  navigateOnUpdateSuccess(model: SourceDataForm) {
    const selectedSourceData = this.store.selected();
    if (!selectedSourceData) return;

    const urlTree = this.router.parseUrl(this.router.url);
    this.router.navigate(['./admin/source-data', model.sourceDataName, getLastSegment(urlTree)], {queryParams: urlTree.queryParams}).then();
  }

  navigateOnDeleteSuccess() {
    this.router.navigate(['/admin/source-data'], {queryParamsHandling: 'preserve'}).then();
  }

  toCreateDtoModel(model: SourceDataForm): CreateSourceDataDto {
    return {
      ...model,
      processingState: toProcessingState(model.processingState),
      sourceType: this.dialogData.sourceTypeFullList.find(sourceType => `${sourceType.id}` === model.sourceType),
    };
  }

  toUpdateDtoModel(model: SourceDataForm): UpdateSourceDataDto {
    return {
      ...model,
      id: Number(model.id),
      processingState: toProcessingState(model.processingState),//ProcessingState.RAW,
      sourceType: this.dialogData.sourceTypeFullList.find(sourceType => `${sourceType.id}` === model.sourceType),
    };
  }
}
