import {
  AfterViewInit,
  Component,
  inject, OnDestroy,
  OnInit,
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
import {DetailType} from '../../../../enums/detail-type';
import {ConfigConfigService} from '../../services/config-config.service';
import {BaseDialogComponent} from '../../../../components/dialog/base-dialog.component';

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
    MatProgressSpinner
  ]
})
export class ConfigPublishDialogComponent extends BaseDialogComponent<AppConfig[]> implements OnInit, AfterViewInit, OnDestroy {

  override configService = inject(ConfigConfigService);
  override dialogRef = inject(MatDialogRef<ConfigPublishDialogComponent>);
  override dialogData = inject(MAT_DIALOG_DATA) as {
    mode: "publish" | "discard";
    entities: AppConfig[];
  };

  protected readonly DetailType = DetailType;

  tableFields = this.configService.getTableFields();

  override formFields = this.configService.getFormFields();

  ngOnInit() {}

  ngAfterViewInit() {
    super.afterViewInit();
  }

  ngOnDestroy(): void {
    super.destroy();
  }

  publish() {
    this.error.set(null);
    this.loading.set(true);
    this.dialogActionEvent.emit({ action: 'publish', entity: this.dialogData.entities});
  }

  discard() {
    this.error.set(null);
    this.loading.set(true);
    this.dialogActionEvent.emit({ action: 'discard', entity: undefined });
  }
}
