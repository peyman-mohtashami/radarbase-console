import {Component, inject, input, output} from "@angular/core";
import {DetailType} from "../../../../enums/detail-type";
import {ENTITY_NAME, ROLES} from "../../../../enums/entities";
import {DialogMode} from "../../../../enums/dialog";
import {TABLE_ANIMATION} from "../../../../animation";
import {AppSourceType, SourceTypeScope} from "../../models/source-type";
import { PROPERTIES} from "../../config";

import {MatCard} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {SourceTypeScopeComponent} from "../source-type-scope/source-type-scope.component";
import {
  SourceTypeSourceRegistrationComponent
} from "../source-type-source-registration/source-type-source-registration.component";
import {SourceTypeDetailsComponent} from "../source-type-details/source-type-details.component";
import {MatIconButton} from "@angular/material/button";
import {entitiesConfig} from "../../../../../core/config/store/config.selectors";
import {map} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {AsyncPipe} from "@angular/common";
import {TagComponent} from "../../../../components/tag/tag.component";
// import {ActionsComponent} from '../../../source-data/components/actions/actions.component';
import {ActionsComponent} from '../actions/actions.component';

@Component({
  selector: 'rb-source-type-table-row',
  templateUrl: './source-type-table-row.component.html',
  animations: TABLE_ANIMATION,
  imports: [
    MatCard,
    RouterLink,
    SourceTypeScopeComponent,
    SourceTypeSourceRegistrationComponent,
    MatIconButton,
    SourceTypeDetailsComponent,
    AsyncPipe,
    TagComponent,
    ActionsComponent,
  ]
})
export class SourceTypeTableRowComponent {
  protected readonly PROPERTIES = PROPERTIES;
  protected readonly DialogMode = DialogMode;
  protected readonly DetailType = DetailType;
  protected readonly ROLES = ROLES;

  updated = input()
  entity = input.required<AppSourceType>()

  private store = inject(Store)

  actionEvent = output<{mode: DialogMode, entity: AppSourceType}>()

  expanded = false

  config$ = this.store?.select(entitiesConfig).pipe(
    map(config => config?.[ENTITY_NAME.sourceType]?.fields ?? {})
  )

  // constructor(private store: Store) {}

  onAction(mode: DialogMode, entity: AppSourceType) {
    this.actionEvent.emit({mode, entity});
  }

  onExpansionClick(event: MouseEvent) {
    event.stopPropagation();
    this.expanded = !this.expanded;
  }

  protected readonly SourceTypeScope = SourceTypeScope;
}
