import {
  Component,
  inject,
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef, MatDialogTitle,
} from '@angular/material/dialog';

import { AppGroup } from "../../../group/models/group";
import {TranslatePipe} from "@ngx-translate/core";
import {
  MatSelectAutocompleteAdapter,
  MatSelectAutocompleteComponent
} from "../../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {SubjectConfigService} from '../../services/subject-config.service';
import {SubjectDialogMode} from '../../enums/dialog';
import {DetailType} from '../../../../../base-entities/enums/detail-type';
import {Observable} from 'rxjs';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {
  BaseEntityDialogComponent
} from '../../../../../base-entities/containers/entity-dialog/base-entity-dialog.component';
import {ErrorMessageBoxComponent} from '../../../../../../shared/components/message-box/error-message-box.component';
import {AppSubject} from '../../models/subject';
import {AppSourceType} from '../../../../main-scope/source-type/models/source-type';

@Component({
  selector: 'app-subject-dialog-assign-group-dialog',
  templateUrl: './subject-dialog-assign-group.component.html',
  imports: [
    TranslatePipe,
    MatDialogContent,
    ReactiveFormsModule,
    MatSelectAutocompleteComponent,
    MatButton,
    MatDialogClose,
    MatIcon,
    MatProgressSpinner,
    AsyncPipe,
    ErrorMessageBoxComponent,
    JsonPipe,
    MatDialogTitle
  ]
})
export class SubjectDialogAssignGroupComponent extends BaseEntityDialogComponent<AppGroup> {
  protected readonly SubjectDialogMode = SubjectDialogMode;

  override configService = inject(SubjectConfigService);
  override dialogRef = inject(MatDialogRef<SubjectDialogAssignGroupComponent>);
  override dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: string;
    entity: AppGroup;
    groupFullList: Observable<AppGroup[]>;
    selectedSubjects: AppSubject[];
  };

  protected readonly DetailType = DetailType;

  tableFields = this.configService.getTableFields();
  override formFields = this.configService.getFormFields();

  override form = new FormGroup({
    group: new FormControl<AppGroup | undefined>(undefined, {nonNullable: true})
  });


  protected groupAdapter: MatSelectAutocompleteAdapter<AppGroup> = {
    value: g => g.id.toString(),
    label: g => g.name
  }

  override onAction() { //TODO DIALOG_ACTION
    this.error.set(null);
    this.loading.set(true);
    this.dialogActionEvent.emit({
      action: SubjectDialogMode.EDIT,
      entity: this.form?.value.group
    });
  }
}
