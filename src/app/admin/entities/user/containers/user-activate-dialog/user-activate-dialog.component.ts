import {
  AfterViewInit,
  Component,
  EventEmitter,
  inject,
  Output,
  signal
} from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { AppUser } from "../../models/user";
import {TranslatePipe} from "@ngx-translate/core";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {UserDialogService} from '../../services/user-dialog.service';
import {AppProject} from '../../../project/models/project';
import {AppOrganization} from '../../../organization/models/organization';
import {HttpErrorResponse} from '@angular/common/http';
import {DialogMode} from '../../../../enums/dialog';

@Component({
  selector: 'rb-user-activate-dialog',
  templateUrl: './user-activate-dialog.component.html',
  imports: [
    MatDialogTitle,
    MatIconButton,
    MatIcon,
    TranslatePipe,
    MatDialogContent,
    MatButton,
    MatIcon,
    MatProgressSpinner,
  ]
})
export class UserActivateDialogComponent implements AfterViewInit {
  private dialogRef = inject(MatDialogRef<UserDialogService>);
  public dialogData = inject(MAT_DIALOG_DATA) as {
    mode: DialogMode | string;
    entity: AppUser;
    entities: AppUser[];
    projects: AppProject[];
    organizations: AppOrganization[];
  };

  loading$ = signal(false);
  error$ = signal<HttpErrorResponse | null>(null);

  @Output()
  dialogActionEvent = new EventEmitter<{ action: DialogMode | string, entity?: AppUser }>();

  ngAfterViewInit() {
    const container = document.querySelector('.tailwind-slide-panel');
    setTimeout(() => {
      container?.classList.add('dialog-enter-active');
    });
  }

  onAction() {
    this.error$.set(null);
    this.loading$.set(true);
    this.handleActivateAction();
  }

  private handleActivateAction(): void {
    this.dialogActionEvent.emit({action: this.dialogData.mode, entity: this.dialogData.entity});
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
}
