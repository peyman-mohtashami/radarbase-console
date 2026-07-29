import {
  Component,
  inject,
  ChangeDetectionStrategy, AfterViewInit, signal
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {AppSourceData, CreateSourceDataDto, ProcessingState, UpdateSourceDataDto} from "../../models/source-data";
import {MatOption} from "@angular/material/core";
import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {TranslatePipe} from '@ngx-translate/core';
import {MatSelect} from '@angular/material/select';
import {
  MatSelectAutocompleteAdapter,
  MatSelectAutocompleteComponent
} from '../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import {Validator} from '../../../../../shared/utils/validators';
import {DialogMode} from '../../../../base-entities/enums/dialog';
import {AppSourceType, SourceTypeDto} from '../../../source-type/models/source-type';
import {SourceDataConfigService} from '../../services/source-data-config.service';
import {
  DialogAction,
  DialogActionsComponent
} from '../../../../base-entities/containers/entity-dialog/dialog-actions/dialog-actions.component';
import {BaseEntityDialogComponent} from '../../../../base-entities/containers/entity-dialog/base-entity-dialog.component';
import {Observable} from 'rxjs';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {ErrorMessageBoxComponent} from '../../../../../shared/components/message-box/error-message-box.component';
import {LocaleService} from '../../../../../core/locale/services/locale.service';
import {ActivatedRoute, Router} from '@angular/router';
import {animateDialogIn, animateDialogOut} from '../../../../shared/utils/dialog.util';
import {SourceDataStore} from '../../services/source-data.store';
import {form, FormField} from '@angular/forms/signals';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatButton} from '@angular/material/button';

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


@Component({
  selector: 'app-source-data-dialog',
  templateUrl: './source-data-dialog.component.html',
  imports: [
    MatDialogContent,
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
    MatDialogTitle,
    MatDialogActions,
    JsonPipe,
    MatIcon,
    MatProgressSpinner,
    MatButton,
    FormField,
  ]
})
export class SourceDataDialogComponent implements AfterViewInit {
  protected readonly DialogMode = DialogMode;
  protected readonly DialogAction = DialogAction;

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
  };

  formFields = this.configService.getFormFields();

  private model = signal<SourceDataForm>({
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

  protected form = form(this.model);
//   id: new FormControl<string | number>({ value: '', disabled: true }, {nonNullable: true}),
// sourceDataType: new FormControl<string | null>('', {
//   validators: [Validator.requiredValidator, Validator.normalTextValidator]
// }),
//   sourceType: new FormControl<SourceTypeDto | null>(null, {validators: [Validator.requiredValidator]}),
//   sourceDataName: new FormControl<string>('', {nonNullable: true, validators: [Validator.requiredValidator]}),
//   processingState: new FormControl<ProcessingState | null>(null),
//   topic: new FormControl<string>(''),
//   keySchema: new FormControl<string>(''),
//   valueSchema: new FormControl<string>(''),
//   frequency: new FormControl<string>(''),
//   unit: new FormControl<string>(''),

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
    this.navigateOnUpdateSuccess(this.model().sourceDataName);
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
    this.router.navigate(['/admin/organizations'], {queryParamsHandling: 'preserve'}).then();
  }

  toCreateDtoModel(model: SourceDataForm): CreateSourceDataDto {
    return {
      ...model,
      processingState: ProcessingState.RAW,
      sourceType: this.dialogData.sourceTypeFullList.find(sourceType => `${sourceType.id}` === model.sourceType),
    };
  }

  toUpdateDtoModel(model: SourceDataForm): UpdateSourceDataDto {
    return {
      ...model,
      id: Number(model.id),
      processingState: ProcessingState.RAW,
      sourceType: this.dialogData.sourceTypeFullList.find(sourceType => `${sourceType.id}` === model.sourceType),
    };
  }

  protected readonly ProcessingState = ProcessingState;
}
