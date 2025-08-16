import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';

import { BaseDialogComponent } from '../../../../components/base-dialog/base-dialog.component';
import { AppSubject } from "../../models/subject";
import { AppProject } from "../../../project/models/project";
import { AppGroup } from "../../../group/models/group";
import {TranslatePipe} from "@ngx-translate/core";
import {
  DialogBodyDescriptionComponent
} from "../../../../components/base-dialog/dialog-body-description/dialog-body-description.component";
import {SubjectDetailsComponent} from "../../components/subject-details/subject-details.component";
import {ErrorMessageComponent} from "../../../../../core/error/components/message/error-message.component";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {SubjectStatus} from '../../../../../shared/models/radar-subject.model';
// import { LocaleService } from '@rb/locale';
// import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'rb-subject-dialog-discontinue-dialog',
  templateUrl: './subject-dialog-discontinue.component.html',
  imports: [
    MatDialogTitle,
    TranslatePipe,
    MatDialogContent,
    DialogBodyDescriptionComponent,
    SubjectDetailsComponent,
    ErrorMessageComponent,
    MatButton,
    MatDialogClose,
    MatIcon,
    MatProgressSpinner,
    MatIconButton
  ]
})
export class SubjectDialogDiscontinueComponent
  extends BaseDialogComponent<
    AppSubject,
    SubjectDialogDiscontinueComponent
  >
  implements OnInit, OnDestroy
{
  protected readonly SubjectStatus = SubjectStatus;

  projectName; // = this.data.projectName;
  // groups = this.data.groups;

  constructor(
    router: Router,
    dialogRef: MatDialogRef<SubjectDialogDiscontinueComponent>,
    @Inject(MAT_DIALOG_DATA)
    public override data: {
      mode: string;
      entity: AppSubject;
      projectName: string;
      // groups: AppGroup[];
    }
  ) {
    super(router, dialogRef, data);
    this.projectName = this.data.projectName;
  }

  override ngOnInit() {
    super.ngOnInit();
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }

  override delete(): void {
    this.error = false;
    this.isLoading = true;
    if (this.entity) {
      this.actionTriggered.emit({ action: this.mode, entity: this.entity });
    }
  }

  override save(): void {
    console.log(this.form?.value);
    new Date(this.form?.value.dateOfBirth);

    this.error = false;
    this.isLoading = true;
    this.actionTriggered.emit({
      action: this.mode,
      entity: { ...this.entity, ...this.form?.value },
    });
  }
}
