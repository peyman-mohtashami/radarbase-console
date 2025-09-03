import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';

import { BaseDialogComponent } from '../../../../base/base-dialog.component';
import { AppSubject } from "../../models/subject";
import { AppGroup } from "../../../group/models/group";
import {TranslatePipe} from "@ngx-translate/core";
import {
  MatSelectAutocompleteComponent
} from "../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component";
import {ErrorMessageComponent} from "../../../../../core/error/components/message/error-message.component";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'rb-subject-dialog-assign-group-dialog',
  templateUrl: './subject-dialog-assign-group.component.html',
  imports: [
    TranslatePipe,
    MatIconButton,
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatSelectAutocompleteComponent,
    ErrorMessageComponent,
    MatButton,
    MatDialogClose,
    MatIcon,
    MatProgressSpinner
  ]
})
export class SubjectDialogAssignGroupComponent
  extends BaseDialogComponent<
    AppSubject,
    SubjectDialogAssignGroupComponent
  >
  implements OnInit, OnDestroy
{
  override form = new FormGroup({
    group: new FormControl("")
  });

  groups; // = this.data.groups;

  constructor(
    router: Router,
    dialogRef: MatDialogRef<SubjectDialogAssignGroupComponent>,
    @Inject(MAT_DIALOG_DATA)
    public override data: {
      mode: string;
      entity: AppSubject;
      groups: AppGroup[];
    }
  ) {
    super(router, dialogRef, data);
    this.groups = this.data.groups;
  }

  override ngOnInit() {
    super.ngOnInit();
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }

  override save(): void {
    this.error.set(false); // = false;
    this.isLoading = true;
    this.actionTriggered.emit({
      action: this.mode,
      groupName: this.form?.value.group,
    });
  }
}
