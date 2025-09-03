import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { BaseDialogComponent } from '../../../../base/base-dialog.component';
import {AppConfig} from "../../models/config";
import {ErrorMessageComponent} from "../../../../../core/error/components/message/error-message.component";
import {NgIf} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'rb-config-publish-dialog',
  templateUrl: './config-publish-dialog.component.html',
  imports: [
    MatDialogTitle,
    MatIconButton,
    MatDialogClose,
    MatDialogContent,
    ErrorMessageComponent,
    NgIf,
    MatButton,
    TranslatePipe,
    MatIcon,
    MatProgressSpinner
  ]
})
export class ConfigPublishDialogComponent
  extends BaseDialogComponent<AppConfig[], ConfigPublishDialogComponent>
  implements OnInit, OnDestroy
{
  constructor(
    router: Router,
    dialogRef: MatDialogRef<ConfigPublishDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public override data: {
      mode: string;
      entity: AppConfig[];
    }
  ) {
    super(router, dialogRef, data);
  }

  override ngOnInit() {
    super.ngOnInit();
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }

  override save(): void {
    this.isLoading = true;
    this.actionTriggered.emit({ action: this.mode, entity: this.entity });
  }

  publish() {
    this.error.set(false); // = false;
    this.isLoading = true;
    if (this.entity){
      this.actionTriggered.emit({ action: this.mode, entity: this.entity });
    }
  }
}
