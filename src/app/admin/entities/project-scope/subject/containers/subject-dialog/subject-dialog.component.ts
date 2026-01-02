import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {FormControl, FormGroup, FormRecord, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {MatOption} from '@angular/material/core';

import {TranslatePipe} from "@ngx-translate/core";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatSelect, MatSuffix} from "@angular/material/select";
import {MatError} from "@angular/material/form-field";
import {AppSubject} from '../../models/subject';
import {AppGroup} from '../../../group/models/group';
import {SubjectConfigService} from '../../services/subject-config.service';
import {AppProject} from '../../../../main-scope/project/models/project';
import {SubjectDialogMode} from '../../enums/dialog';
import {SubjectDetailsComponent} from '../../components/subject-details/subject-details.component';
import {MatDynamicInputComponent} from '../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component';
import {LocaleService} from "../../../../../../core/locale/services/locale.service";
import {BaseEntityDialogComponent} from '../../../../../base-entities/containers/entity-dialog/base-entity-dialog.component';
import {DetailType} from '../../../../../base-entities/enums/detail-type';
import {
  DialogActionsComponent
} from '../../../../../base-entities/containers/entity-dialog/dialog-actions/dialog-actions.component';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {ErrorMessageBoxComponent} from '../../../../../../shared/components/message-box/error-message-box.component';
import {
  DialogTitleComponent
} from '../../../../../base-entities/containers/entity-dialog/dialog-title/dialog-title.component';

@Component({
  selector: 'app-subject-dialog',
  templateUrl: './subject-dialog.component.html',
  imports: [
    TranslatePipe,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatSelect,
    MatOption,
    MatError,
    MatSuffix,
    SubjectDetailsComponent,
    MatDynamicInputComponent,
    AsyncPipe,
    ErrorMessageBoxComponent,
    DialogTitleComponent,
    DialogActionsComponent,
  ]
})
export class SubjectDialogComponent extends BaseEntityDialogComponent<AppSubject> implements OnInit, AfterViewInit {
  protected readonly SubjectDialogMode = SubjectDialogMode;
  protected readonly DetailType = DetailType;

  localeService = inject(LocaleService);

  override configService = inject(SubjectConfigService);
  override dialogRef = inject(MatDialogRef<SubjectDialogComponent>);
  override dialogData = inject(MAT_DIALOG_DATA) as {
    mode: SubjectDialogMode;
    entity: AppSubject;
    project: AppProject;
    groupFullList: Observable<AppGroup[]>;
  };

  override formFields = this.configService.getFormFields();

  tableFields = this.configService.getTableFields();
  extraFields = this.configService.getExtraFields();

  override form = new FormGroup({
    id: new FormControl<string | number | undefined>({ value: undefined, disabled: true }, {nonNullable: true}),
    login: new FormControl<string | undefined>({ value: undefined, disabled: true }, {nonNullable: true}),
    personName: new FormControl<string | undefined>(undefined, {nonNullable: true}),
    dateOfBirth: new FormControl<Date | undefined>(undefined, {nonNullable: true}),
    externalId: new FormControl<string | undefined>(undefined, {nonNullable: true}),
    externalLink: new FormControl<string | undefined>(undefined, {nonNullable: true}),
    group: new FormControl<string | undefined>(undefined, {nonNullable: true}),
    // attributes: new FormGroup<Record<string, FormControl<string | undefined>>>({
    //   humanReadableIdentifier: new FormControl<string | undefined>(undefined, {nonNullable: true}),
    //   participant_group: new FormControl<string | undefined>(undefined, {nonNullable: true}),
    // }),
    attributes: new FormRecord<FormControl<string | undefined>>({
      humanReadableIdentifier: new FormControl<string | undefined>(undefined, {nonNullable: true}),
      participant_group: new FormControl<string | undefined>(undefined, {nonNullable: true}),
    }),
    // attributes: new FormGroup({
    //   humanReadableIdentifier: new FormControl<string | undefined>(undefined, {nonNullable: true}),
    //   participant_group: new FormControl<string | undefined>(undefined, {nonNullable: true}),
    // }),
  });

  ngOnInit() {
    this.extraFields?.forEach((field: { name: string }) => {
      this.form.controls.attributes.addControl(
        field.name,
        new FormControl<string | undefined>(undefined, {validators: null, nonNullable: true})
      );
    });
    // this.extraFields?.forEach((field: any) => {
    //   this.form.controls.attributes.addControl(field.name, new FormControl<string | undefined>(undefined, {validators: null, nonNullable: true}));
    // });
    super.init();
  }

  ngAfterViewInit() {
    super.afterViewInit();
  }

  // override handleSaveAction(): void {
  //   this.dialogActionEvent.emit({
  //     action: this.dialogData.mode,
  //     entity: {...this.dialogData.entity, ...this.form?.value, project: this.dialogData.project}, // TODO if project is not set (DialogMode ADD)
  //   });
  // }

  override handleSaveAction(): void {
    this.dialogActionEvent.emit({
      action: this.dialogData.mode,
      entity: {
        ...(this.dialogData.entity ?? ({} as AppSubject)),
        ...(this.form.getRawValue() as Partial<AppSubject>),
        enableEmptySecret: null,
      } as AppSubject,
    });
  }

  override handleDeleteAction(): void {
    this.dialogActionEvent.emit({action: this.dialogData.mode, entity: this.dialogData.entity});
  }
}
