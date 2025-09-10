import {AfterViewInit, Component, effect, EventEmitter, Inject, OnInit, Output, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {AppSourceData} from "../../models/source-data";
import {ENTITY_NAME} from "../../../../enums/entities";
import {DialogTitleComponent} from "../../../../components/base-dialog/dialog-title/dialog-title.component";
import {
  DialogBodyDescriptionComponent
} from "../../../../components/base-dialog/dialog-body-description/dialog-body-description.component";
import {AsyncPipe, JsonPipe} from "@angular/common";
import {ErrorMessageComponent} from "../../../../../core/error/components/message/error-message.component";
import {DialogActionsComponent} from "../../../../components/base-dialog/dialog-actions/dialog-actions.component";
import {MatOption} from "@angular/material/core";
import {RadarOption} from '../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component';
import {Store} from '@ngrx/store';
import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {TranslatePipe} from '@ngx-translate/core';
import {MatLabel, MatSelect} from '@angular/material/select';
import {
  MatSelectAutocompleteComponent
} from '../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import {Observable} from 'rxjs';
import {instanceConfig} from '../../../../../core/config/store/config.selectors';
import {debounceTime, map} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {Validator, ValidatorError, ValidatorHint} from '../../../../../shared/utils/validators';
import {DialogMode} from '../../../../enums/dialog';
import {ProcessingState} from '../../../../../shared/models/radar-source-data.model';
import {toSignal} from '@angular/core/rxjs-interop';
import {AppSourceType} from '../../../source-type/models/source-type';

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
    MatSelectAutocompleteComponent,
    MatSelect,
    MatOption,
    ErrorMessageComponent,
    DialogActionsComponent,
    AsyncPipe,
    JsonPipe,
    MatError,
  ]
})
export class SourceDataDialogComponent implements OnInit, AfterViewInit { //}, OnDestroy {
  protected readonly ProcessingState = ProcessingState;
  protected readonly ENTITY_NAME = ENTITY_NAME;
  protected readonly DialogMode = DialogMode;
  protected readonly ValidatorHint = ValidatorHint;
  protected readonly ValidatorError = ValidatorError;

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

  sourceTypesOptions: RadarOption[] = [];

  loading = signal(false);
  error = signal(false);

  @Output()
  actionTriggered = new EventEmitter<{ action: DialogMode, entity?: AppSourceData }>();

  floatLabel = false;

  config$?: Observable<Record<string, any>>;

  readonly formValueChanges = toSignal(
    this.form.valueChanges.pipe(debounceTime(300)), // Optional debounce for optimization
    {initialValue: this.form.getRawValue()} // Provide the initial value from the form
  );

  // dateFormat = 'mm/dd/yyy';

  constructor(
    private dialogRef: MatDialogRef<SourceDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      mode: DialogMode;
      entity: AppSourceData;
      extra: any;
      // sourceTypes: AppSourceType[];
    },
    private store: Store,
    // private dateAdapter: DateAdapter<any>
  ) {
    this.config$ = this.store?.select(instanceConfig).pipe(
      map(config => {
        return config.entities[ENTITY_NAME.sourceData]
      })
    );

    effect(() => {
      const formValue = this.formValueChanges();
      if (formValue) {
        this.error.set(false);
      }
    });


  }

  ngOnInit() {
    setTimeout(() => {
      console.log('Class: SourceDataDialogComponent, Function: , Line 127 this.data.extra' , this.data.extra);
      this.sourceTypesOptions = (this.data.extra.sourceTypes as AppSourceType[]).sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      console.log('Class: SourceDataDialogComponent, Function: , Line 131 this.sourceTypesOptions' , this.sourceTypesOptions);
      this.form?.patchValue(this.data.entity);
    }, 1000);
  }

  onAction($event: string) {
    switch ($event) {
      case 'close':
        this.close();
        break;
      case 'delete':
        this.delete();
        break;
      case 'save':
        this.save();
        break;
    }
  }

  save(): void {
    this.error.set(false);
    this.loading.set(true);
    this.actionTriggered.emit({
      action: this.data.mode,
      entity: {...this.data.entity, ...this.form?.value},
    });
  }

  delete(): void {
    this.error.set(false);
    this.loading.set(true);
    if (this.data.entity) {
      this.actionTriggered.emit({action: this.data.mode, entity: this.data.entity});
    }
  }

  errorHappened(error: HttpErrorResponse): void {
    this.loading.set(false);
    this.error.set(true);
  }

  ngAfterViewInit() {
    const container = document.querySelector('.tailwind-slide-panel');
    setTimeout(() => {
      container?.classList.add('dialog-enter-active');
    });
  }

  close() {
    const container = document.querySelector('.tailwind-slide-panel');
    container?.classList.remove('dialog-enter-active');
    container?.classList.add('dialog-exit-active');

    setTimeout(() => {
      this.actionTriggered.emit({action: DialogMode.CLOSE});
      //   this.actionTriggered.emit({ action: 'close' });
      this.dialogRef.close();
    }, 300);
  }
}
