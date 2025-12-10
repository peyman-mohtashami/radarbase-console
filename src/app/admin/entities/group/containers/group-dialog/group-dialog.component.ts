import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';

import { AppGroup } from "../../models/group";
import {TranslatePipe} from "@ngx-translate/core";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatError} from "@angular/material/form-field";
import {DialogMode} from '../../../../enums/dialog';
import {GroupConfigService} from '../../services/group-config.service';
import {DialogTitleComponent} from '../../../../components/dialog/dialog-title/dialog-title.component';
import {
  DialogBodyDescriptionComponent
} from '../../../../components/dialog/dialog-body-description/dialog-body-description.component';
import {
  DialogActionsComponent
} from '../../../../components/dialog/dialog-actions/dialog-actions.component';
import {BaseDialogComponent} from '../../../../components/dialog/base-dialog.component';

@Component({
  selector: 'app-organization-dialog',
  templateUrl: './group-dialog.component.html',
  imports: [
    DialogTitleComponent,
    MatDialogContent,
    DialogBodyDescriptionComponent,
    TranslatePipe,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    DialogActionsComponent,
    MatError
  ]
})
export class GroupDialogComponent extends BaseDialogComponent<AppGroup> implements OnInit, AfterViewInit {
  override configService = inject(GroupConfigService);
  override dialogRef = inject(MatDialogRef<GroupDialogComponent>);
  override dialogData = inject(MAT_DIALOG_DATA) as {
    mode: DialogMode;
    entity: AppGroup;
    entities: AppGroup[];
  };

  override formFields = this.configService.getFormFields();

  override form = new FormGroup({
    id: new FormControl<string | number>({ value: '', disabled: true}, {nonNullable: true}),
    name: new FormControl<string>('', {nonNullable: true}),
  });

  ngOnInit() {
    this.form.controls.name.addValidators(this.duplicateValidator);
    super.init();
  }

  ngAfterViewInit() {
    super.afterViewInit();
  }

  override handleSaveAction(): void {
    this.dialogActionEvent.emit({
      action: this.dialogData.mode,
      entity: {...this.dialogData.entity, ...this.form?.value},
    });
  }

  override handleDeleteAction(): void {
    this.dialogActionEvent.emit({action: this.dialogData.mode, entity: this.dialogData.entity});
  }

  private duplicateValidator = (control: AbstractControl) => {
    return this.dialogData.entities?.find(
      (entity) =>
        control.value === entity.name && this.dialogData.entity?.name !== entity.name
    )
      ? { duplicate: true }
      : null;
  }
}
