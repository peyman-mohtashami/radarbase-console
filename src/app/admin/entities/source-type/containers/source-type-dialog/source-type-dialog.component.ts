import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {AppSourceType, SourceTypeScope} from "../../models/source-type";
import {Validator} from '../../../../../shared/utils/validators';
import {DialogMode} from '../../../../base-entities/enums/dialog';
import {TranslatePipe} from '@ngx-translate/core';
import {MatError, MatFormField, MatHint, MatInput} from '@angular/material/input';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {SourceTypeConfigService} from '../../services/source-type-config.service';
import {DialogTitleComponent} from '../../../../base-entities/containers/entity-dialog/dialog-title/dialog-title.component';
import {
  DialogBodyDescriptionComponent
} from '../../../../base-entities/containers/entity-dialog/dialog-body-description/dialog-body-description.component';
import {
  DialogActionsComponent
} from '../../../../base-entities/containers/entity-dialog/dialog-actions/dialog-actions.component';
import {BaseEntityDialogComponent} from '../../../../base-entities/containers/entity-dialog/base-entity-dialog.component';
import {Observable} from 'rxjs';
import {ErrorMessageBoxComponent} from '../../../../../shared/components/message-box/error-message-box.component';

@Component({
  selector: 'app-source-type-dialog',
  templateUrl: './source-type-dialog.component.html',
  imports: [
    DialogTitleComponent,
    MatDialogContent,
    DialogBodyDescriptionComponent,
    ReactiveFormsModule,
    DialogActionsComponent,
    TranslatePipe,
    MatFormField,
    MatInput,
    MatError,
    MatSelect,
    MatOption,
    MatSlideToggle,
    MatHint,
    ErrorMessageBoxComponent
  ]
})
export class SourceTypeDialogComponent extends BaseEntityDialogComponent<AppSourceType> implements OnInit, AfterViewInit {
  override configService = inject(SourceTypeConfigService);
  override dialogRef = inject(MatDialogRef<SourceTypeDialogComponent>);
  override dialogData = inject(MAT_DIALOG_DATA) as {
    mode: DialogMode;
    entity: AppSourceType;
    sourceTypeFullList: Observable<AppSourceType[]>;
  };

  override formFields = this.configService.getFormFields();

  override form = new FormGroup({
    id: new FormControl<string | number>({ value: '', disabled: true }, {nonNullable: true}),
    producer: new FormControl<string>("", {nonNullable: true, validators: [Validator.requiredValidator, Validator.normalTextValidator]}),
    model: new FormControl<string>("", {nonNullable: true, validators: [Validator.requiredValidator, Validator.normalTextValidator]}),
    catalogVersion: new FormControl<string>("", {nonNullable: true, validators: [Validator.requiredValidator]}),
    sourceTypeScope: new FormControl<SourceTypeScope | null>(null, {nonNullable: true, validators: [Validator.requiredValidator]}),
    canRegisterDynamically: new FormControl<boolean>(false, {nonNullable: true}),
    name: new FormControl<string>("", {validators: [Validator.normalTextValidator]}),
    description: new FormControl<string>("", {validators: [Validator.longTextValidator]}),
    assessmentType: new FormControl<string>("", {validators: [Validator.normalTextValidator]}),
    appProvider: new FormControl<string>("", {validators: [Validator.normalTextValidator]}),
  });

  ngOnInit() {
    super.init()
  }

  ngAfterViewInit() {
    super.afterViewInit();
  }

  override handleSaveAction(): void {
    this.dialogActionEvent.emit({
      action: this.dialogData.mode,
      entity: {...this.dialogData.entity, ...this.form.value},
    });
  }

  override handleDeleteAction(): void {
    this.dialogActionEvent.emit({action: this.dialogData.mode, entity: this.dialogData.entity});
  }
}
