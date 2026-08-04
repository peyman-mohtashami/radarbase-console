import {
  Component,
  inject, AfterViewInit
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef, MatDialogTitle,
} from '@angular/material/dialog';

import {AppSubject, UpdateSubjectDto} from "../../models/subject";
import {TranslatePipe} from "@ngx-translate/core";
import {MatCheckbox} from "@angular/material/checkbox";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {SubjectConfigService} from '../../services/subject-config.service';
import {SubjectDialogMode} from '../../enums/dialog';
import {DetailType} from '../../../../shared/enums/detail-type';
import {SubjectDetailsComponent} from '../../components/subject-details/subject-details.component';
import {AppProject} from '../../../project/models/project';
import {TagComponent} from '../../../../../shared/components/tag/tag.component';
import {ErrorMessageBoxComponent} from '../../../../../shared/components/message-box/error-message-box.component';
import {AppSource} from '../../../project-source/models/source';
import {animateDialogIn, animateDialogOut} from '../../../../shared/utils/dialog.util';
import {getLastSegment} from '../../../../shared/utils/route.util';
import {SubjectStore} from '../../services/subject.store';
import {JsonPipe} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-subject-dialog-pair-source',
  templateUrl: './subject-dialog-pair-source.component.html',
  imports: [
    TranslatePipe,
    MatDialogContent,
    MatCheckbox,
    FormsModule,
    MatButton,
    MatIcon,
    MatProgressSpinner,
    SubjectDetailsComponent,
    ReactiveFormsModule,
    TagComponent,
    ErrorMessageBoxComponent,
    MatDialogTitle,
    JsonPipe,
  ]
})
export class SubjectDialogPairSourceComponent implements AfterViewInit {
  protected readonly SubjectDialogMode = SubjectDialogMode;
  protected readonly DetailType = DetailType;

  protected store = inject(SubjectStore);
  protected configService = inject(SubjectConfigService);
  private dialogRef = inject(MatDialogRef<SubjectDialogPairSourceComponent>);
  private router = inject(Router);

  protected dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: SubjectDialogMode;
    entity: AppSubject;
    project: AppProject;
    sourcesFullList: AppSource[];
  };


  formFields = this.configService.getFormFields();
  tableFields = this.configService.getTableFields();

  unAssignedSources = [...this.dialogData.sourcesFullList.filter(s => !s.assigned)];

  ngAfterViewInit() {
    animateDialogIn(this.dialogData.id);
  }

  protected async save(): Promise<void> {
    await this.store.update(this.toUpdateDtoModel(this.dialogData.entity));

    if (this.store.error()) return;

    this.configService.clearDialogState();
    this.dialogRef.close();
    this.navigateOnUpdateSuccess(this.dialogData.entity);
  }

  close() {
    this.configService.clearDialogState();
    animateDialogOut(this.dialogData.id, this.dialogRef);
  }

  navigateOnUpdateSuccess(model: AppSubject) {
    const selectedSubject = this.store.selected();
    if (!selectedSubject) return;

    const project = this.dialogData.project;
    const urlTree = this.router.parseUrl(this.router.url);
    this.router.navigate(['./admin/organizations', project.organization.name, 'projects', project.projectName, 'subjects', model.login, getLastSegment(urlTree)], {queryParams: urlTree.queryParams}).then();
  }

  toUpdateDtoModel(model: AppSubject): UpdateSubjectDto {
    return {
      id: Number(model.id),
      login: model.login,
      externalLink: model.externalLink || undefined,
      externalId: model.externalId || undefined,
      dateOfBirth: model.dateOfBirth || undefined,
      group: model.group || null,
      personName: model.personName || undefined,
      project: this.dialogData.project,
      sources: this.unAssignedSources.filter(s => s.assigned),
      status: this.dialogData.entity?.status,
      attributes: model.attributes
    };
  }
}

