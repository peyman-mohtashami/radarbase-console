import {Component, inject, ChangeDetectionStrategy} from "@angular/core";
import {AppAudit} from "../../models/audit";
import {JsonPipe} from "@angular/common";
import {LocalDateComponent} from "../../../../../../core/locale/components/local-date/local-date.component";
import {AuditConfigService} from "../../services/audit-config.service";
import {EntityTableRowComponent} from '../../../../../base-entities/components/entity-table-row/entity-table-row.component';
import {BaseEntityTableRowComponent} from '../../../../../base-entities/components/entity-table-row/base-entity-table-row.component';
import {AuditDetailsComponent} from '../audit-details/audit-details.component';

@Component({
  selector: 'app-audit-table-row',
  templateUrl: './audit-table-row.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    LocalDateComponent,
    JsonPipe,
    EntityTableRowComponent,
    AuditDetailsComponent,
  ]
})
export class AuditTableRowComponent extends BaseEntityTableRowComponent<AppAudit> {
  override configService = inject(AuditConfigService);
}
