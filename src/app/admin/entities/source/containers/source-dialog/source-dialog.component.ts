import {
  AfterViewInit,
  Component,
  effect,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';

import {Validator, ValidatorError, ValidatorHint} from '../../../../../shared/utils/validators';
import {
  MatSelectAutocompleteComponent,
} from '../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import {ENTITY_NAME} from "../../../../enums/entities";
import {TranslatePipe} from "@ngx-translate/core";
import {MatError, MatFormField, MatInput} from "@angular/material/input";
import {HttpErrorResponse} from '@angular/common/http';
import {toSignal} from '@angular/core/rxjs-interop';
import {debounceTime} from 'rxjs/operators';
import {SourceConfigService} from '../../services/source-config.service';
import {SourceDialogService} from '../../services/source-dialog.service';
import {DialogMode} from '../../../../enums/dialog';
import {AppSource} from '../../models/source';
import {AppSourceType, RadarSourceType} from '../../../source-type/models/source-type';
import {DialogTitleComponent} from '../../../../components/dialog/dialog-title/dialog-title.component';
import {
  DialogBodyDescriptionComponent
} from '../../../../components/dialog/dialog-body-description/dialog-body-description.component';
import {DialogActionsComponent} from '../../../../components/dialog/dialog-actions/dialog-actions.component';

@Component({
  selector: 'rb-source-dialog',
  templateUrl: './source-dialog.component.html',
  imports: [
    DialogTitleComponent,
    MatDialogContent,
    DialogBodyDescriptionComponent,
    ReactiveFormsModule,
    MatFormField,
    TranslatePipe,
    MatInput,
    MatError,
    MatSelectAutocompleteComponent,
    DialogActionsComponent,
  ]
})
export class SourceDialogComponent implements OnInit, AfterViewInit {
  private configService = inject(SourceConfigService);
  private dialogRef = inject(MatDialogRef<SourceDialogService>);
  public dialogData = inject(MAT_DIALOG_DATA) as {
    mode: DialogMode;
    entity: AppSource;
    sourceTypes: AppSourceType[];
  };

  protected readonly ENTITY_NAME = ENTITY_NAME;
  protected readonly DialogMode = DialogMode;
  protected readonly ValidatorHint = ValidatorHint;
  protected readonly ValidatorError = ValidatorError;

  formFields = this.configService.getFormFields();

  form = new FormGroup({
    id: new FormControl<string | number | undefined>({ value: undefined, disabled: true }, {nonNullable: true}),
    sourceId: new FormControl<string | undefined>({value: undefined, disabled: true}, {nonNullable: true}),
    sourceName: new FormControl<string | undefined>("", {nonNullable: true, validators: [Validator.requiredValidator, Validator.normalTextValidator]}),
    expectedSourceName: new FormControl<string | undefined>("", {nonNullable: true}),
    sourceType: new FormControl<RadarSourceType | undefined>(undefined, {nonNullable: true, validators: [Validator.requiredValidator]}),
    attributes: new FormGroup({
      "External-identifier": new FormControl<string | undefined>(undefined, {nonNullable: true, validators: [Validator.normalTextValidator]}),
    }),
  });

  loading$ = signal(false);
  error$ = signal<HttpErrorResponse | null>(null);

  @Output()
  dialogActionEvent = new EventEmitter<{ action: DialogMode, entity?: AppSource }>();

  private readonly formValueChanges = toSignal(
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
    // this.form.controls.name.addValidators(this.duplicateValidator);
    this.form.patchValue(this.dialogData.entity);
  }

  ngAfterViewInit() {
    const dialogContainer = document.querySelector('.tailwind-slide-panel');
    setTimeout(() => {
      dialogContainer?.classList.add('dialog-enter-active');
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

  // private duplicateValidator = (control: AbstractControl) => {
  //   return this.dialogData.entities?.find(
  //     (entity) =>
  //       control.value === entity.name && this.dialogData.entity?.name !== entity.name
  //   )
  //     ? { duplicate: true }
  //     : null;
  // };
}
