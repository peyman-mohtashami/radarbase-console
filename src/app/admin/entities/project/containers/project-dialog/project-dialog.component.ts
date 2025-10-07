import {AfterViewInit, Component, effect, EventEmitter, inject, OnInit, Output, signal} from "@angular/core";
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";

import {Validator, ValidatorError, ValidatorHint} from "../../../../../shared/utils/validators";
import {AppProject, ProjectStatus} from "../../models/project";
import {AppOrganization, RadarOrganization} from "../../../organization/models/organization";
import {ENTITY_NAME} from "../../../../enums/entities";
import {TranslatePipe} from "@ngx-translate/core";
import {HttpErrorResponse} from '@angular/common/http';
import {toSignal} from '@angular/core/rxjs-interop';
import {debounceTime} from 'rxjs/operators';
import {ProjectConfigService} from '../../services/project-config.service';
import {DialogMode} from '../../../../enums/dialog';
import {MatError, MatFormField, MatHint, MatInput, MatSuffix} from '@angular/material/input';
import {
  MatSelectAutocompleteComponent
} from '../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatOption, MatSelect} from '@angular/material/select';
import {AppSourceType, RadarSourceType} from '../../../source-type/models/source-type';
import {locale} from '../../../../../core/locale/store/locale.selectors';
import {Store} from '@ngrx/store';
import {DialogTitleComponent} from '../../../../components/dialog/dialog-title/dialog-title.component';
import {
  DialogBodyDescriptionComponent
} from '../../../../components/dialog/dialog-body-description/dialog-body-description.component';
import {DialogActionsComponent} from '../../../../components/dialog/dialog-actions/dialog-actions.component';

@Component({
  selector: 'rb-project-dialog',
  templateUrl: './project-dialog.component.html',
  imports: [
    DialogTitleComponent,
    MatDialogContent,
    DialogBodyDescriptionComponent,
    ReactiveFormsModule,
    TranslatePipe,
    DialogActionsComponent,
    MatError,
    MatFormField,
    MatHint,
    MatInput,
    MatFormField,
    MatHint,
    MatError,
    MatSelectAutocompleteComponent,
    MatDatepickerToggle,
    MatDatepicker,
    MatOption,
    MatSelect,
    MatDatepickerInput,
    MatSuffix,
  ]
})
export class ProjectDialogComponent implements OnInit, AfterViewInit {
  private store = inject(Store);
  private configService = inject(ProjectConfigService);
  private dialogRef = inject(MatDialogRef<ProjectDialogComponent>);
  public dialogData = inject(MAT_DIALOG_DATA) as {
    mode: DialogMode;
    entity: AppProject;
    entities: AppProject[];
    organization: RadarOrganization;
    organizations: AppOrganization[];
    sourceTypes: AppSourceType[];
  };

  protected readonly ENTITY_NAME = ENTITY_NAME;
  protected readonly DialogMode = DialogMode;
  protected readonly ValidatorHint = ValidatorHint;
  protected readonly ValidatorError = ValidatorError;
  protected readonly ProjectStatus = ProjectStatus;

  formFields = this.configService.getFormFields();

  form = new FormGroup({
    id: new FormControl<string | number | undefined>({ value: undefined, disabled: true }, {nonNullable: true}),
    projectName: new FormControl<string | undefined>({value: '', disabled: this.dialogData.mode !== DialogMode.ADD}, {nonNullable: true, validators: [Validator.requiredValidator, Validator.stringIdValidator]}),
    humanReadableProjectName: new FormControl<string | undefined>('', {nonNullable: true, validators: [Validator.normalTextValidator]}),
    description: new FormControl<string | undefined>('', {validators: [Validator.longTextValidator], nonNullable: true}),
    location: new FormControl<string | undefined>('', {nonNullable: true, validators: [Validator.normalTextValidator]}),
    organizationName: new FormControl<string | undefined>({value: '', disabled: true}, {nonNullable: true}),
    organization: new FormControl<RadarOrganization | undefined>(this.dialogData.organization ?? this.dialogData.entity?.organization, {nonNullable: true, validators: [Validator.requiredValidator]}),
    projectStatus: new FormControl<ProjectStatus | undefined>(undefined, {nonNullable: true}),
    startDate: new FormControl<string | undefined>('', {nonNullable: true}),
    endDate: new FormControl<string | undefined>('', {nonNullable: true}),
    sourceTypes: new FormControl<RadarSourceType[] | undefined>(undefined, {nonNullable: true}),
    attributes: new FormGroup({
      "Work-package": new FormControl<string | undefined>('', {nonNullable: true, validators: [Validator.normalTextValidator]}),
      "Phase": new FormControl<string | undefined>('', {nonNullable: true, validators: [Validator.normalTextValidator]}),
      "External-project-url": new FormControl<string | undefined>('', {nonNullable: true, validators: [Validator.urlValidator]}),
      "External-project-id": new FormControl<string | undefined>('', {nonNullable: true, validators: [Validator.stringIdValidator]}),
      "Privacy-policy-url": new FormControl<string | undefined>('', {nonNullable: true, validators: [Validator.urlValidator]}),
    }),
  });

  loading$ = signal(false);
  error$ = signal<HttpErrorResponse | null>(null);

  @Output()
  dialogActionEvent = new EventEmitter<{ action: DialogMode, entity?: AppProject }>();

  private readonly formValueChanges = toSignal(
    this.form.valueChanges.pipe(debounceTime(300)),
    {initialValue: this.form.getRawValue()}
  );

  dateFormat = 'mm/dd/yyy';

  minDate: Date = new Date(2000, 0, 1);
  maxDate: Date = new Date(2050, 0, 1);

  constructor() {
    effect(() => {
      if (this.formValueChanges()) {
        this.error$.set(null);
      }
    });
  }

  ngOnInit() {
    console.log('Class: ProjectDialogComponent, Function: ngOnInit, Line 122 ' , this.dialogData);
    this.store?.select(locale)
      // ?.getLocale()
      // .pipe(takeUntil(this.subscription$))
      .subscribe((locale) => {
        // this.dateAdapter?.setLocale(locale.currentLanguage?.locale);
        this.dateFormat = locale.currentLanguage?.dateFormat || 'mm/dd/yyy';
      });

    this.form.controls.projectName.addValidators(this.duplicateValidator);
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
        control.value === entity.projectName &&
        this.dialogData.entity?.projectName !== entity.projectName
    )
      ? { duplicate: true }
      : null;
  };
}
