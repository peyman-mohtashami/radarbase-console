import {Component, inject, input} from '@angular/core';
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {TranslatePipe} from "@ngx-translate/core";
import {MatIconButton} from "@angular/material/button";
import {AppSubject} from '../../models/subject';
import {MatTooltip} from '@angular/material/tooltip';
import {SubjectDialogMode} from '../../enums/dialog';
import {SubjectConfigService} from "../../services/subject-config.service";
import {MatIcon} from '@angular/material/icon';
import {SubjectDialogService} from '../../services/subject-dialog.service';

@Component({
  selector: 'app-subject-actions',
  templateUrl: './subject-actions.component.html',
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
export class SubjectActionsComponent {
  protected readonly DialogMode = SubjectDialogMode;

  entity = input.required<AppSubject>();
  isExpanded = input<boolean>(true);

  private configService = inject(SubjectConfigService);
  private dialogService = inject(SubjectDialogService);

  entityName = this.configService.getEntityMetadata().name;

  async onAction(mode: SubjectDialogMode) {
    await this.dialogService.openDialog(mode, this.entity());
  }
}
