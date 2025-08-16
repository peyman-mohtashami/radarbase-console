import {Component, inject, input, output} from "@angular/core";
import {RouterLink} from "@angular/router";
import {AsyncPipe, KeyValuePipe} from "@angular/common";
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatIconButton} from "@angular/material/button";

import {DetailType} from "../../../../enums/detail-type";
import {ENTITY_NAME, ROLES} from "../../../../enums/entities";
import {DialogMode} from "../../../../enums/dialog";
import {PROPERTIES} from "../../config";
import {TABLE_ANIMATION} from "../../../../animation";
import {RbPermissionDirective} from "../../../../../core/auth/directives/ng-permission.directive";
import {entitiesConfig} from "../../../../../core/config/store/config.selectors";
import {AppQuestionnaire, AppQuestionnaireBundle} from "../../models/questionnaire";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'rb-questionnaire-table-row',
  templateUrl: './questionnaire-table-row.component.html',
  animations: TABLE_ANIMATION,
  imports: [
    MatCard,
    // RouterLink,
    MatIconButton,
    RbPermissionDirective,
    AsyncPipe,
    // MatCardContent,
    KeyValuePipe,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    TranslatePipe,
  ]
})
export class QuestionnaireTableRowComponent {
  protected readonly PROPERTIES = PROPERTIES;
  protected readonly DialogMode = DialogMode;
  protected readonly DetailType = DetailType;
  protected readonly ROLES = ROLES;

  updated = input()
  entity = input.required<AppQuestionnaireBundle>()
  gridView = input<boolean>(false)

  private store = inject(Store);

  actionEvent = output<{mode: DialogMode, entity: AppQuestionnaire, language?: string}>()

  expanded = false;

  config$ = this.store?.select(entitiesConfig).pipe(
    map(config => config?.[ENTITY_NAME.organization]?.fields ?? {})
  )

  // constructor(private store: Store) {}

  onAction(mode: DialogMode, entity: AppQuestionnaire, language: string) {
    this.actionEvent.emit({mode, entity, language});
  }

  onExpansionClick(event: MouseEvent) {
    event.stopPropagation();
    this.expanded = !this.expanded;
  }

  protected readonly ENTITY_NAME = ENTITY_NAME;

  // onTranslationAction(EDIT: DialogMode, entity?: AppQuestionnaire, key?: unknown, x?: unknown) {
  //
  // }

  onTranslationAction(
    mode: DialogMode,
    entity: AppQuestionnaire,
    // language?: RadarARMTLanguage,
    language?: string,
    // entityName?: string,
    e?: Event
  ): void {
    e?.stopPropagation();
    // this.onAction(mode, entity, undefined, undefined, language);
    this.actionEvent.emit({mode, entity, language});
  }

}
