import {
  Component,
  inject,
  AfterViewInit, signal
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatOption} from '@angular/material/core';

import {TranslatePipe} from "@ngx-translate/core";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatSelect, MatSuffix} from "@angular/material/select";
import {MatError} from "@angular/material/form-field";
import {AppSubject, CreateSubjectDto, UpdateSubjectDto} from '../../models/subject';
import {SubjectConfigService} from '../../services/subject-config.service';
import {AppProject} from '../../../project/models/project';
import {SubjectDialogMode} from '../../enums/dialog';
import {SubjectDetailsComponent} from '../../components/subject-details/subject-details.component';
import {MatDynamicInputComponent} from '../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component';
import {
  DialogAction,
  DialogActionsComponent
} from '../../../../base-entities/containers/entity-dialog/dialog-actions/dialog-actions.component';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {ErrorMessageBoxComponent} from '../../../../../shared/components/message-box/error-message-box.component';
import {ActivatedRoute, Router} from '@angular/router';
import {animateDialogIn, animateDialogOut} from '../../../../shared/utils/dialog.util';
import {SubjectStore} from '../../services/subject.store';
import {form, FormField} from '@angular/forms/signals';
import {DetailType} from '../../../../base-entities/enums/detail-type';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {LocaleService} from '../../../../../core/locale/services/locale.service';
import {AppGroup} from '../../../project-group/models/group';

export interface SubjectForm {
  id: string;
  login: string,
  personName: string;
  dateOfBirth: string;
  externalId: string,
  externalLink: string,
  group: string,
  attributes: Record<string, string>,
}

@Component({
  selector: 'app-subject-dialog',
  templateUrl: './subject-dialog.component.html',
  imports: [
    TranslatePipe,
    MatDialogContent,
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
    DialogActionsComponent,
    MatDialogTitle,
    MatButton,
    MatDialogActions,
    MatIcon,
    MatProgressSpinner,
    JsonPipe,
    FormField,
  ]
})
export class SubjectDialogComponent implements AfterViewInit {
  protected readonly DialogMode = SubjectDialogMode;
  protected readonly DialogAction = DialogAction;

  protected localeService = inject(LocaleService);
  protected store = inject(SubjectStore);
  protected configService = inject(SubjectConfigService);
  private dialogRef = inject(MatDialogRef<SubjectDialogComponent>);
  private router = inject(Router);
  protected activatedRoute = inject(ActivatedRoute);

  tableFields = this.configService.getTableFields();
  extraFields = this.configService.getExtraFields();

  protected dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: SubjectDialogMode;
    entity?: AppSubject;
    project: AppProject;
    groupFullList: AppGroup[];
  };

  formFields = this.configService.getFormFields();

  private model = signal<SubjectForm>({
    ...this.dialogData.entity,
    id: `${this.dialogData.entity?.id ?? ''}`,
    login: this.dialogData.entity?.login ?? '',
    personName: this.dialogData.entity?.personName ?? '',
    dateOfBirth: this.dialogData.entity?.dateOfBirth ?? '',
    externalId: this.dialogData.entity?.externalId ?? '',
    externalLink: this.dialogData.entity?.externalLink ?? '',
    group: this.dialogData.entity?.group ?? '',
    attributes: {
      ...this.dialogData.entity?.attributes,
      ...this.extraFields?.reduce((acc: Record<string, string>, cur) => {
        acc[cur.name] = this.dialogData.entity?.attributes?.[cur.name] ?? '';
        return acc;
      }, {})
    },
  });

  protected form = form(this.model);

  ngAfterViewInit() {
    animateDialogIn(this.dialogData.id);
  }

  async onAction($event: DialogAction) {
    switch ($event) {
      case DialogAction.CLOSE:
        this.close();
        break;
      case DialogAction.DELETE:
        await this.handleDeleteAction();
        break;
      case DialogAction.SAVE:
        await this.handleSaveAction();
        break;
    }
  }

  protected async handleSaveAction(): Promise<void> {
    this.configService.setLatestFormEntry(this.model());

    if (this.dialogData.mode === SubjectDialogMode.ADD) {
      await this.store.add(this.toCreateDtoModel(this.model()));
    } else if (this.dialogData.mode === SubjectDialogMode.EDIT) {
      await this.store.update(this.toUpdateDtoModel(this.model()));
    }

    if (this.store.error()) return;

    this.configService.setLatestFormEntry(null);
    this.dialogRef.close();
    this.navigateOnUpdateSuccess(this.model().login);
  }

  protected async handleDeleteAction(): Promise<void> {
    await this.store.delete(this.dialogData.entity!);
    this.configService.setLatestFormEntry(null);
    this.dialogRef.close();
    this.navigateOnDeleteSuccess();
  }



  close() {
    animateDialogOut(this.dialogData.id, this.dialogRef);
  }

  navigateOnUpdateSuccess(entityName: string) {
    const selectedOrganization = this.store.selected();
    if (!selectedOrganization) return;



    const urlTree = this.router.parseUrl(this.router.url);
    const primaryRoute = urlTree.root.children['primary'];

    if (!primaryRoute) {
      return;
    }

    const segments = primaryRoute.segments.map(segment => segment.path);
    const organizationsIndex = segments.indexOf('organizations');
    const organizationNameIndex = organizationsIndex + 1;

    const hasOrganizationNameInUrl =
      organizationsIndex !== -1 &&
      organizationNameIndex < segments.length;

    if (!hasOrganizationNameInUrl) {
      return;
    }

    segments[organizationNameIndex] = entityName;

    this.router.navigate(segments, {queryParams: urlTree.queryParams}).then();
  }

  navigateOnDeleteSuccess() {
    this.router.navigate(['/admin/organizations'], { queryParamsHandling: 'preserve' }).then();
  }

  toCreateDtoModel(model: SubjectForm): CreateSubjectDto {
    return {
      ...model,
    };
  }

  toUpdateDtoModel(model: SubjectForm): UpdateSubjectDto {
    return {
      ...model,
      id: Number(model.id),
    };
  }






  // override handleSaveAction(): void {
  //   this.dialogActionEvent.emit({
  //     action: this.dialogData.mode,
  //     entity: {
  //       ...(this.dialogData.entity ?? ({} as AppSubject)),
  //       ...(this.form.getRawValue() as Partial<AppSubject>),
  //       project: this.dialogData.project
  //     } as AppSubject,
  //   });
  // }
  //
  // override handleDeleteAction(): void {
  //   this.dialogActionEvent.emit({action: this.dialogData.mode, entity: this.dialogData.entity});
  // }
  protected readonly SubjectDialogMode = SubjectDialogMode;
  protected readonly DetailType = DetailType;
}
