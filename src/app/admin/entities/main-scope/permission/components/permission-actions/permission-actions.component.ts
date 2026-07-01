import {Component, inject, input} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {DialogMode} from '../../../../../base-entities/enums/dialog';
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
  templateUrl: './permission-actions.component.html',
})
export class PermissionActionsComponent {

  protected readonly DialogMode = DialogMode;

  private configService = inject(PermissionConfigService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dialogService = inject(PermissionDialogService);


  entity = input.required<AppUser>();
  isExpanded = input<boolean>(true);
  disabled = input<boolean>(false);

  entityName = this.configService.getEntityMetadata().name;

  onAction(mode: DialogMode) {
    this.dialogService.openDialog(mode, this.entity());
    // this.router.navigate([], {
    //   relativeTo: this.route,
    //   queryParamsHandling: 'preserve',
    //   fragment: `/${mode}/${this.entityName}/${this.entity()._name}`
    // }).then()
  }
}
