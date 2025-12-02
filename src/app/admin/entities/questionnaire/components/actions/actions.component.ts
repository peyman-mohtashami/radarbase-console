import {Component, inject, input} from '@angular/core';
import {DialogMode} from "../../../../enums/dialog";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {TranslatePipe} from "@ngx-translate/core";
import {MatIconButton} from "@angular/material/button";
import {ActivatedRoute, Router} from '@angular/router';
import {MatTooltip} from "@angular/material/tooltip";
import {AppQuestionnaire} from "../../models/questionnaire";

@Component({
  selector: 'app-questionnaire-actions',
  templateUrl: './actions.component.html',
  imports: [
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    TranslatePipe,
    MatIconButton,
    MatTooltip
  ]
})
export class ActionsComponent {
  protected readonly DialogMode = DialogMode;

  entity$ = input.required<AppQuestionnaire>();
  isExpanded$ = input<boolean>(true);

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  onAction(mode: DialogMode) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
      fragment: `/${mode}/questionnaire/${this.entity$()._name}`
    }).then()
  }
}
