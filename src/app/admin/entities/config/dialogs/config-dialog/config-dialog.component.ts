import {
  Component,
  inject,
  AfterViewInit, signal, effect
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';

import {AppConfig, CreateConfigDto, UpdateConfigDto} from "../../models/config";
import {TranslatePipe} from "@ngx-translate/core";
import {MatFormField, MatInput} from "@angular/material/input";
import {DialogMode} from '../../../../shared/enums/dialog';
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {ConfigConfigService} from "../../services/config-config.service";
import {ErrorMessageBoxComponent} from '../../../../../shared/components/message-box/error-message-box.component';
import {ActivatedRoute} from '@angular/router';
import {ConfigStore} from '../../services/config.store';
import {animateDialogIn, animateDialogOut} from '../../../../shared/utils/dialog.util';
import {form, FormField} from '@angular/forms/signals';
import {requiredField} from '../../../../../shared/utils/signal-form-validators';
import {JsonPipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

export interface ConfigForm {
  name: string;
  value: string;
}

export interface StoredConfigDialog {
  mode: DialogMode;
  entity?: AppConfig;
  model: ConfigForm;
}

@Component({
  selector: 'app-config-dialog',
  templateUrl: './config-dialog.component.html',
  imports: [
    MatDialogContent,
    MatFormField,
    TranslatePipe,
    MatInput,
    CdkTextareaAutosize,
    ErrorMessageBoxComponent,
    MatDialogTitle,
    FormField,
    JsonPipe,
    MatButton,
    MatDialogActions,
    MatIcon,
    MatProgressSpinner
  ]
})
export class ConfigDialogComponent implements AfterViewInit {
  protected readonly DialogMode = DialogMode;

  protected store = inject(ConfigStore);
  protected configService = inject(ConfigConfigService);
  private dialogRef = inject(MatDialogRef<ConfigDialogComponent>);
  protected activatedRoute = inject(ActivatedRoute);

  tableFields = this.configService.getTableFields();
  extraFields = this.configService.getExtraFields();

  protected dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: DialogMode;
    entity?: AppConfig;
    restoredModel: ConfigForm;
  };

  formFields = this.configService.getFormFields();

  private model = signal<ConfigForm>(this.dialogData.restoredModel ?? {
    ...this.dialogData.entity,
    name: this.dialogData.entity?.name ?? '',
    value: this.dialogData.entity?.value ?? '',
  });

  protected form = form(this.model, (schema) => {
    requiredField(schema.name);
    // TODO duplicate
  });

  constructor() {
    effect(() => {
      const model = this.model();
      if (this.dialogData.mode === DialogMode.ADD || this.dialogData.mode === DialogMode.EDIT) {
        this.configService.setDialogState({
          mode: this.dialogData.mode,
          entity: this.dialogData.entity,
          model,
        });
      }
    });
  }

  ngAfterViewInit() {
    animateDialogIn(this.dialogData.id);
  }

  protected async save(): Promise<void> {
    switch(this.dialogData.mode) {
      case DialogMode.ADD:
        await this.store.add(this.toCreateDtoModel(this.model()));
        break;
      case DialogMode.EDIT:
        await this.store.update(this.toUpdateDtoModel(this.model()));
        break;
    }

    if (this.store.error()) return;

    this.configService.clearDialogState();
    this.dialogRef.close();
  }

  protected async delete(): Promise<void> {
    await this.store.delete(this.dialogData.entity!);
    this.configService.clearDialogState();
    this.dialogRef.close();
  }

  close() {
    this.configService.clearDialogState();
    animateDialogOut(this.dialogData.id, this.dialogRef);
  }

  toCreateDtoModel(model: ConfigForm): CreateConfigDto {
    return {
      ...model,
    };
  }

  toUpdateDtoModel(model: ConfigForm): UpdateConfigDto {
    return {
      ...model,
    };
  }
}
