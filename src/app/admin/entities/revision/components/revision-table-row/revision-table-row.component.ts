import {Component, inject, input, output} from "@angular/core";
import {DetailType} from "../../../../enums/detail-type";
import {ENTITY_NAME, ROLES} from "../../../../enums/entities";
import {DialogMode} from "../../../../enums/dialog";
import {TABLE_ANIMATION} from "../../../../animation";
import {AppRevision} from "../../models/revision";
import {PROPERTIES} from "../../config";
import {MatCard} from "@angular/material/card";
import {ModificationComponent} from "../modifications/modification.component";
import {LocalDateComponent} from "../../../../../core/locale/components/local-date/local-date.component";
import {MatIconButton} from "@angular/material/button";
import {entitiesConfig} from "../../../../../core/config/store/config.selectors";
import {map} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'rb-revision-table-row',
  templateUrl: './revision-table-row.component.html',
  animations: TABLE_ANIMATION,
  imports: [
    MatCard,
    ModificationComponent,
    LocalDateComponent,
    MatIconButton,
    AsyncPipe
  ]
})
export class RevisionTableRowComponent {
  protected readonly DetailType = DetailType;
  protected readonly ROLES = ROLES;
  protected readonly PROPERTIES = PROPERTIES;
  protected readonly DialogMode = DialogMode;

  updated = input()
  entity = input.required<AppRevision>();

  private store = inject(Store);

  actionEvent = output<{mode: DialogMode, entity: AppRevision}>()

  expanded = false

  config$ = this.store?.select(entitiesConfig).pipe(
    map(config => config?.[ENTITY_NAME.revision]?.fields ?? {})
  )

  // constructor(private store: Store) {}

  onAction(mode: DialogMode, entity: AppRevision) {
    this.actionEvent.emit({mode, entity});
  }

  onExpansionClick(event: MouseEvent) {
    event.stopPropagation();
    this.expanded = !this.expanded;
  }
}
