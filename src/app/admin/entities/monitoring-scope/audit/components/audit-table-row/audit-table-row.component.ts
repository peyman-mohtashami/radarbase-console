import {Component, inject, input, signal} from "@angular/core";
import {AppAudit} from "../../models/audit";
import {JsonPipe} from "@angular/common";
import {LocalDateComponent} from "../../../../../../core/locale/components/local-date/local-date.component";
import {AuditConfigService} from "../../services/audit-config.service";
import {EntityTableRowComponent} from '../../../../../shared/components/entity-table-row/entity-table-row.component';
import {AuditDetailsComponent} from '../audit-details/audit-details.component';
import {ROLES} from '../../../../../../shared/enums/roles';
import {DetailType} from '../../../../../shared/enums/detail-type';

@Component({
  selector: 'app-audit-table-row',
  templateUrl: './audit-table-row.component.html',
  imports: [
    LocalDateComponent,
    JsonPipe,
    EntityTableRowComponent,
    AuditDetailsComponent,
  ]
})
export class AuditTableRowComponent {
  protected readonly ROLES = ROLES;
  protected readonly DetailType = DetailType;

  configService = inject(AuditConfigService);

  entity = input.required<AppAudit>();
  extensionClass = input<string>();
  gridView = input<boolean>(false);

  updated = signal(false);

}
