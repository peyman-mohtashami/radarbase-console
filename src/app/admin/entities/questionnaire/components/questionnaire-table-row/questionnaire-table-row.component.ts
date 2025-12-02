import {Component, effect, inject, input, signal} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {MatCard} from "@angular/material/card";
import {MatIconButton} from "@angular/material/button";

import {DetailType} from "../../../../enums/detail-type";
import {ROLES} from "../../../../../shared/enums/roles";
import {DialogMode} from "../../../../enums/dialog";
import {UpdateTrigger} from "../../../protocol/services/protocol-dialog.service";
import {TableElement} from "../../../../models/table.model";
import {AppQuestionnaire} from "../../models/questionnaire";
import {QuestionnaireDetailsComponent} from "../questionnaire-details/questionnaire-details.component";
import {ActionsComponent} from "../actions/actions.component";

@Component({
  selector: 'app-questionnaire-table-row',
  templateUrl: './questionnaire-table-row.component.html',
  imports: [
    MatCard,
    MatIconButton,
    ActionsComponent,
    QuestionnaireDetailsComponent,
    ActionsComponent,
  ]
})
export class QuestionnaireTableRowComponent {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  protected readonly DialogMode = DialogMode;
  protected readonly DetailType = DetailType;
  protected readonly ROLES = ROLES;

  entity$ = input.required<AppQuestionnaire>();
  entityUpdateTrigger$= input<UpdateTrigger>();
  tableFields$ = input.required<TableElement[]>();
  configFields$ = input.required<Record<string, boolean>>();
  extensionClass$ = input<string>();

  expanded$ = signal(false);
  updated$ = signal(false);
  gridView = input<boolean>(false);

  constructor() {
    effect(() => {
      const updateTrigger = this.entityUpdateTrigger$();
      if (!updateTrigger) return;

      const {mode, entity} = updateTrigger;
      if (entity?.name !== this.entity$()._name) return;
      if (mode === DialogMode.ADD || mode === DialogMode.EDIT) {
        this.updated$.set(true);
        setTimeout(() => {
          this.updated$.set(false);
        }, 1000);
      }
    });
  }

  onExpansionClick(event: MouseEvent) {
    event.stopPropagation();
    this.expanded$.update((currentValue) => !currentValue);
  }

  onTranslationAction(mode: DialogMode, entity: AppQuestionnaire, language?: string) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'preserve',
      fragment: `/${mode}/questionnaire/${this.entity$()._name}/${language}`
    }).then()
  }
}
