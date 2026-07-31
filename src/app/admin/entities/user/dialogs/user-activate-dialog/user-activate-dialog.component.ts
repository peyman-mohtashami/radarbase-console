import {
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
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {UserDialogService} from '../../services/user-dialog.service';
import {AppProject} from '../../../project/models/project';
import {AppOrganization} from '../../../organization/models/organization';
import {DialogMode} from '../../../../base-entities/enums/dialog';
import {UserStore} from '../../services/user.store';
import {animateDialogOut} from '../../../../shared/utils/dialog.util';
import {getLastSegment} from '../../../../shared/utils/route.util';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorMessageBoxComponent} from '../../../../../shared/components/message-box/error-message-box.component';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-user-activate-dialog',
  templateUrl: './user-activate-dialog.component.html',
  imports: [
    MatDialogTitle,
    MatIcon,
    TranslatePipe,
    MatDialogContent,
    MatButton,
    MatIcon,
    MatProgressSpinner,
    ErrorMessageBoxComponent,
    JsonPipe,
  ]
})
export class UserActivateDialogComponent {
  protected store = inject(UserStore);
  private dialogRef = inject(MatDialogRef<UserDialogService>);
  protected dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: DialogMode | string;
    entity: AppUser;
    entities: AppUser[];
    projects: AppProject[];
    organizations: AppOrganization[];
  };
  private router = inject(Router);
  protected activatedRoute = inject(ActivatedRoute);

  protected async activate(): Promise<void> {
    await this.store.sendActivationEmail(this.dialogData.entity);

    if (this.store.error()) return;

    this.dialogRef.close();
    this.navigateOnUpdateSuccess(this.dialogData.entity.login);
  }

  close() {
    animateDialogOut(this.dialogData.id, this.dialogRef);
  }

  navigateOnUpdateSuccess(login: string) {
    const selectedUser = this.store.selected();
    if (!selectedUser) return;

    const urlTree = this.router.parseUrl(this.router.url);
    this.router.navigate(['./admin/users', login, getLastSegment(urlTree)], {queryParams: urlTree.queryParams}).then();
  }
}
