import {AfterViewInit, Component, effect, EventEmitter, inject, OnInit, Output, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import { AppSourceType } from "../../models/source-type";
import {ENTITY_NAME} from "../../../../enums/entities";
import {DialogTitleComponent} from "../../../../components/base-dialog/dialog-title/dialog-title.component";
import {
  DialogBodyDescriptionComponent
} from "../../../../components/base-dialog/dialog-body-description/dialog-body-description.component";
import {DialogActionsComponent} from "../../../../components/base-dialog/dialog-actions/dialog-actions.component";
import {Validator, ValidatorError, ValidatorHint} from '../../../../../shared/utils/validators';
import {toSignal} from '@angular/core/rxjs-interop';
import {debounceTime} from 'rxjs/operators';
import {DialogMode} from '../../../../enums/dialog';
import {HttpErrorResponse} from '@angular/common/http';
import {TranslatePipe} from '@ngx-translate/core';
import {MatError, MatFormField, MatHint, MatInput} from '@angular/material/input';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {SourceTypeConfigService} from '../../services/source-type-config.service';

@Component({
  selector: 'rb-source-type-dialog',
  templateUrl: './source-type-dialog.component.html',
  imports: [
    DialogTitleComponent,
    MatDialogContent,
    DialogBodyDescriptionComponent,
    ReactiveFormsModule,
    DialogActionsComponent,
    TranslatePipe,
    MatFormField,
    MatInput,
    MatError,
    MatSelect,
    MatOption,
    MatSlideToggle,
    MatHint
  ]
})
export class SourceTypeDialogComponent implements OnInit, AfterViewInit {
  private configService = inject(SourceTypeConfigService);
  private dialogRef = inject(MatDialogRef<SourceTypeDialogComponent>);
  public dialogData = inject(MAT_DIALOG_DATA) as {
    mode: DialogMode;
    entity: AppSourceType;
  };

  protected readonly ENTITY_NAME = ENTITY_NAME;
  protected readonly DialogMode = DialogMode;
  protected readonly ValidatorHint = ValidatorHint;
  protected readonly ValidatorError = ValidatorError;

  formFields = this.configService.getFormFields();

  form = new FormGroup({
    id: new FormControl<string | number | undefined>({ value: undefined, disabled: true }, {nonNullable: true}),
    producer: new FormControl<string>("", {nonNullable: true, validators: [Validator.requiredValidator, Validator.normalTextValidator]}),
    model: new FormControl<string>("", {nonNullable: true, validators: [Validator.requiredValidator, Validator.normalTextValidator]}),
    catalogVersion: new FormControl<string>("", {nonNullable: true, validators: [Validator.requiredValidator, Validator.normalTextValidator]}),
    sourceTypeScope: new FormControl<any>("", {nonNullable: true, validators: [Validator.requiredValidator]}),
    canRegisterDynamically: new FormControl<boolean>(false, {nonNullable: true}),
    name: new FormControl<string>("", {nonNullable: true}),
    description: new FormControl<string>("", {nonNullable: true, validators: [Validator.longTextValidator]}),
    assessmentType: new FormControl<string>("", {nonNullable: true}),
    appProvider: new FormControl<string>("", {nonNullable: true}),
  });

  loading$ = signal(false);
  error$ = signal<HttpErrorResponse | null>(null);

  @Output()
  dialogActionEvent = new EventEmitter<{ action: DialogMode, entity?: AppSourceType }>();

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
}
