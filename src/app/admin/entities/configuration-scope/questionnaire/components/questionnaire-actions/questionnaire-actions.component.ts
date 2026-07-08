import {Component, inject, input} from '@angular/core';
import {DialogMode} from "../../../../../base-entities/enums/dialog";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {TranslatePipe} from "@ngx-translate/core";
import {MatIconButton} from "@angular/material/button";
import {ActivatedRoute, Router} from '@angular/router';
import {MatTooltip} from "@angular/material/tooltip";
import {AppQuestionnaire} from "../../models/questionnaire";
import {QuestionnaireConfigService} from '../../services/questionnaire-config.service';
import {MatIcon} from '@angular/material/icon';
import {QuestionnaireService} from '../../services/questionnaire.service';
import {QuestionnaireDialogService} from '../../services/questionnaire-dialog.service';
import {MatSlideToggle} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-questionnaire-actions',
  templateUrl: './questionnaire-actions.component.html',
  imports: [
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    TranslatePipe,
    MatIconButton,
    MatTooltip,
    MatIcon,
    MatSlideToggle
  ]
})
export class QuestionnaireActionsComponent {
  protected readonly DialogMode = DialogMode;

  private configService = inject(QuestionnaireConfigService);
  private questionnaireService = inject(QuestionnaireService)
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private dialogService = inject(QuestionnaireDialogService);

  entity = input.required<AppQuestionnaire>();
  isExpanded = input<boolean>(true);

  entityName = this.configService.getEntityMetadata().name;

  onAction(mode: DialogMode) {
    this.dialogService.openDialog(mode, this.entity());
    // this.router.navigate([], {
    //   relativeTo: this.route,
    //   queryParamsHandling: 'preserve',
    //   fragment: `/${mode}/${this.entityName}/${this.entity()._name}`
    // }).then()
  }

  onDuplicate() {
    const duplicateEntity: AppQuestionnaire = {...this.entity(), name: `${this.entity().name}_copy`};
    this.questionnaireService.add(duplicateEntity).subscribe();
  }
}
