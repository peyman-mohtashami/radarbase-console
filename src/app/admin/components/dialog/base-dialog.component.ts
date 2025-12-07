import {
  AfterViewInit,
  Component,
  effect,
  EventEmitter,
  inject,
  input,
  OnInit,
  output,
  Output,
  signal
} from '@angular/core';
import {DialogMode} from '../../enums/dialog';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {Validator, ValidatorError, ValidatorHint} from '../../../shared/utils/validators';
import {HttpErrorResponse} from '@angular/common/http';
import {toSignal} from '@angular/core/rxjs-interop';
import {debounceTime} from 'rxjs/operators';
import {DialogAction} from './dialog-actions/dialog-actions.component';

@Component({
  selector: 'app-base-dialog',
  template: '',
})
export class BaseDialogComponent<T> {
  protected configService: any; // = inject(SourceTypeConfigService);
  protected dialogRef?: MatDialogRef<any, any>;
  public dialogData: any;
  // = inject(MAT_DIALOG_DATA) as {
  //   mode: DialogMode;
  //   entity: AppClient;
  //   entities: AppClient[];
  // };

  protected readonly DialogMode = DialogMode;
  protected readonly ValidatorHint = ValidatorHint;
  protected readonly ValidatorError = ValidatorError;

  formFields?: Record<string, boolean>;

  form = new FormGroup<any>({});

  loading = signal(false);
  error = signal<HttpErrorResponse | null>(null);

  dialogActionEvent = output<{ action: DialogMode, entity?: T }>();

  private readonly formValueChanges = toSignal(
    this.form.valueChanges.pipe(debounceTime(300)),
    {initialValue: this.form.getRawValue()}
  );

  constructor() {
    effect(() => {
      if (this.formValueChanges()) {
        this.error.set(null);
      }
    });
  }

  init() {
    this.formFields = this.configService.getFormFields();
    // this.form.controls.clientId.addValidators(this.duplicateValidator);
    this.form.patchValue(this.dialogData.entity);
    // this.form.controls.enableEmptySecret?.valueChanges.subscribe((value) => {
    //   this.form.controls.clientSecret?.setValidators(
    //     value ? null : Validator.requiredValidator
    //   );
    //   this.form.controls.clientSecret?.updateValueAndValidity();
    // });
  }

  afterViewInit() {
    const dialogContainer = document.querySelector('.tailwind-slide-panel');
    setTimeout(() => {
      dialogContainer?.classList.add('dialog-enter-active');
    });
  }

  onAction($event: DialogAction) {
    this.error.set(null);
    this.loading.set(true);
    switch ($event) {
      case DialogAction.CLOSE:
        this.close();
        break;
      case DialogAction.DELETE:
        this.handleDeleteAction();
        break;
      case DialogAction.SAVE:
        this.handleSaveAction();
        break;
    }
  }

  protected handleSaveAction(): void {
    this.dialogActionEvent.emit({
      action: this.dialogData.mode,
      entity: {...this.dialogData.entity, ...this.form.value, enableEmptySecret: null},
    });
  }

  protected handleDeleteAction(): void {
    this.dialogActionEvent.emit({action: this.dialogData.mode, entity: this.dialogData.entity});
  }

  close() {
    this.loading.set(false);
    const container = document.querySelector('.tailwind-slide-panel');
    container?.classList.remove('dialog-enter-active');
    container?.classList.add('dialog-exit-active');

    setTimeout(() => {
      this.dialogActionEvent.emit({action: DialogMode.CLOSE});
      this.dialogRef?.close();
    }, 300);
  }

  errorHappened(error: HttpErrorResponse): void {
    this.loading.set(false);
    this.error.set(error);
  }
}
