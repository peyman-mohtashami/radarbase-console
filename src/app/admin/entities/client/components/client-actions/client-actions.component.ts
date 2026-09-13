import {Component, inject, input} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {DialogMode} from '../../../../shared/models/dialog.model';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {TranslatePipe} from '@ngx-translate/core';
import {AppClient} from '../../models/client';
import {MatTooltip} from "@angular/material/tooltip";
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

  private dialogService = inject(ClientDialogService);

  entity = input.required<AppClient>();
  isExpanded = input<boolean>(true);

  async onAction(mode: DialogMode) {
    await this.dialogService.openDialog(mode, this.entity());
  }
}
