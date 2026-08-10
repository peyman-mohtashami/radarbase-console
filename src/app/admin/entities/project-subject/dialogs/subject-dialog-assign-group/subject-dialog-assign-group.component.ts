import {
  Component,
  inject,
  AfterViewInit, signal
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef, MatDialogTitle,
} from '@angular/material/dialog';

import {TranslatePipe} from "@ngx-translate/core";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {SubjectConfigService} from '../../services/subject-config.service';
import {SubjectDialogMode} from '../../enums/dialog';
import {DetailType} from '../../../../shared/enums/detail-type';
import {JsonPipe} from '@angular/common';
import {ErrorMessageBoxComponent} from '../../../../../shared/components/message-box/error-message-box.component';
import {AppSubject} from '../../models/subject';
import {AppGroup, GroupDto} from '../../../project-group/models/group';
import {SubjectStore} from '../../services/subject.store';
import {animateDialogIn, animateDialogOut} from '../../../../shared/utils/dialog.util';
import {form} from '@angular/forms/signals';
import {
  SearchableMultiSelectComponent
} from '../../../../../shared/components/searchable-multi-select/searchable-multi-select';

export interface AssignSubjectsToGroupForm {
  group: GroupDto | null,
}

export interface StoredAssignSubjectsToGroupsDialog {
  mode: SubjectDialogMode;
  entity?: AppSubject;
  model: AssignSubjectsToGroupForm;
}


@Component({
  selector: 'app-subject-dialog-assign-group-dialog',
  templateUrl: './subject-dialog-assign-group.component.html',
  imports: [
    TranslatePipe,
    MatDialogContent,
    MatButton,
    MatDialogClose,
    MatIcon,
    MatProgressSpinner,
    ErrorMessageBoxComponent,
    MatDialogTitle,
    JsonPipe,
    SearchableMultiSelectComponent
  ]
})
export class SubjectDialogAssignGroupComponent implements AfterViewInit {
  protected readonly SubjectDialogMode = SubjectDialogMode;
  protected readonly DetailType = DetailType;

  protected store = inject(SubjectStore);
  protected configService = inject(SubjectConfigService);
  private dialogRef = inject(MatDialogRef<SubjectDialogAssignGroupComponent>);

  protected dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: string;
    groupFullList: AppGroup[];
    selectedSubjects: AppSubject[];
    restoredModel: AssignSubjectsToGroupForm;
  };


  tableFields = this.configService.getTableFields();
  formFields = this.configService.getFormFields();

  private model = signal<AssignSubjectsToGroupForm>(this.dialogData.restoredModel ?? {
    group: null,
  });

  protected form = form(this.model);

  ngAfterViewInit() {
    animateDialogIn(this.dialogData.id);
  }

  protected async assign(): Promise<void> {
    const groupName = this.model().group?.name;
    if (!groupName) return;
    await this.store.addSubjectsToGroup(groupName, this.dialogData.selectedSubjects);

    if (this.store.error()) return;

    this.configService.clearDialogState();
    this.dialogRef.close();
  }

  close() {
    this.configService.clearDialogState();
    animateDialogOut(this.dialogData.id, this.dialogRef);
  }
}
