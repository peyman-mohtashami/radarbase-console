import {
  Component,
  inject,
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';

import { AppGroup } from "../../../group/models/group";
import {TranslatePipe} from "@ngx-translate/core";
import {
  MatSelectAutocompleteComponent
} from "../../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {SubjectConfigService} from '../../services/subject-config.service';
import {SubjectDialogMode} from '../../enums/dialog';
import {DetailType} from '../../../../../base-entities/enums/detail-type';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {
  BaseEntityDialogComponent
} from '../../../../../base-entities/containers/entity-dialog/base-entity-dialog.component';
import {
  DialogTitleComponent
} from '../../../../../base-entities/containers/entity-dialog/dialog-title/dialog-title.component';
import {ErrorMessageBoxComponent} from '../../../../../../shared/components/message-box/error-message-box.component';
import {AppSubject} from '../../models/subject';

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
    DialogTitleComponent,
    ErrorMessageBoxComponent
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

  override onAction() { //TODO DIALOG_ACTION
    this.error.set(null);
    this.loading.set(true);
    this.dialogActionEvent.emit({
      action: SubjectDialogMode.EDIT,
      entity: this.form?.value.group
    });
    // this.handleAssignAction();
  }
}
