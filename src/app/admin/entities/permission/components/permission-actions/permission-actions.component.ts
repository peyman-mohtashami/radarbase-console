import {Component, inject, input, ChangeDetectionStrategy} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {DialogMode} from '../../../../shared/enums/dialog';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {TranslatePipe} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppUser} from "../../../user/models/user";
import {MatTooltip} from "@angular/material/tooltip";
import {PermissionConfigService} from '../../services/permission-config.service';
import {MatIcon} from '@angular/material/icon';
import {OrganizationDialogService} from '../../../organization/services/organization-dialog.service';
import {PermissionDialogService} from '../../services/permission-dialog.service';

@Component({
  selector: 'app-permission-actions',
  imports: [
    MatIconButton,
    MatMenu,
    MatMenuItem,
    TranslatePipe,
    MatMenuTrigger,
    MatTooltip,
    MatIcon
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './permission-actions.component.html',
})
export class PermissionActionsComponent {

  protected readonly DialogMode = DialogMode;

  private configService = inject(PermissionConfigService);
  private dialogService = inject(PermissionDialogService);


  entity = input.required<AppUser>();
  isExpanded = input<boolean>(true);
  disabled = input<boolean>(false);

  entityName = this.configService.getEntityMetadata().name;

  async onAction(mode: DialogMode) {
    await this.dialogService.openDialog(mode, this.entity());
  }
}
