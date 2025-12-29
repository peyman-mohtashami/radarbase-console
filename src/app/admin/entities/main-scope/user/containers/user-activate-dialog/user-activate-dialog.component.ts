import {
  AfterViewInit,
  Component,
  inject,
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
import {DialogMode} from '../../../../../base-entities/enums/dialog';
import {BaseEntityDialogComponent} from '../../../../../base-entities/containers/entity-dialog/base-entity-dialog.component';

@Component({
  selector: 'app-user-activate-dialog',
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
export class UserActivateDialogComponent extends BaseEntityDialogComponent<AppUser> implements AfterViewInit {
  override dialogRef = inject(MatDialogRef<UserDialogService>);
  override dialogData = inject(MAT_DIALOG_DATA) as {
    mode: DialogMode | string;
    entity: AppUser;
    entities: AppUser[];
    projects: AppProject[];
    organizations: AppOrganization[];
  };

  ngAfterViewInit() {
    super.afterViewInit();
  }

  override onAction() {
    this.error.set(null);
    this.loading.set(true);
    this.handleActivateAction();
  }

  private handleActivateAction(): void {
    this.dialogActionEvent.emit({action: this.dialogData.mode, entity: this.dialogData.entity});
  }
}
