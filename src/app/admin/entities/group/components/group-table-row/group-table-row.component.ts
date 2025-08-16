import {Component, inject, input, output} from "@angular/core";
import {DetailType} from "../../../../enums/detail-type";
import {ENTITY_NAME, ROLES} from "../../../../enums/entities";
import {DialogMode} from "../../../../enums/dialog";
import {TABLE_ANIMATION} from "../../../../animation";
import {AppGroup} from "../../models/group";
import {PROPERTIES} from "../../config";
import {MatCard} from "@angular/material/card";
import {MatIconButton} from "@angular/material/button";
import {AsyncPipe} from "@angular/common";
import {entitiesConfig} from "../../../../../core/config/store/config.selectors";
import {map} from "rxjs/operators";
import {Store} from "@ngrx/store";

@Component({
  selector: 'rb-group-table-row',
  templateUrl: './group-table-row.component.html',
  animations: TABLE_ANIMATION,
  imports: [
    MatCard,
    MatIconButton,
    AsyncPipe
  ]
})
export class GroupTableRowComponent {
  protected readonly DetailType = DetailType;
  protected readonly ROLES = ROLES;
  protected readonly PROPERTIES = PROPERTIES;
  protected readonly DialogMode = DialogMode;

  updated = input()
  entity = input.required<AppGroup>();

  store = inject(Store);

  actionEvent = output<{mode: DialogMode, entity: AppGroup}>()

  expanded = false

  config$ = this.store?.select(entitiesConfig).pipe(
    map(config => config?.[ENTITY_NAME.organization]?.fields ?? {})
  )

  // constructor(private store: Store) {}

  onAction(mode: DialogMode, entity: AppGroup) {
    this.actionEvent.emit({mode, entity});
  }

  // onExpansionClick(event: MouseEvent) {
  //   event.stopPropagation();
  //   this.expanded = !this.expanded;
  // }
}
