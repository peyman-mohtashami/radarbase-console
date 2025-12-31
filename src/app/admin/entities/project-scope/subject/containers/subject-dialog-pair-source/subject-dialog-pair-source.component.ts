import {
  AfterViewInit,
  Component,
  inject, OnInit, signal,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';

import {AppSubject} from "../../models/subject";
import {AppSource} from "../../../source/models/source";
import {TranslatePipe} from "@ngx-translate/core";
import {MatCheckbox} from "@angular/material/checkbox";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {SubjectConfigService} from '../../services/subject-config.service';
import {SubjectDialogMode} from '../../enums/dialog';
import {DetailType} from '../../../../../base-entities/enums/detail-type';
import {SubjectDetailsComponent} from '../../components/subject-details/subject-details.component';
import {AppProject} from '../../../../main-scope/project/models/project';
import {
  DialogBodyDescriptionComponent
} from '../../../../../base-entities/containers/entity-dialog/dialog-body-description/dialog-body-description.component';
import {TagComponent} from '../../../../../../shared/components/tag/tag.component';
import {
  DialogTitleComponent
} from '../../../../../base-entities/containers/entity-dialog/dialog-title/dialog-title.component';
import {ErrorMessageBoxComponent} from '../../../../../../shared/components/message-box/error-message-box.component';
import {
  BaseEntityDialogComponent
} from '../../../../../base-entities/containers/entity-dialog/base-entity-dialog.component';
import {Observable} from 'rxjs';
import {
  DialogAction
} from '../../../../../base-entities/containers/entity-dialog/dialog-actions/dialog-actions.component';

export interface AvailableSource {
  id: string | number;
  sourceTypeId?: string | number;
  sourceTypeProducer?: string;
  sourceTypeModel?: string;
  sourceTypeCatalogVersion?: string;
  expectedSourceName?: string;
  sourceId: string;
  sourceName: string;
  assigned?: boolean;
}

@Component({
  selector: 'app-subject-dialog-pair-source',
  templateUrl: './subject-dialog-pair-source.component.html',
  imports: [
    TranslatePipe,
    MatDialogContent,
    DialogBodyDescriptionComponent,
    MatCheckbox,
    FormsModule,
    MatButton,
    MatIcon,
    MatProgressSpinner,
    SubjectDetailsComponent,
    ReactiveFormsModule,
    TagComponent,
    DialogTitleComponent,
    ErrorMessageBoxComponent,
  ]
})
export class SubjectDialogPairSourceComponent extends BaseEntityDialogComponent<AppSubject> implements OnInit, AfterViewInit {
  protected readonly SubjectDialogMode = SubjectDialogMode;

  override configService = inject(SubjectConfigService);
  override dialogRef = inject(MatDialogRef<SubjectDialogPairSourceComponent>);
  override dialogData = inject(MAT_DIALOG_DATA) as {
    mode: SubjectDialogMode;
    entity: AppSubject;
    project: AppProject;
    sourcesFullList: Observable<AppSource[]>;
  };

  protected readonly DetailType = DetailType;
  protected readonly DialogAction = DialogAction;

  override formFields = this.configService.getFormFields();
  tableFields = this.configService.getTableFields();

  unassignedSources = signal<AvailableSource[]>([]);
  availableSources = signal<AvailableSource[]>([]) ;

  ngOnInit() {
    super.init();
    this.dialogData.sourcesFullList.subscribe(sources => {
      this.unassignedSources.set(sources.filter(s => !s.assigned).map(s => {
        return {
          id: s.id,
          sourceTypeId: s.sourceType?.id,
          sourceTypeProducer: s.sourceType?.producer,
          sourceTypeModel: s.sourceType?.model,
          sourceTypeCatalogVersion: s.sourceType?.catalogVersion,
          expectedSourceName: s.expectedSourceName,
          sourceId: s.sourceId,
          sourceName: s.sourceName,
          assigned: s.assigned
        }
      }));
      const alreadyAssignedSources = this.dialogData.entity.sources ?? [];
      this.availableSources.set([...alreadyAssignedSources, ...this.unassignedSources()]);
    })

  }

  ngAfterViewInit() {
    super.afterViewInit();
  }

  override handleSaveAction(): void {
    const subject = {...this.dialogData.entity, project: this.dialogData.project};
    subject.sources = this.availableSources().filter(s => s.assigned) ?? [];
    this.dialogActionEvent.emit({action: SubjectDialogMode.EDIT, entity: subject});

    //TODO source should be updated and assigned=true/false
  }
}

