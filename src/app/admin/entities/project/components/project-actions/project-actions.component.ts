import {Component, inject, input} from '@angular/core';
import {DialogMode} from "../../../../shared/enums/dialog";
import {AppProject} from "../../models/project";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {TranslatePipe} from "@ngx-translate/core";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {ProjectConfigService} from "../../services/project-config.service";
import {MatIcon} from '@angular/material/icon';
import {ProjectDialogService} from '../../services/project-dialog.service';

@Component({
  selector: 'app-project-actions',
  templateUrl: './project-actions.component.html',
  imports: [
    MatMenu,
    MatMenuTrigger,
    MatIconButton,
    MatMenuItem,
    TranslatePipe,
    MatTooltip,
    MatIcon
  ]
})
export class ProjectActionsComponent {
  protected readonly DialogMode = DialogMode;

  private configService = inject(ProjectConfigService);
  private dialogService = inject(ProjectDialogService);

  entity = input.required<AppProject>();
  isExpanded = input<boolean>(true);

  entityName = this.configService.getEntityMetadata().name;

  async onAction(mode: DialogMode) {
    await this.dialogService.openDialog(mode, this.entity());
  }
}
