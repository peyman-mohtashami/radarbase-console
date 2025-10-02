import {
  AfterViewInit,
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';

import { AppSubject } from "../../models/subject";
import {AppSource} from "../../../source/models/source";
import {TranslatePipe} from "@ngx-translate/core";
import {
  DialogBodyDescriptionComponent
} from "../../../../components/base-dialog/dialog-body-description/dialog-body-description.component";
import {MatCheckbox} from "@angular/material/checkbox";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {SubjectConfigService} from '../../services/subject-config.service';
import {SubjectDialogMode} from '../../enums/dialog';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {DetailType} from '../../../../enums/detail-type';
import {SubjectDetailsComponent} from '../../components/subject-details/subject-details.component';
import {SourceService} from '../../../source/services/source.service';
import {AsyncPipe} from '@angular/common';
import {TagComponent} from '../../../../components/tag/tag.component';

@Component({
  selector: 'rb-subject-dialog-pair-source',
  templateUrl: './subject-dialog-pair-source.component.html',
  imports: [
    TranslatePipe,
    MatDialogTitle,
    MatIconButton,
    MatDialogContent,
    DialogBodyDescriptionComponent,
    MatCheckbox,
    FormsModule,
    MatButton,
    MatDialogClose,
    MatIcon,
    MatProgressSpinner,
    SubjectDetailsComponent,
    AsyncPipe,
    ReactiveFormsModule,
    TagComponent,
  ]
})
export class SubjectDialogPairSourceComponent implements OnInit, AfterViewInit {
  private configService = inject(SubjectConfigService);
  private dialogRef = inject(MatDialogRef<SubjectDialogPairSourceComponent>);
  public dialogData = inject(MAT_DIALOG_DATA) as {
    mode: SubjectDialogMode;
    entity: AppSubject;
    projectName: string;
  };
  private sourceService = inject(SourceService);

  protected readonly DialogMode = SubjectDialogMode;
  protected readonly DetailType = DetailType;

  formFields = this.configService.getFormFields();
  tableFields = this.configService.getTableFields();

  sources$: Observable<AppSource[]> = this.sourceService.getWithQuery(this.dialogData.projectName).pipe(
    map(sources => sources.filter(s => !s.assigned))
  )

  loading$ = signal(false);
  error$ = signal<HttpErrorResponse | null>(null);

  @Output()
  dialogActionEvent = new EventEmitter<{ action: SubjectDialogMode, entity?: AppSubject }>();

  ngOnInit() {}

  ngAfterViewInit() {
    const dialogContainer = document.querySelector('.tailwind-slide-panel');
    setTimeout(() => {
      dialogContainer?.classList.add('dialog-enter-active');
    });
  }

  close() {
    this.loading$.set(false);
    const container = document.querySelector('.tailwind-slide-panel');
    container?.classList.remove('dialog-enter-active');
    container?.classList.add('dialog-exit-active');

    setTimeout(() => {
      this.dialogActionEvent.emit({action: SubjectDialogMode.CLOSE});
      this.dialogRef.close();
    }, 300);
  }

  errorHappened(error: HttpErrorResponse): void {
    this.loading$.set(false);
    this.error$.set(error);
  }

  // addSource(selectedSource: AppSource) {
  //   this.assignedSources?.push(selectedSource);
  //   if (this.assignableSources && this.assignableSources?.length > 0) {
  //     this.assignableSources = this.assignableSources.filter(
  //       (obj) => obj !== selectedSource
  //     );
  //   }
  // }
  //
  save() {
    this.loading$.set(false);
    // const assignedSources = this.dialogData.entity.sources?.filter((s) => s.assigned);
    // const assignedSources2 = this.assignableSources?.filter((s) => s.assigned);
    // const assignedSources = assignedSources1?.concat(assignedSources2 || []);
    // const subject = { ...this.dialogData.entity };
    // subject.sources = assignedSources;
    //
    // this.dialogActionEvent.emit({ action: SubjectDialogMode.EDIT, entity: subject });
  }


}
