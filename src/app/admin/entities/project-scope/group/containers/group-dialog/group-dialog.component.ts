import {
  Component,
  inject,
} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';

import { AppGroup } from "../../models/group";
import {TranslatePipe} from "@ngx-translate/core";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatError} from "@angular/material/form-field";
import {DialogMode} from '../../../../../base-entities/enums/dialog';
import {GroupConfigService} from '../../services/group-config.service';
import {DialogTitleComponent} from '../../../../../base-entities/containers/entity-dialog/dialog-title/dialog-title.component';
import {
  DialogBodyDescriptionComponent
} from '../../../../../base-entities/containers/entity-dialog/dialog-body-description/dialog-body-description.component';
import {
  DialogActionsComponent
} from '../../../../../base-entities/containers/entity-dialog/dialog-actions/dialog-actions.component';
import {BaseEntityDialogComponent} from '../../../../../base-entities/containers/entity-dialog/base-entity-dialog.component';
import {Observable} from 'rxjs';
import {ErrorMessageBoxComponent} from '../../../../../../shared/components/message-box/error-message-box.component';

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
    MatError,
    ErrorMessageBoxComponent
  ]
})
export class GroupDialogComponent extends BaseEntityDialogComponent<AppGroup> {
  override configService = inject(GroupConfigService);
  override dialogRef = inject(MatDialogRef<GroupDialogComponent>);
  override dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: DialogMode;
    entity?: AppGroup;
    groupFullList: Observable<AppGroup[]>;
  };

  override formFields = this.configService.getFormFields();

  override form = new FormGroup({
    id: new FormControl<string | number>({ value: '', disabled: true}, {nonNullable: true}),
    name: new FormControl<string>('', {nonNullable: true}),
  });

  groupFullList: AppGroup[] = [];

  override ngOnInit() {
    this.dialogData.groupFullList.subscribe(groups => {
      this.groupFullList = groups;
      this.form.controls.name.addValidators(this.duplicateValidator);
    })
    super.ngOnInit();
  }

  // override handleSaveAction(): void {
  //   this.dialogActionEvent.emit({
  //     action: this.dialogData.mode,
  //     entity: {...this.dialogData.entity, ...this.form?.value},
  //   });
  // }
  //
  // override handleDeleteAction(): void {
  //   this.dialogActionEvent.emit({action: this.dialogData.mode, entity: this.dialogData.entity});
  // }

  private duplicateValidator = (control: AbstractControl) => {
    return this.groupFullList.find(
      (entity) =>
        control.value === entity.name && this.dialogData.entity?.name !== entity.name
    )
      ? { duplicate: true }
      : null;
  }
}
