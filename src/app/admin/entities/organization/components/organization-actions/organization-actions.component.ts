import {Component, inject, input} from '@angular/core';
import {AppOrganization} from "../../models/organization";
import {DialogMode} from "../../../../shared/enums/dialog";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {TranslatePipe} from "@ngx-translate/core";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatIcon} from '@angular/material/icon';
import {OrganizationDialogService} from '../../services/organization-dialog.service';

@Component({
  selector: 'app-organization-actions',
  templateUrl: './organization-actions.component.html',
  imports: [
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    TranslatePipe,
    MatIconButton,
    MatTooltip,
    MatIcon,
  ]
})
export class OrganizationActionsComponent {
  protected readonly DialogMode = DialogMode;

  private dialogService = inject(OrganizationDialogService);

  entity = input.required<AppOrganization>();
  isExpanded = input<boolean>(true);

  async onAction(mode: DialogMode) {
    await this.dialogService.openDialog(mode, this.entity());
  }
}
