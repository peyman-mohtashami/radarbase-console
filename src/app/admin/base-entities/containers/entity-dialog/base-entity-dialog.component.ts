import {AfterViewInit, Component, OnDestroy, OnInit, output, signal, ChangeDetectionStrategy} from '@angular/core';
import {DialogMode} from '../../enums/dialog';
import {MatDialogRef} from '@angular/material/dialog';
import {AbstractControl, FormGroup} from '@angular/forms';
import {ValidatorError, ValidatorHint} from '../../../../shared/utils/validators';
import {HttpErrorResponse} from '@angular/common/http';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {DialogAction} from './dialog-actions/dialog-actions.component';
import {BaseConfigService} from '../../services/base-config.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-base-dialog',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: '',
})
export class BaseEntityDialogComponent<T> implements OnInit, AfterViewInit, OnDestroy {
  protected configService!: BaseConfigService;
  protected dialogRef?: MatDialogRef<BaseEntityDialogComponent<T>>;
  dialogData!: {id: string; mode: DialogMode | string; entity?: T};

  protected readonly DialogMode = DialogMode;
  protected readonly ValidatorHint = ValidatorHint;
  protected readonly ValidatorError = ValidatorError;

  formFields: Record<string, boolean> | undefined;

  form: AbstractControl<unknown> = new FormGroup({});

  loading = signal(false);
  error = signal<HttpErrorResponse | null>(null);

  dialogActionEvent = output<{ action: DialogMode | string, entity?: T }>();

  _destroy$: Subject<void> = new Subject<void>();

  ngOnInit() {
    this.formFields = this.configService.getFormFields();
    if (this.dialogData.entity) this.form.patchValue(this.dialogData.entity);
    this.form.valueChanges.pipe(debounceTime(300), takeUntil(this._destroy$)).subscribe((value) => {
      if (value) {
        this.error.set(null);
      }
    })
  }

  ngAfterViewInit() {
    const containerId = this.dialogData.id;
    const innerContainer = document.getElementById(containerId);
    const panel = innerContainer?.closest('.tailwind-slide-panel');
    setTimeout(() => {
      panel?.classList.add('dialog-enter-active');
    });
  }

  ngOnDestroy() {
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
      entity: {
        ...(this.dialogData.entity ?? ({} as T)),
        ...(this.form.getRawValue() as Partial<T>),
      } as T,
    });
  }

  protected handleDeleteAction(): void {
    this.dialogActionEvent.emit({action: this.dialogData.mode, entity: this.dialogData.entity});
  }

  close() {
    this.loading.set(false);
    const containerId = this.dialogData.id;
    const innerContainer = document.getElementById(containerId);
    const panel = innerContainer?.closest('.tailwind-slide-panel');
    panel?.classList.remove('dialog-enter-active');
    panel?.classList.add('dialog-exit-active');

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
