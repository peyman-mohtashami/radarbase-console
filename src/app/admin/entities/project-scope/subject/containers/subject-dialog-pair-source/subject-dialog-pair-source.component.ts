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

import {AppSubject} from "../../models/subject";
import {AppSource} from "../../../source/models/source";
import {TranslatePipe} from "@ngx-translate/core";
import {MatCheckbox} from "@angular/material/checkbox";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {SubjectConfigService} from '../../services/subject-config.service';
import {SubjectDialogMode} from '../../enums/dialog';
import {map} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {DetailType} from '../../../../../base-entities/enums/detail-type';
import {SubjectDetailsComponent} from '../../components/subject-details/subject-details.component';
import {SourceService} from '../../../source/services/source.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {AppProject} from '../../../../main-scope/project/models/project';
import {
  DialogBodyDescriptionComponent
} from '../../../../../base-entities/containers/entity-dialog/dialog-body-description/dialog-body-description.component';
import {TagComponent} from '../../../../../../shared/components/tag/tag.component';

@Component({
  selector: 'app-subject-dialog-pair-source',
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
    project: AppProject;
  };
  private sourceService = inject(SourceService);

  protected readonly DialogMode = SubjectDialogMode;
  protected readonly DetailType = DetailType;

  formFields = this.configService.getFormFields();
  tableFields = this.configService.getTableFields();

  // sources$: Observable<AppSource[]> = this.sourceService.getWithQuery(this.dialogData.projectName).pipe(
  //   map(sources => sources.filter(s => !s.assigned))
  // )

  sources = toSignal(
    this.sourceService.getWithQuery(undefined, this.dialogData.project.projectName).pipe(
      map(sources => sources.filter(s => !s.assigned))
    ),
    {initialValue: [] as AppSource[]}
  );


  loading = signal(false);
  error = signal<HttpErrorResponse | null>(null);

  @Output()
  dialogActionEvent = new EventEmitter<{ action: SubjectDialogMode, entity?: AppSubject }>();

  ngOnInit() {
  }

  ngAfterViewInit() {
    const dialogContainer = document.querySelector('.tailwind-slide-panel');
    setTimeout(() => {
      dialogContainer?.classList.add('dialog-enter-active');
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
    this.loading.set(false);
    // console.log('Class: SubjectDialogPairSourceComponent, Function: save, Line 124 this.dialogData.entity.sources' , this.dialogData.entity.sources);
    // console.log('Class: SubjectDialogPairSourceComponent, Function: save, Line 134 this.sources$()' , this.sources$());

    const addedSources = this.sources().filter(s => s.assigned).map(s => {
      return {
        id: s.id,
        sourceTypeId: s.sourceType?.id,
        sourceTypeProducer: s.sourceType?.producer,
        sourceTypeModel: s.sourceType?.model,
        sourceTypeCatalogVersion: s.sourceType?.catalogVersion,
        expectedSourceName: s.expectedSourceName,
        sourceId: s.sourceId,
        sourceName: s.sourceName,
        assigned: true,
        attributes: s.attributes
      }
    });
    // const assignedSources = this.dialogData.entity.sources?.filter((s) => s.assigned);
    // const assignedSources2 = this.assignableSources?.filter((s) => s.assigned);
    // const assignedSources = assignedSources1?.concat(assignedSources2 || []);
    const subject = {...this.dialogData.entity, project: this.dialogData.project};
    const assignedSources = subject.sources?.filter(s => s.assigned) ?? [];
    subject.sources = [...assignedSources, ...addedSources];
    console.log('Class: SubjectDialogPairSourceComponent, Function: save, Line 143 subject.sources', subject.sources);
    //
    this.dialogActionEvent.emit({action: SubjectDialogMode.EDIT, entity: subject});
  }
}

