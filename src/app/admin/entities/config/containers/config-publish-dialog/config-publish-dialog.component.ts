import {
  AfterViewInit,
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal
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
import {HttpErrorResponse} from '@angular/common/http';
import {ENTITY_NAME} from '../../../../enums/entities';
import {DialogMode} from '../../../../enums/dialog';
import {DetailType} from '../../../../enums/detail-type';
import {ValidatorError, ValidatorHint} from '../../../../../shared/utils/validators';
import {ConfigConfigService} from '../../services/config-config.service';

@Component({
  selector: 'rb-config-publish-dialog',
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
export class ConfigPublishDialogComponent implements OnInit, AfterViewInit {
  private configService = inject(ConfigConfigService);
  private dialogRef = inject(MatDialogRef<ConfigPublishDialogComponent>);
  public dialogData = inject(MAT_DIALOG_DATA) as {
    mode: "publish" | "discard";
    entities: AppConfig[];
  };

  protected readonly ENTITY_NAME = ENTITY_NAME;
  protected readonly DialogMode = DialogMode;
  protected readonly DetailType = DetailType;
  protected readonly ValidatorHint = ValidatorHint;
  protected readonly ValidatorError = ValidatorError;

  tableFields = this.configService.getTableFields();
  formFields = this.configService.getFormFields();

  loading$ = signal(false);
  error$ = signal<HttpErrorResponse | null>(null);

  @Output()
  dialogActionEvent = new EventEmitter<{ action: DialogMode | string, entities?: AppConfig[] }>();

  ngOnInit() {}

  ngAfterViewInit() {
    const dialogContainer = document.querySelector('.tailwind-slide-panel');
    setTimeout(() => {
      dialogContainer?.classList.add('dialog-enter-active');
    });
  }

  close() {
    this.loading$.set(false);
    const container = document.querySelector('.tailwind-slide-panel');
    container?.classList.remove('dialog-enter-active');
    container?.classList.add('dialog-exit-active');

    setTimeout(() => {
      this.dialogActionEvent.emit({action: DialogMode.CLOSE});
      this.dialogRef.close();
    }, 300);
  }

  errorHappened(error: HttpErrorResponse): void {
    this.loading$.set(false);
    this.error$.set(error);
  }

  publish() {
    this.error$.set(null);
    this.loading$.set(true);
    this.dialogActionEvent.emit({ action: 'publish', entities: this.dialogData.entities });
  }

  discard() {
    this.error$.set(null);
    this.loading$.set(true);
    this.dialogActionEvent.emit({ action: 'discard', entities: undefined });
  }
}
