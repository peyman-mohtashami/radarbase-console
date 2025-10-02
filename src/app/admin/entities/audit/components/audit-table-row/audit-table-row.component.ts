import {Component, input, signal} from "@angular/core";
import {DetailType} from "../../../../enums/detail-type";
import {DialogMode} from "../../../../enums/dialog";
import {TABLE_ANIMATION} from "../../../../animation";
import {AppAudit} from "../../models/audit";
import {MatCard} from "@angular/material/card";
import {JsonPipe} from "@angular/common";
import {LocalDateComponent} from "../../../../../core/locale/components/local-date/local-date.component";
import {AuditDetailsComponent} from "../audit-details/audit-details.component";
import {MatIconButton} from "@angular/material/button";
import {TableElement} from '../../../../models/table.model';

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
  ]
})
export class AuditTableRowComponent {
  protected readonly DialogMode = DialogMode;
  protected readonly DetailType = DetailType;

  entity$ = input.required<AppAudit>();
  tableFields$ = input.required<TableElement[]>();
  configFields$ = input.required<Record<string, boolean>>();
  extensionClass$ = input<string>();

  expanded$ = signal(false);
  updated$ = signal(false);

  onExpansionClick(event: MouseEvent) {
    event.stopPropagation();
    this.expanded$.update((currentValue) => !currentValue);
  }
}
