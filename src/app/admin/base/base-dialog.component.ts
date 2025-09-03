import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output, signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from "@angular/forms";
import {Observable, Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {
  ValidatorError,
  ValidatorHint,
} from '../../shared/utils/validators';
import { DialogMode } from '../enums/dialog';
import {Store} from "@ngrx/store";
import {locale} from "../../core/locale/store/locale.selectors";
import {instanceConfig} from "../../core/config/store/config.selectors";
import {ENTITY_NAME} from "../enums/entities";

@Component({
    selector: 'rb-base-dialog',
    template: '<div></div>',
})
export class BaseDialogComponent<T extends { [key: string]: any }, U>
  implements OnInit, OnDestroy, AfterViewInit
{
  floatLabel = false;

  DialogMode = DialogMode;

  isLoading = false;
  // error = false;
  error = signal(false);

  mode: DialogMode;
  entity: T;

  @Output() actionTriggered = new EventEmitter();

  form?: FormGroup;

  subscription$: Subject<void> = new Subject<void>();

  ValidatorHint = ValidatorHint;
  ValidatorError = ValidatorError;

  dateFormat = 'mm/dd/yyy';

  config$?: Observable<Record<string, any>>;

  name!: ENTITY_NAME

  constructor(
    public router: Router,
    // public fb: UntypedFormBuilder,
    public dialogRef: MatDialogRef<U>,
    @Inject(MAT_DIALOG_DATA) public data: { entity: T; mode: string }, // TODO mode type Dialog Mode
    // public localeService?: LocaleService,
    public store?: Store,
    public dateAdapter?: DateAdapter<any>
  ) {
    this.config$ = this.store?.select(instanceConfig).pipe(
      map(config => {
        console.log('Class: BaseDialogComponent, Function: config, Line 71 config' , config);
        return config.entities[this.name]
      })
    );
    this.mode = this.data.mode as DialogMode;
    this.entity = this.data.entity;
  }

  ngOnInit() {
    console.log('dialog init');
    // this.config$ = this.store?.select(config).pipe(
    //   map(config => {
    //     console.log('Class: BaseDialogComponent, Function: config, Line 71 config' , config);
    //     return config.entities[this.name]
    //   })
    // );
    // this.form?.patchValue(this.entity);
    this.initForm();

    this.form?.valueChanges
      .pipe(takeUntil(this.subscription$))
      .subscribe(() => {
        this.error.set(false); // = false;
      });

    this.store?.select(locale)
    // this.localeService?.locale$
      // ?.getLocale()
      .pipe(takeUntil(this.subscription$))
      .subscribe((locale) => {
        this.dateAdapter?.setLocale(locale.currentLanguage?.locale);
        this.dateFormat = locale.currentLanguage?.dateFormat || 'mm/dd/yyy';
      });
  }

  ngOnDestroy() {
    console.log('dialog destroy');
    this.subscription$.next();
    this.subscription$.complete();
  }

  public initForm() {
    this.form?.patchValue(this.entity);
    // throw new Error('BaseDialogComponent "initForm" method not implemented');
  }

  onAction($event: string) {
    console.log('Class: BaseDialogComponent, Function: onAction, Line 119 $event' , $event);
    switch ($event) {
      case 'close':
        console.log('Class: BaseDialogComponent, Function: onAction, Line 122 ' , );
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
    this.error.set(false); //= false;
    this.isLoading = true;
    console.log('Class: BaseDialogComponent, Function: save, Line 132 this.entity' , this.entity);
    console.log('Class: BaseDialogComponent, Function: save, Line 133 this.form?.value' , this.form?.value);
    this.actionTriggered.emit({
      action: this.mode,
      entity: { ...this.entity, ...this.form?.value },
    });
  }

  delete(): void {
    this.error.set(false);// = false;
    this.isLoading = true;
    if (this.entity) {
      this.actionTriggered.emit({ action: this.mode, entity: this.entity });
    }
  }

  errorHappened(error: HttpErrorResponse): void {
    console.log('Class: BaseDialogComponent, Function: errorHappened, Line 151 error' , error);
    this.isLoading = false;
    this.error.set(true); // = true;
  }

  ngAfterViewInit() {
    const container = document.querySelector('.tailwind-slide-panel');
    setTimeout(() => {
      container?.classList.add('dialog-enter-active');
    });
  }

  close() {
    console.log('Class: BaseDialogComponent, Function: close, Line 167 ' , );
    const container = document.querySelector('.tailwind-slide-panel');
    container?.classList.remove('dialog-enter-active');
    container?.classList.add('dialog-exit-active');

    setTimeout(() => {
      console.log('Class: BaseDialogComponent, Function: , Line 173 ' , );
      this.actionTriggered.emit({ action: 'close' });
    //   this.actionTriggered.emit({ action: 'close' });
      this.dialogRef.close();
    }, 300);
  }
}
