import {Component, inject} from "@angular/core";
import {AppAudit} from "../../models/audit";
import {JsonPipe} from "@angular/common";
import {LocalDateComponent} from "../../../../../core/locale/components/local-date/local-date.component";
import {AuditConfigService} from "../../services/audit-config.service";
import {EntityComponent} from '../../../../components/entity/entity.component';
import {BaseEntityComponent} from '../../../../components/entity/base-entity.component';
import {AuditDetailsComponent} from '../audit-details/audit-details.component';

@Component({
  selector: 'app-audit-table-row',
  templateUrl: './audit-table-row.component.html',
  imports: [
    LocalDateComponent,
    JsonPipe,
    EntityComponent,
    AuditDetailsComponent,
  ]
})
export class AuditTableRowComponent extends BaseEntityComponent<AppAudit> {
  override configService = inject(AuditConfigService);
}
