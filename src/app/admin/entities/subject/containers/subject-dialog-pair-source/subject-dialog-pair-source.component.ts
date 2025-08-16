import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';

import { SourceService } from '../../../source/services/source.service';
import { DialogMode } from '../../../../enums/dialog';
import { BaseDialogComponent } from '../../../../components/base-dialog/base-dialog.component';
import { AppSubject } from "../../models/subject";
import { AppSource } from "../../../source/models/source";
import {TranslatePipe} from "@ngx-translate/core";
import {
  DialogBodyDescriptionComponent
} from "../../../../components/base-dialog/dialog-body-description/dialog-body-description.component";
import {SubjectDetailsComponent} from "../../components/subject-details/subject-details.component";
import {MatCheckbox} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {ErrorMessageComponent} from "../../../../../core/error/components/message/error-message.component";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {RadarSource} from '../../../../../shared/models/radar-source.model';

@Component({
  selector: 'rb-subject-dialog-pair-source',
  templateUrl: './subject-dialog-pair-source.component.html',
  imports: [
    TranslatePipe,
    MatDialogTitle,
    MatIconButton,
    MatDialogContent,
    DialogBodyDescriptionComponent,
    SubjectDetailsComponent,
    MatCheckbox,
    FormsModule,
    NgIf,
    ErrorMessageComponent,
    MatButton,
    MatDialogClose,
    MatIcon,
    MatProgressSpinner
  ]
})
export class SubjectDialogPairSourceComponent
  extends BaseDialogComponent<AppSubject, SubjectDialogPairSourceComponent>
  implements OnInit, OnDestroy
{
  projectName; // = this.data.projectName;

  assignableSources?: AppSource[];
  assignedSources?: RadarSource[];

  constructor(
    router: Router,
    dialogRef: MatDialogRef<SubjectDialogPairSourceComponent>,
    @Inject(MAT_DIALOG_DATA)
    public override data: {
      mode: string;
      entity: AppSubject;
      projectName: string;
    },
    private sourceService: SourceService
  ) {
    super(router, dialogRef, data);
    this.projectName = this.data.projectName;
  }

  override ngOnInit() {
    super.ngOnInit();

    if (this.projectName) {
      this.sourceService.queryAvailable(this.projectName).subscribe((res) => {
        console.log(res);
        this.assignableSources = res;
      });
    }

    this.assignedSources = this.entity.sources;
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }

  addSource(selectedSource: AppSource) {
    this.assignedSources?.push(selectedSource);
    if (this.assignableSources && this.assignableSources?.length > 0) {
      this.assignableSources = this.assignableSources.filter(
        (obj) => obj !== selectedSource
      );
    }
  }

  override save() {
    // console.log(this.form?.value)
    this.isLoading = true;
    const assignedSources1 = this.assignedSources?.filter((s) => s.assigned);
    const assignedSources2 = this.assignableSources?.filter((s) => s.assigned);
    const assignedSources = assignedSources1?.concat(assignedSources2 || []);
    const subject = { ...this.entity };
    subject.sources = assignedSources;

    this.actionTriggered.emit({ action: DialogMode.EDIT, entity: subject });
  }
}
