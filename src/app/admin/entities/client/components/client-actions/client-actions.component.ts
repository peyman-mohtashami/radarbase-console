import {Component, inject, input} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {DialogMode} from '../../../../shared/enums/dialog';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {TranslatePipe} from '@ngx-translate/core';
import {AppClient} from '../../models/client';
import {MatTooltip} from "@angular/material/tooltip";
import {ClientConfigService} from "../../services/client-config.service";
import {MatIcon} from '@angular/material/icon';
import {ClientDialogService} from '../../services/client-dialog.service';

@Component({
  selector: 'app-client-actions',
  imports: [
    MatIconButton,
    MatMenu,
    MatMenuItem,
    TranslatePipe,
    MatMenuTrigger,
    MatTooltip,
    MatIcon,
  ],
  templateUrl: './client-actions.component.html',
})
export class ClientActionsComponent {
  protected readonly DialogMode = DialogMode;

  private configService = inject(ClientConfigService);
  private dialogService = inject(ClientDialogService);

  entity = input.required<AppClient>();
  isExpanded = input<boolean>(true);

  entityName = this.configService.getEntityMetadata().name;

  async onAction(mode: DialogMode) {
    await this.dialogService.openDialog(mode, this.entity());
  }
}
