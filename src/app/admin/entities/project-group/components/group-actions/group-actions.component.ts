import {Component, inject, input} from '@angular/core';
import {DialogMode} from "../../../../base-entities/enums/dialog";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {TranslatePipe} from "@ngx-translate/core";
import {MatIconButton} from "@angular/material/button";
import {AppGroup} from '../../models/group';
import {MatTooltip} from "@angular/material/tooltip";
import {GroupConfigService} from "../../services/group-config.service";
import {MatIcon} from '@angular/material/icon';
import {GroupDialogService} from '../../services/group-dialog.service';

@Component({
  selector: 'app-group-actions',
  templateUrl: './group-actions.component.html',
  imports: [
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    TranslatePipe,
    MatIconButton,
    MatTooltip,
    MatIcon
  ]
})
export class GroupActionsComponent {
  protected readonly DialogMode = DialogMode;

  private configService = inject(GroupConfigService);
  private dialogService = inject(GroupDialogService);

  entity = input.required<AppGroup>();
  isExpanded = input<boolean>(true);

  entityName = this.configService.getEntityMetadata().name;

  async onAction(mode: DialogMode) {
    await this.dialogService.openDialog(mode, this.entity());
  }
}
