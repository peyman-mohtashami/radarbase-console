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
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatOption} from '@angular/material/core';

import {ENTITY_NAME} from "../../../../enums/entities";
import {debounceTime} from "rxjs/operators";
import {TranslatePipe} from "@ngx-translate/core";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatSelect, MatSuffix} from "@angular/material/select";
import {MatError} from "@angular/material/form-field";
import {HttpErrorResponse} from '@angular/common/http';
import {toSignal} from '@angular/core/rxjs-interop';
import {AppSubject} from '../../models/subject';
import {ValidatorError, ValidatorHint} from '../../../../../shared/utils/validators';
import {AppGroup} from '../../../group/models/group';
import {SubjectConfigService} from '../../services/subject-config.service';
import {JsonPipe} from '@angular/common';
import {AppProject} from '../../../project/models/project';
import {SubjectDialogMode} from '../../enums/dialog';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {SubjectDetailsComponent} from '../../components/subject-details/subject-details.component';
import {DetailType} from '../../../../enums/detail-type';
import {locale} from '../../../../../core/locale/store/locale.selectors';
import {Store} from '@ngrx/store';
import {DialogActionsComponent} from '../../../../components/dialog/dialog-actions/dialog-actions.component';
import {DialogTitleComponent} from '../../../../components/dialog/dialog-title/dialog-title.component';
import {
  DialogBodyDescriptionComponent
} from '../../../../components/dialog/dialog-body-description/dialog-body-description.component';

@Component({
  selector: 'rb-subject-dialog',
  templateUrl: './subject-dialog.component.html',
  imports: [
    TranslatePipe,
    DialogActionsComponent,
    DialogTitleComponent,
    MatDialogContent,
    DialogBodyDescriptionComponent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatSelect,
    MatOption,
    MatError,
    JsonPipe,
    MatButton,
    MatIcon,
    MatProgressSpinner,
    MatDialogTitle,
    MatIconButton,
    MatSuffix,
    SubjectDetailsComponent,
  ]
})
export class SubjectDialogComponent implements OnInit, AfterViewInit {
  private store = inject(Store);
  private configService = inject(SubjectConfigService);
  private dialogRef = inject(MatDialogRef<SubjectDialogComponent>);
  public dialogData = inject(MAT_DIALOG_DATA) as {
    mode: SubjectDialogMode;
    entity: AppSubject;
    project: AppProject;
    groups: AppGroup[];
  };

  protected readonly ENTITY_NAME = ENTITY_NAME;
  protected readonly DialogMode = SubjectDialogMode;
  protected readonly DetailType = DetailType;
  protected readonly ValidatorHint = ValidatorHint;
  protected readonly ValidatorError = ValidatorError;

  tableFields = this.configService.getTableFields();
  formFields = this.configService.getFormFields();

  form = new FormGroup({
    id: new FormControl<string | number | undefined>({ value: undefined, disabled: true }, {nonNullable: true}),
    login: new FormControl<string | undefined>({ value: undefined, disabled: true }, {nonNullable: true}),
    personName: new FormControl<string | undefined>(undefined, {nonNullable: true}),
    dateOfBirth: new FormControl<Date | undefined>(undefined, {nonNullable: true}),
    externalId: new FormControl<string | undefined>(undefined, {nonNullable: true}),
    externalLink: new FormControl<string | undefined>(undefined, {nonNullable: true}),
    group: new FormControl<string | undefined>(undefined, {nonNullable: true}),
    attributes: new FormGroup({
      humanReadableIdentifier: new FormControl<string | undefined>(undefined, {nonNullable: true}),
      participant_group: new FormControl<string | undefined>(undefined, {nonNullable: true}),
    }),
  });

  loading$ = signal(false);
  error$ = signal<HttpErrorResponse | null>(null);

  @Output()
  dialogActionEvent = new EventEmitter<{ action: SubjectDialogMode, entity?: AppSubject }>();

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
    this.store?.select(locale)
      // ?.getLocale()
      // .pipe(takeUntil(this.subscription$))
      .subscribe((locale) => {
        // this.dateAdapter?.setLocale(locale.currentLanguage?.locale);
        this.dateFormat = locale.currentLanguage?.dateFormat || 'mm/dd/yyy';
      });

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
      case 'add':
      case 'edit':
        this.handleSaveAction();
        break;
    }
  }

  private handleSaveAction(): void {
    console.log('Class: SubjectDialogComponent, Function: handleSaveAction, Line 137 this.dialogData.entity' , this.dialogData.entity);
    this.dialogActionEvent.emit({
      action: this.dialogData.mode,
      entity: {...this.dialogData.entity, ...this.form?.value, project: this.dialogData.project}, // TODO if project is not set (DialogMode ADD)
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
      this.dialogActionEvent.emit({action: SubjectDialogMode.CLOSE});
      this.dialogRef.close();
    }, 300);
  }

  errorHappened(error: HttpErrorResponse): void {
    this.loading$.set(false);
    this.error$.set(error);
  }

  //
  // SubjectStatus = SubjectStatus;
  //
  //
  //
  // constructor(
  //   router: Router,
  //   dialogRef: MatDialogRef<SubjectDialogComponent>,
  //   @Inject(MAT_DIALOG_DATA)
  //   // public override data: {
  //   //   mode: string;
  //   //   entity: AppSubject;
  //   //   // projectName: string;
  //   //   groups: AppGroup[];
  //   // },
  //   public override data: any,
  //   store: Store,
  //   // currentLocaleService: LocaleService,
  //   dateAdapter: DateAdapter<any>
  // ) {
  //   super(router, dialogRef, data, store, dateAdapter);
  // }
  //
  // // override initForm(): void {
  // //   this.form.patchValue({ ...this.entity }); //, project: this.projectName });
  // // }
  //
  //
  // override save(): void {
  //   this.error.set(false);// = false;
  //   this.isLoading = true;
  //   console.log('Class: SubjectDialogComponent, Function: save, Line 200 this.form.value' , this.form.value);
  //   const modifiedFormValue: any = {}; //{ ...this.form.value };
  //
  //   Object.entries(this.form.value).forEach(([key, value]) => {
  //     const _f = this._fields?.find((f: any) => f.name === key);
  //
  //     if (key.startsWith('attributes.')) {
  //       const _key = key.split('.')[1];
  //       modifiedFormValue['attributes'] = {...modifiedFormValue['attributes'], [_key]: value};
  //     } else if (_f.extra) {
  //       modifiedFormValue['attributes'] = {...modifiedFormValue['attributes'], [key]: value};
  //     } else {
  //       modifiedFormValue[key] = value;
  //     }
  //   })
  //
  //   // const t: any = this.form.value;
  //   // this._fields?.forEach((field: any) => {
  //   //   if (field.name.startsWith('attributes.')) {
  //   //     const key = field.name.split('.')[1];
  //   //     modifiedFormValue['attributes'] = {...modifiedFormValue['attributes'], [key]: t[field.name]};
  //   //   } else if (field.extra) {
  //   //     modifiedFormValue['attributes'] = {...modifiedFormValue['attributes'], [field.name]: t[field.name]};
  //   //   } else {
  //   //     modifiedFormValue[field.name] = t[field.name];
  //   //   }
  //   // })
  //   // console.log('Class: SubjectDialogComponent, Function: save, Line 213 modifiedFormValue' , modifiedFormValue);
  //   this.actionTriggered.emit({
  //     action: this.mode,
  //     entity: { ...this.entity, ...modifiedFormValue },
  //   });
  // }
}
