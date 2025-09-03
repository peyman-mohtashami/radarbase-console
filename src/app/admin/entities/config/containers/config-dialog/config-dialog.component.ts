import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';

import { DateAdapter } from '@angular/material/core';
import { BaseDialogComponent } from '../../../../base/base-dialog.component';
import { Validator } from "../../../../../shared/utils/validators";
import { AppProject } from "../../../project/models/project";
import { AppGroup } from "../../../group/models/group";
import {AppConfig} from "../../models/config";
import {Store} from "@ngrx/store";
import {DialogTitleComponent} from "../../../../components/base-dialog/dialog-title/dialog-title.component";
import {NgIf} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {ConfigDetailsComponent} from "../../components/config-details/config-details.component";
import {
  DialogBodyDescriptionComponent
} from "../../../../components/base-dialog/dialog-body-description/dialog-body-description.component";
import {ErrorMessageComponent} from "../../../../../core/error/components/message/error-message.component";
import {DialogActionsComponent} from "../../../../components/base-dialog/dialog-actions/dialog-actions.component";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatLabel} from "@angular/material/select";
import {ENTITY_NAME} from "../../../../enums/entities";
import {SubjectStatus} from '../../../../../shared/models/radar-subject.model';

@Component({
  selector: 'rb-config-dialog',
  templateUrl: './config-dialog.component.html',
  imports: [
    DialogTitleComponent,
    MatDialogContent,
    MatFormField,
    NgIf,
    TranslatePipe,
    ConfigDetailsComponent,
    DialogBodyDescriptionComponent,
    MatLabel,
    ErrorMessageComponent,
    DialogActionsComponent,
    MatInput,
    ReactiveFormsModule
  ]
})
export class ConfigDialogComponent
  extends BaseDialogComponent<AppConfig, ConfigDialogComponent>
  implements OnInit, OnDestroy
{
  override form = new FormGroup({
    name: new FormControl("", [Validator.requiredValidator]),
    value: new FormControl(""),
  });

  SubjectStatus = SubjectStatus;

  projects;// = this.data.projects;
  projectName;// = this.data.projectName;
  project?: AppProject;
  groups;// = this.data.groups;

  constructor(
    router: Router,
    dialogRef: MatDialogRef<ConfigDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public override data: {
      mode: string;
      entity: AppConfig;
      projects: AppProject[];
      projectName: string;
      groups: AppGroup[];
    },
    store: Store,
    dateAdapter: DateAdapter<any>
  ) {
    super(router, dialogRef, data, store, dateAdapter);
    this.projects = this.data.projects;
    this.projectName = this.data.projectName;
    this.groups = this.data.groups;
  }

  override ngOnInit() {
    super.ngOnInit();
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }

  override save(): void {
    console.log(this.entity);
    console.log(this.form?.value);

    this.error.set(false); // = false;
    this.isLoading = true;
    this.actionTriggered.emit({
      action: this.mode,
      entity: { ...this.entity, ...this.form?.value, project: this.project },
    });
  }

  protected readonly ENTITY_NAME = ENTITY_NAME;
}
