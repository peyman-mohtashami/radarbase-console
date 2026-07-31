import {Component, inject, AfterViewInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef, MatDialogTitle,
} from '@angular/material/dialog';
import {AppSubject, UpdateSubjectDto} from "../../models/subject";
import {AppProject} from "../../../project/models/project";
import {TranslatePipe} from "@ngx-translate/core";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {SubjectDialogMode} from '../../enums/dialog';
import {SubjectDetailsComponent} from '../../components/subject-details/subject-details.component';
import {SubjectConfigService} from '../../services/subject-config.service';
import {DetailType} from '../../../../base-entities/enums/detail-type';
import {ErrorMessageBoxComponent} from '../../../../../shared/components/message-box/error-message-box.component';
import {animateDialogIn, animateDialogOut} from '../../../../shared/utils/dialog.util';
import {SubjectStore} from '../../services/subject.store';
import {Router} from '@angular/router';
import {JsonPipe} from '@angular/common';
import {getLastSegment} from '../../../../shared/utils/route.util';

@Component({
  selector: 'app-subject-dialog-discontinue-dialog',
  templateUrl: './subject-dialog-discontinue.component.html',
  imports: [
    TranslatePipe,
    MatDialogContent,
    MatButton,
    MatIcon,
    MatProgressSpinner,
    SubjectDetailsComponent,
    ErrorMessageBoxComponent,
    MatDialogTitle,
    JsonPipe
  ]
})
export class SubjectDialogDiscontinueComponent implements AfterViewInit {
  protected readonly SubjectDialogMode = SubjectDialogMode;
  protected readonly DetailType = DetailType;

  protected store = inject(SubjectStore);
  protected configService =  inject(SubjectConfigService);
  private dialogRef = inject(MatDialogRef<SubjectDialogDiscontinueComponent>);
  private router = inject(Router);

  protected dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: SubjectDialogMode;
    entity: AppSubject;
    project: AppProject;
  };

  formFields = this.configService.getFormFields();

  ngAfterViewInit() {
    animateDialogIn(this.dialogData.id);
  }

  protected async discontinue(): Promise<void> {
    await this.store.discontinue(this.toUpdateDtoModel(this.dialogData.entity!));
    this.configService.clearDialogState();
    this.dialogRef.close();
    this.navigateOnDiscontinueSuccess();
  }

  close() {
    this.configService.clearDialogState();
    animateDialogOut(this.dialogData.id, this.dialogRef);
  }

  navigateOnDiscontinueSuccess() {
    const selectedSubject = this.store.selected();
    if (!selectedSubject) return;

    const project = this.dialogData.project;
    const urlTree = this.router.parseUrl(this.router.url);
    this.router.navigate(['./admin/organizations', project.organization.name, 'projects', project.projectName, 'subjects', this.dialogData.entity.login, getLastSegment(urlTree)], {queryParams: urlTree.queryParams}).then();
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
      sources: [],
      status: this.dialogData.entity?.status,
      attributes: model.attributes
    };
  }
}
