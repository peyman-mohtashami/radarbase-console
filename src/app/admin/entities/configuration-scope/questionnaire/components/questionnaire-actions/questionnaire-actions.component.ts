import {Component, inject, input, output, ChangeDetectionStrategy} from '@angular/core';
import {DialogMode} from "../../../../../base-entities/enums/dialog";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {TranslatePipe} from "@ngx-translate/core";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {AppQuestionnaire} from "../../models/questionnaire";
import {QuestionnaireConfigService} from '../../services/questionnaire-config.service';
import {MatIcon} from '@angular/material/icon';
import {QuestionnaireService} from '../../services/questionnaire.service';
import {QuestionnaireDialogService} from '../../services/questionnaire-dialog.service';

@Component({
  selector: 'app-questionnaire-actions',
  templateUrl: './questionnaire-actions.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
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
export class QuestionnaireActionsComponent {
  protected readonly DialogMode = DialogMode;

  private configService = inject(QuestionnaireConfigService);
  private dialogService = inject(QuestionnaireDialogService);

  entity = input.required<AppQuestionnaire>();
  isExpanded = input<boolean>(true);

  entityName = this.configService.getEntityMetadata().name;

  duplicate = output<void>();

  onAction(mode: DialogMode) {
    this.dialogService.openDialog(mode, this.entity());
  }

  onDuplicate() {
    this.duplicate.emit();
    // const duplicateEntity: AppQuestionnaire = {...this.entity(), name: `${this.entity().name}_copy`};
    // this.questionnaireService.add(duplicateEntity).subscribe();
  }
}
