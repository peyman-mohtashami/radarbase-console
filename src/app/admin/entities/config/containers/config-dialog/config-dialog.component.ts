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

import {Validator, ValidatorError, ValidatorHint} from "../../../../../shared/utils/validators";
import { AppProject } from "../../../project/models/project";
import {AppConfig} from "../../models/config";
import {Store} from "@ngrx/store";
import {TranslatePipe} from "@ngx-translate/core";
import {MatFormField, MatInput} from "@angular/material/input";
import {ENTITY_NAME} from "../../../../enums/entities";
import {SubjectConfigService} from '../../../subject/services/subject-config.service';
import {HttpErrorResponse} from '@angular/common/http';
import {toSignal} from '@angular/core/rxjs-interop';
import {debounceTime} from 'rxjs/operators';
import {locale} from '../../../../../core/locale/store/locale.selectors';
import {DetailType} from '../../../../enums/detail-type';
import {DialogMode} from '../../../../enums/dialog';
import {DialogTitleComponent} from '../../../../components/dialog/dialog-title/dialog-title.component';
import {
  DialogBodyDescriptionComponent
} from '../../../../components/dialog/dialog-body-description/dialog-body-description.component';
import {DialogActionsComponent} from '../../../../components/dialog/dialog-actions/dialog-actions.component';
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'rb-config-dialog',
  templateUrl: './config-dialog.component.html',
  imports: [
    DialogTitleComponent,
    MatDialogContent,
    MatFormField,
    TranslatePipe,
    DialogBodyDescriptionComponent,
    DialogActionsComponent,
    MatInput,
    ReactiveFormsModule,
    JsonPipe
  ]
})
export class ConfigDialogComponent implements OnInit, AfterViewInit {
  private store = inject(Store);
  private configService = inject(SubjectConfigService);
  private dialogRef = inject(MatDialogRef<ConfigDialogComponent>);
  public dialogData = inject(MAT_DIALOG_DATA) as {
    mode: DialogMode;
    entity: AppConfig;
    // project: AppProject;
  };

  protected readonly ENTITY_NAME = ENTITY_NAME;
  protected readonly DialogMode = DialogMode;
  protected readonly DetailType = DetailType;
  protected readonly ValidatorHint = ValidatorHint;
  protected readonly ValidatorError = ValidatorError;

  tableFields = this.configService.getTableFields();
  formFields = this.configService.getFormFields();
  extraFields = this.configService.getExtraFields();

  form = new FormGroup({
    name: new FormControl<string | undefined>(undefined, {nonNullable: true, validators: [Validator.requiredValidator]}),
    value: new FormControl<string | undefined>(undefined, {nonNullable: true}),
  });

  loading$ = signal(false);
  error$ = signal<HttpErrorResponse | null>(null);

  @Output()
  dialogActionEvent = new EventEmitter<{ action: DialogMode, entity?: AppConfig }>();

  dateFormat = 'mm/dd/yyy';

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
    this.store?.select(locale).subscribe((locale) => {
      this.dateFormat = locale.currentLanguage?.dateFormat || 'mm/dd/yyy';
    });

    this.form.patchValue(this.dialogData.entity);
  }

  ngAfterViewInit() {
    const dialogContainer = document.querySelector('.tailwind-slide-panel');
    setTimeout(() => {
      dialogContainer?.classList.add('dialog-enter-active');
    });
  }

  onAction($event: string) { //TODO DIALOG_ACTION
    console.log('Class: ConfigDialogComponent, Function: onAction, Line 112 $event' , $event);
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
      case 'edit':
        this.handleSaveAction();
        break;
    }
  }

  private handleSaveAction(): void {
    this.dialogActionEvent.emit({
      action: this.dialogData.mode,
      entity: {...this.dialogData.entity, ...this.form?.value}, //, project: this.dialogData.project}, // TODO if project is not set (DialogMode ADD)
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

  // override save(): void {
  //   console.log(this.entity);
  //   console.log(this.form?.value);
  //
  //   this.error.set(false); // = false;
  //   this.isLoading = true;
  //   this.actionTriggered.emit({
  //     action: this.mode,
  //     entity: { ...this.entity, ...this.form?.value, project: this.project },
  //   });
  // }

}
