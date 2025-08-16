import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';

import { BaseDialogComponent } from '../../../../components/base-dialog/base-dialog.component';
import { AppGroup } from "../../models/group";
import { Store } from "@ngrx/store";
import { project } from "../../../../store/admin.selectors";
import {ENTITY_NAME} from "../../../../enums/entities";
import {DialogTitleComponent} from "../../../../components/base-dialog/dialog-title/dialog-title.component";
import {
  DialogBodyDescriptionComponent
} from "../../../../components/base-dialog/dialog-body-description/dialog-body-description.component";
import {DetailElementComponent} from "../../../../components/base-details/detail-element/detail-element.component";
import {TranslatePipe} from "@ngx-translate/core";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatFormField, MatInput} from "@angular/material/input";
import {ErrorMessageComponent} from "../../../../../core/error/components/message/error-message.component";
import {DialogActionsComponent} from "../../../../components/base-dialog/dialog-actions/dialog-actions.component";
import {MatLabel} from "@angular/material/select";
import {MatError} from "@angular/material/form-field";

@Component({
  selector: 'rb-organization-dialog',
  templateUrl: './group-dialog.component.html',
  imports: [
    DialogTitleComponent,
    MatDialogContent,
    DialogBodyDescriptionComponent,
    DetailElementComponent,
    TranslatePipe,
    AsyncPipe,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    ErrorMessageComponent,
    NgIf,
    DialogActionsComponent, MatError
  ]
})
export class GroupDialogComponent
  extends BaseDialogComponent<AppGroup, GroupDialogComponent>
  implements OnInit, OnDestroy
{
  override name = ENTITY_NAME.group;

  override form = new FormGroup({
    id: new FormControl({ value: undefined, disabled: true }),
    name: new FormControl<string | null>(null),
    // project: new FormControl({ value: undefined, disabled: true }),
  });

  entities;// = this.data.entities;

  selectedProject$ = this.store?.select(project);

  constructor(
    router: Router,
    dialogRef: MatDialogRef<GroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public override data: {
      mode: string;
      entity: AppGroup;
      entities: AppGroup[];
    },
    store: Store,
  ) {
    super(router, dialogRef, data, store);
    this.entities = this.data.entities;
  }

  override ngOnInit() {
    super.ngOnInit();
    this.form.controls.name?.addValidators(this.duplicateValidator);
  }

  private duplicateValidator = (control: AbstractControl) => {
    return this.entities?.find(
      (entity) =>
        control.value === entity.name && this.entity?.name !== entity.name
    )
      ? { duplicate: true }
      : null;
  };
}
