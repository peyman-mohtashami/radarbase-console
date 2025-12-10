import {
  AfterViewInit,
  Component,
  effect,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';

import {Validator, ValidatorError, ValidatorHint} from "../../../../../shared/utils/validators";
import {AppConfig} from "../../models/config";
import {TranslatePipe} from "@ngx-translate/core";
import {MatFormField, MatInput} from "@angular/material/input";
import {HttpErrorResponse} from '@angular/common/http';
import {toSignal} from '@angular/core/rxjs-interop';
import {debounceTime} from 'rxjs/operators';
import {DetailType} from '../../../../enums/detail-type';
import {DialogMode} from '../../../../enums/dialog';
import {DialogTitleComponent} from '../../../../components/dialog/dialog-title/dialog-title.component';
import {
  DialogBodyDescriptionComponent
} from '../../../../components/dialog/dialog-body-description/dialog-body-description.component';
import {
  DialogAction,
  DialogActionsComponent
} from '../../../../components/dialog/dialog-actions/dialog-actions.component';
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {ConfigConfigService} from "../../services/config-config.service";
import {BaseDialogComponent} from '../../../../components/dialog/base-dialog.component';

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
    CdkTextareaAutosize
  ]
})
export class ConfigDialogComponent extends BaseDialogComponent<AppConfig> implements OnInit, AfterViewInit {
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

  override handleSaveAction(): void {
    this.dialogActionEvent.emit({
      action: this.dialogData.mode,
      entity: {...this.dialogData.entity, ...this.form.value}, //, project: this.dialogData.project}, // TODO if project is not set (DialogMode ADD)
    });
  }

  override handleDeleteAction(): void {
    this.dialogActionEvent.emit({action: this.dialogData.mode, entity: this.dialogData.entity});
  }
}
