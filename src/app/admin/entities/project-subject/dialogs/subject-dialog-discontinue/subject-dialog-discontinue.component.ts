import {Component, inject, ChangeDetectionStrategy} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef, MatDialogTitle,
} from '@angular/material/dialog';
import {AppSubject} from "../../models/subject";
import {AppProject} from "../../../project/models/project";
import {TranslatePipe} from "@ngx-translate/core";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {SubjectDialogMode} from '../../enums/dialog';
import {SubjectDetailsComponent} from '../../components/subject-details/subject-details.component';
import {SubjectConfigService} from '../../services/subject-config.service';
import {DetailType} from '../../../../base-entities/enums/detail-type';
import {
  BaseEntityDialogComponent
} from '../../../../base-entities/containers/entity-dialog/base-entity-dialog.component';
import {
  DialogAction,
} from '../../../../base-entities/containers/entity-dialog/dialog-actions/dialog-actions.component';
import {ErrorMessageBoxComponent} from '../../../../../shared/components/message-box/error-message-box.component';

@Component({
  selector: 'app-subject-dialog-discontinue-dialog',
  templateUrl: './subject-dialog-discontinue.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    TranslatePipe,
    MatDialogContent,
    MatButton,
    MatIcon,
    MatProgressSpinner,
    SubjectDetailsComponent,
    ErrorMessageBoxComponent,
    MatDialogTitle
  ]
})
export class SubjectDialogDiscontinueComponent extends BaseEntityDialogComponent<AppSubject> {
  protected readonly DetailType = DetailType;
  protected readonly SubjectDialogMode = SubjectDialogMode;
  protected readonly DialogAction = DialogAction;

  protected override configService = inject(SubjectConfigService);
  protected override dialogRef = inject(MatDialogRef<SubjectDialogDiscontinueComponent>);
  override dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: SubjectDialogMode;
    entity: AppSubject;
    project: AppProject;
  };

  override handleDeleteAction(): void {
    this.dialogActionEvent.emit({
      action: SubjectDialogMode.DISCONTINUE,
      entity: {...this.dialogData.entity, project: this.dialogData.project}
    });
  }
}
