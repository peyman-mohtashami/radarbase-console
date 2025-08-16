import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup, ReactiveFormsModule,
  UntypedFormArray
} from "@angular/forms";
import { Subject } from 'rxjs';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';

import {
  ValidatorHint,
  ValidatorError, Validator
} from "../../../../../shared/utils/validators";
import { BaseDialogComponent } from '../../../../components/base-dialog/base-dialog.component';
import { AppUser } from "../../models/user";
import {JsonPipe, NgIf} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {ErrorMessageComponent} from "../../../../../core/error/components/message/error-message.component";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatLabel} from "@angular/material/select";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatError} from "@angular/material/form-field";
// import { DialogMode } from "../../../../enums/dialog";

@Component({
  selector: 'rb-role-dialog',
  templateUrl: './role-dialog.component.html',
  imports: [
    MatIcon,
    MatDialogClose,
    MatIconButton,
    MatDialogTitle,
    MatDialogContent,
    NgIf,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    TranslatePipe,
    JsonPipe,
    ErrorMessageComponent,
    MatButton,
    MatButton,
    MatIcon,
    MatProgressSpinner,
    MatButton,
    MatInput,
    MatError
  ]
})
export class RoleDialogComponent
  extends BaseDialogComponent<AppUser, RoleDialogComponent>
  implements OnInit, OnDestroy
{
  override form = new FormGroup({
    // login: new FormControl<string | null>(null,[Validator.requiredValidator, Validator.normalTextValidator]),
    email: new FormControl<string | null>(null,[Validator.requiredValidator, Validator.emailValidator]),
  });

  entities; // = this.data.entities;

  user?: AppUser;
  // project = this.data.project;
  // organization = this.data.organization;

  role?: string;
  entityName?: string;

  override subscription$: Subject<void> = new Subject<void>();

  override ValidatorHint = ValidatorHint;
  override ValidatorError = ValidatorError;

  constructor(
    router: Router,
    dialogRef: MatDialogRef<RoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public override data: {
      mode: string;
      entity: AppUser;
      entities: AppUser[];
      // project: RadarProjectDef;
      // organization: RadarOrganizationDef;
    }
  ) {
    super(router, dialogRef, data);
    this.entities = this.data.entities;
  }

  override ngOnInit() {
    console.log('Class: RoleDialogComponent, Function: ngOnInit, Line 62 this.entities' , this.entities);
    super.ngOnInit();
    this.form.controls.email.valueChanges.subscribe(v => {
      this.user = this.entities.find(u => u.email === v);
    })
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }

  override save(): void {
    this.error = false;
    this.isLoading = true;
    this.actionTriggered.emit({
      action: this.mode,
      entity: { ...this.user },
    });
  }
}
