import {AfterViewInit, Component, EventEmitter, inject, Output, signal} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {AppSubject} from "../../models/subject";
import {AppProject} from "../../../project/models/project";
import {TranslatePipe} from "@ngx-translate/core";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {SubjectDialogMode} from '../../enums/dialog';
import {SubjectDetailsComponent} from '../../components/subject-details/subject-details.component';
import {SubjectConfigService} from '../../services/subject-config.service';
import {HttpErrorResponse} from '@angular/common/http';
import {DetailType} from '../../../../base-entities/enums/detail-type';
import {
  DialogBodyDescriptionComponent
} from '../../../../base-entities/containers/entity-dialog/dialog-body-description/dialog-body-description.component';

@Component({
  selector: 'app-subject-dialog-discontinue-dialog',
  templateUrl: './subject-dialog-discontinue.component.html',
  imports: [
    MatDialogTitle,
    TranslatePipe,
    MatDialogContent,
    DialogBodyDescriptionComponent,
    MatButton,
    MatDialogClose,
    MatIcon,
    MatProgressSpinner,
    MatIconButton,
    SubjectDetailsComponent
  ]
})
export class SubjectDialogDiscontinueComponent implements AfterViewInit {
  protected readonly DetailType = DetailType;
  protected readonly DialogMode = SubjectDialogMode;

  private configService = inject(SubjectConfigService);
  private dialogRef = inject(MatDialogRef<SubjectDialogDiscontinueComponent>);
  public dialogData = inject(MAT_DIALOG_DATA) as {
    entity: AppSubject;
    project: AppProject;
  };

  tableFields = this.configService.getTableFields();

  loading = signal(false);
  error = signal<HttpErrorResponse | null>(null);

  @Output()
  dialogActionEvent = new EventEmitter<{ action: SubjectDialogMode, entity?: AppSubject }>();

  ngAfterViewInit() {
    const dialogContainer = document.querySelector('.tailwind-slide-panel');
    setTimeout(() => {
      dialogContainer?.classList.add('dialog-enter-active');
    });
  }

  onAction($event: string) { //TODO DIALOG_ACTION
    this.error.set(null);
    this.loading.set(true);
    switch ($event) {
      case 'close':
        this.close();
        break;
      case 'delete':
        this.handleDeleteAction();
        break;
    }
  }

  private handleDeleteAction(): void {
    this.dialogActionEvent.emit({
      action: SubjectDialogMode.DISCONTINUE,
      entity: {...this.dialogData.entity, project: this.dialogData.project}
    });
  }

  close() {
    this.loading.set(false);
    const container = document.querySelector('.tailwind-slide-panel');
    container?.classList.remove('dialog-enter-active');
    container?.classList.add('dialog-exit-active');

    setTimeout(() => {
      this.dialogActionEvent.emit({action: SubjectDialogMode.CLOSE});
      this.dialogRef.close();
    }, 300);
  }

  errorHappened(error: HttpErrorResponse): void {
    this.loading.set(false);
    this.error.set(error);
  }
}
