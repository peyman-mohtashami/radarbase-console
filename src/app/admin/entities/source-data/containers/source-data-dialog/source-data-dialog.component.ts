import {
  AfterViewInit,
  Component,
  effect,
  EventEmitter, inject,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {AppSourceData, ProcessingState} from "../../models/source-data";
import {ENTITY_NAME} from "../../../../enums/entities";
import {MatOption} from "@angular/material/core";
import {RadarOption} from '../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component';
import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {TranslatePipe} from '@ngx-translate/core';
import {MatSelect} from '@angular/material/select';
import {
  MatSelectAutocompleteComponent
} from '../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import {debounceTime} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {Validator, ValidatorError, ValidatorHint} from '../../../../../shared/utils/validators';
import {DialogMode} from '../../../../enums/dialog';
import {toSignal} from '@angular/core/rxjs-interop';
import {AppSourceType} from '../../../source-type/models/source-type';
import {SourceDataConfigService} from '../../services/source-data-config.service';
import {DialogTitleComponent} from '../../../../components/dialog/dialog-title/dialog-title.component';
import {
  DialogBodyDescriptionComponent
} from '../../../../components/dialog/dialog-body-description/dialog-body-description.component';
import {DialogActionsComponent} from '../../../../components/dialog/dialog-actions/dialog-actions.component';

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
    MatInput,
    MatSelectAutocompleteComponent,
    MatSelect,
    MatOption,
    DialogActionsComponent,
    MatError,
  ]
})
export class SourceDataDialogComponent implements OnInit, AfterViewInit {
  protected readonly ProcessingState = ProcessingState;
  protected readonly ENTITY_NAME = ENTITY_NAME;
  protected readonly DialogMode = DialogMode;
  protected readonly ValidatorHint = ValidatorHint;
  protected readonly ValidatorError = ValidatorError;

  private configService = inject(SourceDataConfigService);
  private dialogRef = inject(MatDialogRef<SourceDataDialogComponent>);
  public dialogData = inject(MAT_DIALOG_DATA) as {
    mode: DialogMode;
    entity: AppSourceData;
    sourceTypes: AppSourceType[];
  };

  formFields = this.configService.getFormFields();

  form = new FormGroup({
    id: new FormControl<string | number | undefined>({ value: undefined, disabled: true }, {nonNullable: true}),
    sourceDataType: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validator.requiredValidator, Validator.normalTextValidator]
    }),
    sourceType: new FormControl<any>('', {nonNullable: true, validators: [Validator.requiredValidator]}),
    sourceDataName: new FormControl<string>('', {nonNullable: true, validators: [Validator.requiredValidator]}),
    processingState: new FormControl<ProcessingState | undefined>(undefined, {nonNullable: true}),
    topic: new FormControl<string | undefined>('', {nonNullable: true}),
    keySchema: new FormControl<string | undefined>('', {nonNullable: true}),
    valueSchema: new FormControl<string | undefined>('', {nonNullable: true}),
    frequency: new FormControl<string | undefined>('', {nonNullable: true}),
    unit: new FormControl<string | undefined>('', {nonNullable: true}),
  });

  sourceTypesOptions: RadarOption[] = (this.dialogData.sourceTypes as AppSourceType[]).sort((a, b) =>
    a._name.localeCompare(b._name)
  );

  loading$ = signal(false);
  error$ = signal<HttpErrorResponse | null>(null);

  @Output()
  dialogActionEvent = new EventEmitter<{ action: DialogMode, entity?: AppSourceData }>();

  readonly formValueChanges = toSignal(
    this.form.valueChanges.pipe(debounceTime(300)),
    {initialValue: this.form.getRawValue()}
  );

  constructor() {
    effect(() => {
      if (this.formValueChanges()) {
        this.error$.set(null);
      }
    });
  }

  ngOnInit() {
    this.form?.patchValue(this.dialogData.entity);
  }

  ngAfterViewInit() {
    const container = document.querySelector('.tailwind-slide-panel');
    setTimeout(() => {
      container?.classList.add('dialog-enter-active');
    });
  }

  onAction($event: string) { //TODO DIALOG_ACTION
    this.error$.set(null);
    this.loading$.set(true);
    switch ($event) {
      case 'close':
        this.close();
        break;
      case 'delete':
        this.handleDeleteAction();
        break;
      case 'save':
        this.handleSaveAction();
        break;
    }
  }

  private handleSaveAction(): void {
    this.dialogActionEvent.emit({
      action: this.dialogData.mode,
      entity: {...this.dialogData.entity, ...this.form?.value},
    });
  }

  private handleDeleteAction(): void {
    this.dialogActionEvent.emit({action: this.dialogData.mode, entity: this.dialogData.entity});
  }

  close() {
    this.loading$.set(false);
    const container = document.querySelector('.tailwind-slide-panel');
    container?.classList.remove('dialog-enter-active');
    container?.classList.add('dialog-exit-active');

    setTimeout(() => {
      this.dialogActionEvent.emit({action: DialogMode.CLOSE});
      this.dialogRef.close();
    }, 300);
  }

  errorHappened(error: HttpErrorResponse): void {
    this.loading$.set(false);
    this.error$.set(error);
  }
}
