import {Component, output, signal} from '@angular/core';
import {DialogMode} from '../../enums/dialog';
import {MatDialogRef} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {ValidatorError, ValidatorHint} from '../../../shared/utils/validators';
import {HttpErrorResponse} from '@angular/common/http';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {DialogAction} from './dialog-actions/dialog-actions.component';
import {BaseConfigService} from '../../services/base-config.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-base-dialog',
  template: '',
})
export class BaseDialogComponent<T> {
  protected configService!: BaseConfigService;
  protected dialogRef?: MatDialogRef<any>;
  dialogData?: any;

  protected readonly DialogMode = DialogMode;
  protected readonly ValidatorHint = ValidatorHint;
  protected readonly ValidatorError = ValidatorError;

  formFields?: Record<string, boolean>;

  form = new FormGroup<any>({});

  loading = signal(false);
  error = signal<HttpErrorResponse | null>(null);

  dialogActionEvent = output<{ action: DialogMode | string, entity?: T }>();

  _destroy$: Subject<void> = new Subject<void>();

  init() {
    this.formFields = this.configService.getFormFields();
    this.form.patchValue(this.dialogData.entity);
    this.form.valueChanges.pipe(debounceTime(300), takeUntil(this._destroy$)).subscribe((value) => {
      if (value) {
        this.error.set(null);
      }
    })
  }

  afterViewInit() {
    const dialogContainer = document.querySelector('.tailwind-slide-panel');
    setTimeout(() => {
      dialogContainer?.classList.add('dialog-enter-active');
    });
  }

  destroy() {
    this._destroy$.next();
    this._destroy$.complete();
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
