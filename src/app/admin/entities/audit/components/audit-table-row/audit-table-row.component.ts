import {Component, inject, input, signal} from "@angular/core";
import {DetailType} from "../../../../enums/detail-type";
import {DialogMode} from "../../../../enums/dialog";
import {AppAudit} from "../../models/audit";
import {MatCard} from "@angular/material/card";
import {JsonPipe} from "@angular/common";
import {LocalDateComponent} from "../../../../../core/locale/components/local-date/local-date.component";
import {AuditDetailsComponent} from "../audit-details/audit-details.component";
import {MatIconButton} from "@angular/material/button";
import {AuditConfigService} from "../../services/audit-config.service";

@Component({
  selector: 'app-audit-table-row',
  templateUrl: './audit-table-row.component.html',
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

  configService = inject(AuditConfigService);

  entity = input.required<AppAudit>();
  extensionClass = input<string>();

  expanded = signal(false);
  updated = signal(false);

  onExpansionClick(event: MouseEvent) {
    event.stopPropagation();
    this.expanded.update((currentValue) => !currentValue);
  }
}
