import {AfterViewInit, Component, inject, OnInit} from "@angular/core";
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";

import {Validator} from "../../../../../shared/utils/validators";
import {AppProject, ProjectStatus} from "../../models/project";
import {AppOrganization, RadarOrganization} from "../../../organization/models/organization";
import {TranslatePipe} from "@ngx-translate/core";
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
  DialogActionsComponent
} from '../../../../components/dialog/dialog-actions/dialog-actions.component';
import {LocaleService} from "../../../../../core/locale/services/locale.service";
import {BaseDialogComponent} from '../../../../components/dialog/base-dialog.component';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorMessageBoxComponent} from '../../../../../shared/components/message-box/error-message-box.component';

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
    AsyncPipe,
    ErrorMessageBoxComponent,
  ]
})
export class ProjectDialogComponent extends BaseDialogComponent<AppProject> implements OnInit, AfterViewInit {
  protected localeService = inject(LocaleService);
  override configService = inject(ProjectConfigService);
  override dialogRef = inject(MatDialogRef<ProjectDialogComponent>);
  override dialogData = inject(MAT_DIALOG_DATA) as {
    mode: DialogMode;
    entity: AppProject;
    organization: RadarOrganization;
    projectFullList: Observable<AppProject[]>;
    organizationFullList: Observable<AppOrganization[]>;
    sourceTypeFullList: Observable<AppSourceType[]>;
  };

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router)

  protected readonly ProjectStatus = ProjectStatus;

  override formFields = this.configService.getFormFields();

  override form = new FormGroup({
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

  minDate: Date = new Date(2000, 0, 1);
  maxDate: Date = new Date(2050, 0, 1);

  projectFullList: AppProject[] = [];

  ngOnInit() {
    this.dialogData.projectFullList.subscribe(projects => {
      this.projectFullList = projects;
      this.form.controls.projectName.addValidators(this.duplicateValidator);
    })
    super.init();
  }

  ngAfterViewInit() {
    super.afterViewInit();
  }

  override handleSaveAction(): void {
    this.dialogActionEvent.emit({
      action: this.dialogData.mode,
      entity: {...this.dialogData.entity, ...this.form?.value},
    });
  }

  override handleDeleteAction(): void {
    this.dialogActionEvent.emit({action: this.dialogData.mode, entity: this.dialogData.entity});
  }

  private duplicateValidator = (control: AbstractControl) => {
    return this.projectFullList.find(
      (entity) =>
        control.value === entity.projectName &&
        this.dialogData.entity?.projectName !== entity.projectName
    )
      ? { duplicate: true }
      : null;
  };
}
