import {Component, inject, input, output} from "@angular/core";
import {DetailType} from "../../../../enums/detail-type";
import {ENTITY_NAME, ROLES} from "../../../../enums/entities";
import {DialogMode} from "../../../../enums/dialog";
import {TABLE_ANIMATION} from "../../../../animation";
import {AppAudit} from "../../models/audit";
import {TableElements} from "../../config";
import {MatCard} from "@angular/material/card";
import {AsyncPipe, JsonPipe} from "@angular/common";
import {LocalDateComponent} from "../../../../../core/locale/components/local-date/local-date.component";
import {AuditDetailsComponent} from "../audit-details/audit-details.component";
import {MatIconButton} from "@angular/material/button";
import {entitiesConfig} from "../../../../../core/config/store/config.selectors";
import {map} from "rxjs/operators";
import {Store} from "@ngrx/store";

@Component({
  selector: 'rb-audit-table-row',
  templateUrl: './audit-table-row.component.html',
  animations: TABLE_ANIMATION,
  imports: [
    MatCard,
    LocalDateComponent,
    JsonPipe,
    MatIconButton,
    AuditDetailsComponent,
    AsyncPipe
  ]
})
export class AuditTableRowComponent {
  protected readonly DetailType = DetailType;
  protected readonly ROLES = ROLES;
  protected readonly PROPERTIES = TableElements;
  protected readonly DialogMode = DialogMode;

  updated = input()
  entity = input.required<AppAudit>()

  store = inject(Store);

  actionEvent = output<{mode: DialogMode, entity: AppAudit}>()

  expanded = false

  config$ = this.store?.select(entitiesConfig).pipe(
    map(config => config?.[ENTITY_NAME.audit]?.fields ?? {})
  )

  onAction(mode: DialogMode, entity: AppAudit) {
    this.actionEvent.emit({mode, entity});
  }

  onExpansionClick(event: MouseEvent) {
    event.stopPropagation();
    this.expanded = !this.expanded;
  }
}
