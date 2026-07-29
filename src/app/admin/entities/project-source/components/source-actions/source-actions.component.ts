import {Component, inject, input} from '@angular/core';
import {DialogMode} from "../../../../base-entities/enums/dialog";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {TranslatePipe} from "@ngx-translate/core";
import {MatIconButton} from "@angular/material/button";
import {AppSource} from '../../models/source';
import {MatTooltip} from "@angular/material/tooltip";
import {SourceConfigService} from '../../services/source-config.service';
import {MatIcon} from '@angular/material/icon';
import {SourceDialogService} from '../../services/source-dialog.service';

@Component({
  selector: 'app-source-actions',
  templateUrl: './source-actions.component.html',
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
export class SourceActionsComponent {
  protected readonly DialogMode = DialogMode;

  private configService = inject(SourceConfigService);
  private dialogService = inject(SourceDialogService);

  entity = input.required<AppSource>();
  isExpanded = input<boolean>(true);

  entityName = this.configService.getEntityMetadata().name;

  async onAction(mode: DialogMode) {
    await this.dialogService.openDialog(mode, this.entity());
  }
}
