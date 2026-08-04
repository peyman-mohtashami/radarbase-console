import {
  Component,
  inject,
  AfterViewInit
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {AppConfig} from "../../models/config";
import {TranslatePipe} from "@ngx-translate/core";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {ConfigConfigService} from '../../services/config-config.service';
import {ErrorMessageBoxComponent} from '../../../../../shared/components/message-box/error-message-box.component';
import {ConfigDifference, ConfigStore} from '../../services/config.store';
import {JsonPipe, UpperCasePipe} from '@angular/common';
import {animateDialogIn, animateDialogOut} from '../../../../shared/utils/dialog.util';

@Component({
  selector: 'app-config-publish-dialog',
  templateUrl: './config-publish-dialog.component.html',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatButton,
    TranslatePipe,
    MatIcon,
    MatProgressSpinner,
    ErrorMessageBoxComponent,
    UpperCasePipe,
    JsonPipe,
  ]
})
export class ConfigPublishDialogComponent implements AfterViewInit {
  protected store = inject(ConfigStore);
  protected configService = inject(ConfigConfigService);
  private dialogRef = inject(MatDialogRef<ConfigPublishDialogComponent>);

  protected dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: "publish" | "discard";
    differences: ConfigDifference[];
    configs: AppConfig[];
  };

  formFields = this.configService.getFormFields();

  ngAfterViewInit() {
    animateDialogIn(this.dialogData.id);
  }

  async publish() {
    await this.store.publish();
    this.dialogRef.close();
  }

  discard () {
    this.store.discard();
    this.dialogRef.close();
  }


  close() {
    animateDialogOut(this.dialogData.id, this.dialogRef);
  }
}
