import {AfterViewInit, Component, effect, EventEmitter, inject, OnInit, Output, signal} from "@angular/core";
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";

import {Validator, ValidatorError, ValidatorHint} from "../../../../../shared/utils/validators";
import {AppProject, ProjectStatus} from "../../models/project";
import {AppOrganization, RadarOrganization} from "../../../organization/models/organization";
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
import {DialogTitleComponent} from '../../../../components/dialog/dialog-title/dialog-title.component';
import {
  DialogBodyDescriptionComponent
} from '../../../../components/dialog/dialog-body-description/dialog-body-description.component';
import {
  DialogAction,
  DialogActionsComponent
} from '../../../../components/dialog/dialog-actions/dialog-actions.component';
import {LocaleService} from "../../../../../core/locale/services/locale.service";

@Component({
  selector: 'app-project-dialog',
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
  protected localeService = inject(LocaleService);
  protected configService = inject(ProjectConfigService);
  private dialogRef = inject(MatDialogRef<ProjectDialogComponent>);
  protected dialogData = inject(MAT_DIALOG_DATA) as {
    mode: DialogMode;
    entity: AppProject;
    entities: AppProject[];
    organization: RadarOrganization;
    organizations: AppOrganization[];
    sourceTypes: AppSourceType[];
  };

  protected readonly DialogMode = DialogMode;
  protected readonly ValidatorHint = ValidatorHint;
  protected readonly ValidatorError = ValidatorError;
  protected readonly ProjectStatus = ProjectStatus;

  formFields = this.configService.getFormFields();

  form = new FormGroup({
    id: new FormControl<string | number>({ value: '', disabled: true }, {nonNullable: true}),
    projectName: new FormControl<string>(
      {value: '', disabled: this.dialogData.mode !== DialogMode.ADD},
      {nonNullable: true, validators: [Validator.requiredValidator, Validator.stringIdValidator]}
    ),
    humanReadableProjectName: new FormControl<string>('', {validators: [Validator.normalTextValidator]}),
    description: new FormControl<string>('', {validators: [Validator.longTextValidator]}),
    location: new FormControl<string>(''), //TODO, validators: [Validator.normalTextValidator]}),
    organizationName: new FormControl<string>({value: '', disabled: true}),
    organization: new FormControl<RadarOrganization>(
      this.dialogData.organization ?? this.dialogData.entity?.organization,
      {nonNullable: true, validators: [Validator.requiredValidator]}
    ),
    projectStatus: new FormControl<ProjectStatus | null>(null, {nonNullable: true}),
    startDate: new FormControl<string>(''),
    endDate: new FormControl<string>(''),
    sourceTypes: new FormControl<RadarSourceType[]>([]),
    attributes: new FormGroup<Record<string, FormControl<string | null | undefined>> | null | undefined>({
      "Work-package": new FormControl<string>(''),//TODO, validators: [Validator.normalTextValidator]}),
      "Phase": new FormControl<string>(''),//TODO, validators: [Validator.normalTextValidator]}),
      "External-project-url": new FormControl<string>(''),//TODO, validators: [Validator.urlValidator]}),
      "External-project-id": new FormControl<string>(''),//TODO, validators: [Validator.stringIdValidator]}),
      "Privacy-policy-url": new FormControl<string>(''),//TODO, validators: [Validator.urlValidator]}),
    }),
  });

  loading = signal(false);
  error = signal<HttpErrorResponse | null>(null);

  @Output() //TODO
  dialogActionEvent = new EventEmitter<{ action: DialogMode, entity?: AppProject }>();

  private readonly formValueChanges = toSignal(
    this.form.valueChanges.pipe(debounceTime(300)),
    {initialValue: this.form.getRawValue()}
  );

  minDate: Date = new Date(2000, 0, 1);
  maxDate: Date = new Date(2050, 0, 1);

  constructor() {
    effect(() => {
      if (this.formValueChanges()) {
        this.error.set(null);
      }
    });
  }

  ngOnInit() {
    this.form.controls.projectName.addValidators(this.duplicateValidator);
    this.form.patchValue(this.dialogData.entity);
  }

  ngAfterViewInit() {
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
    this.loading.set(false);
    const container = document.querySelector('.tailwind-slide-panel');
    container?.classList.remove('dialog-enter-active');
    container?.classList.add('dialog-exit-active');

    setTimeout(() => {
      this.dialogActionEvent.emit({action: DialogMode.CLOSE});
      this.dialogRef.close();
    }, 300);
  }

  errorHappened(error: HttpErrorResponse): void {
    this.loading.set(false);
    this.error.set(error);
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
