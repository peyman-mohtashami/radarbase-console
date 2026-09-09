import {Component, inject, input} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {DialogMode} from '../../../../shared/enums/dialog';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {TranslatePipe} from '@ngx-translate/core';
import {AppSourceType} from '../../models/source-type';
import {MatTooltip} from "@angular/material/tooltip";
import {MatIcon} from '@angular/material/icon';
import {SourceTypeDialogService} from '../../services/source-type-dialog.service';

@Component({
  selector: 'app-source-type-actions',
  templateUrl: './source-type-actions.component.html',
  imports: [
    MatIconButton,
    MatMenu,
    MatMenuItem,
    TranslatePipe,
    MatMenuTrigger,
    MatTooltip,
    MatIcon
  ],
})
export class SourceTypeActionsComponent {
  protected readonly DialogMode = DialogMode;

  private dialogService = inject(SourceTypeDialogService);

  entity = input.required<AppSourceType>();
  isExpanded = input<boolean>(true);

  async onAction(mode: DialogMode) {
    await this.dialogService.openDialog(mode, this.entity());
  }
}
