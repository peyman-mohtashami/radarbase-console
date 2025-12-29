import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';

import {Validator} from "../../../../../../shared/utils/validators";
import {AppConfig} from "../../models/config";
import {TranslatePipe} from "@ngx-translate/core";
import {MatFormField, MatInput} from "@angular/material/input";
import {DialogMode} from '../../../../../base-entities/enums/dialog';
import {DialogTitleComponent} from '../../../../../base-entities/containers/entity-dialog/dialog-title/dialog-title.component';
import {
  DialogBodyDescriptionComponent
} from '../../../../../base-entities/containers/entity-dialog/dialog-body-description/dialog-body-description.component';
import {
  DialogActionsComponent
} from '../../../../../base-entities/containers/entity-dialog/dialog-actions/dialog-actions.component';
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {ConfigConfigService} from "../../services/config-config.service";
import {BaseEntityDialogComponent} from '../../../../../base-entities/containers/entity-dialog/base-entity-dialog.component';
import {ErrorMessageBoxComponent} from '../../../../../../shared/components/message-box/error-message-box.component';

@Component({
  selector: 'app-config-dialog',
  templateUrl: './config-dialog.component.html',
  imports: [
    DialogTitleComponent,
    MatDialogContent,
    MatFormField,
    TranslatePipe,
    DialogBodyDescriptionComponent,
    DialogActionsComponent,
    MatInput,
    ReactiveFormsModule,
    CdkTextareaAutosize,
    ErrorMessageBoxComponent
  ]
})
export class ConfigDialogComponent extends BaseEntityDialogComponent<AppConfig> implements OnInit, AfterViewInit {
  override configService = inject(ConfigConfigService);
  override dialogRef = inject(MatDialogRef<ConfigDialogComponent>);
  override dialogData = inject(MAT_DIALOG_DATA) as {
    mode: DialogMode;
    entity: AppConfig;
  };

  tableFields = this.configService.getTableFields();
  override formFields = this.configService.getFormFields();

  override form = new FormGroup({
    name: new FormControl<string | undefined>(undefined, {nonNullable: true, validators: [Validator.requiredValidator]}),
    value: new FormControl<string | undefined>(undefined, {nonNullable: true}),
  });

  ngOnInit() {
    super.init();
  }

  ngAfterViewInit() {
    super.afterViewInit();
  }
}
