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
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';

import { AppGroup } from "../../models/group";
import {ENTITY_NAME} from "../../../../enums/entities";
import {TranslatePipe} from "@ngx-translate/core";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatError} from "@angular/material/form-field";
import {HttpErrorResponse} from '@angular/common/http';
import {toSignal} from '@angular/core/rxjs-interop';
import {debounceTime} from 'rxjs/operators';
import {DialogMode} from '../../../../enums/dialog';
import {GroupConfigService} from '../../services/group-config.service';
import {ValidatorError, ValidatorHint} from '../../../../../shared/utils/validators';
import {DialogTitleComponent} from '../../../../components/dialog/dialog-title/dialog-title.component';
import {
  DialogBodyDescriptionComponent
} from '../../../../components/dialog/dialog-body-description/dialog-body-description.component';
import {DialogActionsComponent} from '../../../../components/dialog/dialog-actions/dialog-actions.component';

@Component({
  selector: 'rb-organization-dialog',
  templateUrl: './group-dialog.component.html',
  imports: [
    DialogTitleComponent,
    MatDialogContent,
    DialogBodyDescriptionComponent,
    TranslatePipe,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    DialogActionsComponent,
    MatError
  ]
})
export class GroupDialogComponent implements OnInit, AfterViewInit {
  private configService = inject(GroupConfigService);
  private dialogRef = inject(MatDialogRef<GroupDialogComponent>);
  public dialogData = inject(MAT_DIALOG_DATA) as {
    mode: DialogMode;
    entity: AppGroup;
    entities: AppGroup[];
  };

  protected readonly ENTITY_NAME = ENTITY_NAME;
  protected readonly DialogMode = DialogMode;
  protected readonly ValidatorHint = ValidatorHint;
  protected readonly ValidatorError = ValidatorError;

  formFields = this.configService.getFormFields();

  form = new FormGroup({
    id: new FormControl<string | number | undefined>({ value: undefined, disabled: true}, {nonNullable: true}),
    name: new FormControl<string | undefined>('', {nonNullable: true}),
  });

  loading$ = signal(false);
  error$ = signal<HttpErrorResponse | null>(null);

  @Output()
  dialogActionEvent = new EventEmitter<{ action: DialogMode, entity?: AppGroup }>();

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
    this.form.controls.name.addValidators(this.duplicateValidator);
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

  private duplicateValidator = (control: AbstractControl) => {
    return this.dialogData.entities?.find(
      (entity) =>
        control.value === entity.name && this.dialogData.entity?.name !== entity.name
    )
      ? { duplicate: true }
      : null;
  }
}
