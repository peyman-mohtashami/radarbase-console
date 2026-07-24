import {Component, inject, input, ChangeDetectionStrategy} from '@angular/core';
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {TranslatePipe} from "@ngx-translate/core";
import {MatIconButton} from "@angular/material/button";
import {ActivatedRoute, Router} from '@angular/router';
import {AppSubject} from '../../models/subject';
import {MatTooltip} from '@angular/material/tooltip';
import {SubjectDialogMode} from '../../enums/dialog';
import {SubjectConfigService} from "../../services/subject-config.service";
import {MatIcon} from '@angular/material/icon';
import {SubjectDialogService} from '../../services/subject-dialog.service';

@Component({
  selector: 'app-subject-actions',
  templateUrl: './subject-actions.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
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
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private dialogService = inject(SubjectDialogService);

  entityName = this.configService.getEntityMetadata().name;

  onAction(mode: SubjectDialogMode) {
    this.dialogService.openDialog(mode, this.entity());
  }
}
