import {
  Component,
  inject,
  AfterViewInit, signal, effect
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';

import {TranslatePipe} from "@ngx-translate/core";
import {AppSubject, CreateSubjectDto, UpdateSubjectDto} from '../../models/subject';
import {SubjectConfigService} from '../../services/subject-config.service';
import {AppProject} from '../../../project/models/project';
import {SubjectDialogMode} from '../../enums/dialog';
import {SubjectDetailsComponent} from '../../components/subject-details/subject-details.component';
import {JsonPipe} from '@angular/common';
import {ErrorBoxComponent} from '../../../../../shared/components/error-box/error-box.component';
import {ActivatedRoute, Router} from '@angular/router';
import {animateDialogIn, animateDialogOut} from '../../../../shared/utils/dialog.util';
import {SubjectStore} from '../../services/subject.store';
import {form} from '@angular/forms/signals';
import {DetailType} from '../../../../shared/models/table.model';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {LocaleService} from '../../../../../core/locale/services/locale.service';
import {AppGroup, GroupDto} from '../../../project-group/models/group';
import {getLastSegment} from '../../../../shared/utils/route.util';
import {
  SearchableMultiSelectComponent
} from '../../../../../shared/components/form-fields/searchable-multi-select/searchable-multi-select';
import {
  InputFormFieldComponent
} from '../../../../../shared/components/form-fields/input-form-field/input-form-field.component';
import {
  DateFormFieldComponent
} from '../../../../../shared/components/form-fields/date-form-field/date-form-field.component';
import {DialogMode} from '../../../../shared/models/dialog.model';

export interface SubjectForm {
  id: string;
  login: string,
  personName: string;
  dateOfBirth: string;
  externalId: string,
  externalLink: string,
  group: GroupDto | null,
  attributes: Record<string, string>,
}

export interface StoredSubjectDialog {
  mode: SubjectDialogMode;
  entity?: AppSubject;
  model: SubjectForm;
}

@Component({
  selector: 'app-subject-dialog',
  templateUrl: './subject-dialog.component.html',
  imports: [
    TranslatePipe,
    MatDialogContent,
    SubjectDetailsComponent,
    ErrorBoxComponent,
    MatDialogTitle,
    MatButton,
    MatDialogActions,
    MatIcon,
    MatProgressSpinner,
    JsonPipe,
    SearchableMultiSelectComponent,
    InputFormFieldComponent,
    DateFormFieldComponent,
  ]
})
export class SubjectDialogComponent implements AfterViewInit {
  protected readonly SubjectDialogMode = SubjectDialogMode;
  protected readonly DetailType = DetailType;

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
    restoredModel?: SubjectForm;
  };

  formFields = this.configService.getFormFields();

  private model = signal<SubjectForm>(this.dialogData.restoredModel ?? {
    ...this.dialogData.entity,
    id: `${this.dialogData.entity?.id ?? ''}`,
    login: this.dialogData.entity?.login ?? '',
    personName: this.dialogData.entity?.personName ?? '',
    dateOfBirth: this.dialogData.entity?.dateOfBirth ?? '',
    externalId: this.dialogData.entity?.externalId ?? '',
    externalLink: this.dialogData.entity?.externalLink ?? '',
    group: this.dialogData.groupFullList.find(g => g.name === this.dialogData.entity?.group) ?? null,
    attributes: {
      ...this.dialogData.entity?.attributes,
      'humanReadableIdentifier': this.dialogData.entity?.attributes?.['humanReadableIdentifier'] ?? '',
      'participant_group': this.dialogData.entity?.attributes?.['participant_group'] ?? '',
      // ...this.extraFields?.reduce((acc: Record<string, string>, cur: any) => {
      //   acc[cur.name] = this.dialogData.entity?.attributes?.[cur.name] ?? '';
      //   return acc;
      // }, {}),
    },
  });

  protected form = form(this.model);

  constructor() {
    effect(() => {
      const model = this.model();
      if (this.dialogData.mode === SubjectDialogMode.ADD || this.dialogData.mode === SubjectDialogMode.EDIT) {
        this.configService.setDialogState({
          mode: this.dialogData.mode,
          entity: this.dialogData.entity,
          model,
        });
      }
    });
  }

  ngAfterViewInit() {
    animateDialogIn(this.dialogData.id);
  }

  protected async save(): Promise<void> {
    switch(this.dialogData.mode) {
      case SubjectDialogMode.ADD:
        await this.store.add(this.toCreateDtoModel(this.model()));
        break;
      case SubjectDialogMode.EDIT:
        await this.store.update(this.toUpdateDtoModel(this.model()));
        break;
    }

    if (this.store.error()) return;

    this.configService.clearDialogState();
    this.dialogRef.close();
    this.navigateOnUpdateSuccess(this.model());
  }

  protected async delete(): Promise<void> {
    await this.store.delete(this.dialogData.entity!);
    this.configService.clearDialogState();
    this.dialogRef.close();
    this.navigateOnDeleteSuccess();
  }

  close() {
    this.configService.clearDialogState();
    animateDialogOut(this.dialogData.id, this.dialogRef);
  }

  navigateOnUpdateSuccess(model: SubjectForm) {
    const selectedSubject = this.store.selected();
    if (!selectedSubject) return;

    const project = this.dialogData.project;
    const urlTree = this.router.parseUrl(this.router.url);
    this.router.navigate(['./admin/organizations', project.organization.name, 'projects', project.projectName, 'subjects', model.login, getLastSegment(urlTree)], {queryParams: urlTree.queryParams}).then();
  }

  navigateOnDeleteSuccess() {
    const project = this.dialogData.project;
    this.router.navigate(['./admin/organizations', project.organization.name, 'projects', project.projectName, 'subjects'], {queryParamsHandling: 'preserve'}).then();
  }

  toCreateDtoModel(model: SubjectForm): CreateSubjectDto {
    return {
      externalLink: model.externalLink || undefined,
      externalId: model.externalId || undefined,
      dateOfBirth: model.dateOfBirth || undefined,
      group: model.group?.name ?? null,
      personName: model.personName || undefined,
      project: this.dialogData.project,
      sources: [],
      status: 1,
      attributes: model.attributes
    }
  }

  toUpdateDtoModel(model: SubjectForm): UpdateSubjectDto {
    return {
      id: Number(model.id),
      login: model.login,
      externalLink: model.externalLink || undefined,
      externalId: model.externalId || undefined,
      dateOfBirth: model.dateOfBirth || undefined,
      group: model.group?.name ?? null,
      personName: model.personName || undefined,
      project: this.dialogData.project,
      sources: [],
      status: this.dialogData.entity?.status,
      attributes: model.attributes
    };
  }

  protected readonly DialogMode = DialogMode;
}
