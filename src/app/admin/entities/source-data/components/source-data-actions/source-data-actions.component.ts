import {Component, inject, input} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {DialogMode} from '../../../../shared/enums/dialog';
import {AppSourceData} from '../../models/source-data';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {TranslatePipe} from '@ngx-translate/core';
import {SourceDataConfigService} from "../../services/source-data-config.service";
import {MatTooltip} from "@angular/material/tooltip";
import {MatIcon} from '@angular/material/icon';
import {SourceDataDialogService} from '../../services/source-data-dialog.service';

@Component({
  selector: 'app-source-data-actions',
  templateUrl: './source-data-actions.component.html',
  imports: [
    MatIconButton,
    MatMenu,
    MatMenuItem,
    TranslatePipe,
    MatMenuTrigger,
    MatTooltip,
    MatIcon,
  ],
})
export class SourceDataActionsComponent {
  protected readonly DialogMode = DialogMode;

  private configService = inject(SourceDataConfigService);
  private dialogService = inject(SourceDataDialogService);

  entity = input.required<AppSourceData>();
  isExpanded = input<boolean>(true);

  entityName = this.configService.getEntityMetadata().name;

  async onAction(mode: DialogMode) {
    await this.dialogService.openDialog(mode, this.entity());
  }
}
