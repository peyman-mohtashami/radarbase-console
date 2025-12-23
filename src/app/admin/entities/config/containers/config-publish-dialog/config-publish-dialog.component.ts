import {
  AfterViewInit,
  Component,
  inject, OnInit,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {AppConfig} from "../../models/config";
import {TranslatePipe} from "@ngx-translate/core";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {ConfigConfigService} from '../../services/config-config.service';
import {BaseDialogComponent} from '../../../../components/dialog/base-dialog.component';
import {ErrorMessageBoxComponent} from '../../../../../shared/components/message-box/error-message-box.component';

@Component({
  selector: 'app-config-publish-dialog',
  templateUrl: './config-publish-dialog.component.html',
  imports: [
    MatDialogTitle,
    MatIconButton,
    MatDialogClose,
    MatDialogContent,
    MatButton,
    TranslatePipe,
    MatIcon,
    MatProgressSpinner,
    ErrorMessageBoxComponent,
  ]
})
export class ConfigPublishDialogComponent extends BaseDialogComponent<AppConfig[]> implements OnInit, AfterViewInit {
  override configService = inject(ConfigConfigService);
  override dialogRef = inject(MatDialogRef<ConfigPublishDialogComponent>);
  override dialogData = inject(MAT_DIALOG_DATA) as {
    mode: "publish" | "discard";
    originalList: AppConfig[];
    updatedList: AppConfig[];
  };

  override formFields = this.configService.getFormFields();

  differences: { name: string; originalValue?: string; newValue?: string;}[] = [];

  ngOnInit() {
    this.dialogData.updatedList.forEach(config => {
      const originalConfig = this.dialogData.originalList.find(originalConfig => originalConfig.name === config.name);
      if (originalConfig?._name !== config._name || originalConfig?.value !== config.value) {
        this.differences.push({
          name: config.name,
          originalValue: originalConfig?.value,
          newValue: config.value
        })
      }
    })
    this.dialogData.originalList.forEach(config => {
      const updatedConfig = this.dialogData.updatedList.find(updatedConfig => updatedConfig.name === config.name);
      if (!updatedConfig) {
        this.differences.push({
          name: config.name,
          originalValue: config.value,
          newValue: undefined
        })
      }
    })
  }

  ngAfterViewInit() {
    super.afterViewInit();
  }

  publish() {
    this.error.set(null);
    this.loading.set(true);
    this.dialogActionEvent.emit({ action: 'publish', entity: this.dialogData.updatedList });
  }

  discard() {
    this.error.set(null);
    this.loading.set(true);
    this.dialogActionEvent.emit({ action: 'discard', entity: undefined });
  }
}
