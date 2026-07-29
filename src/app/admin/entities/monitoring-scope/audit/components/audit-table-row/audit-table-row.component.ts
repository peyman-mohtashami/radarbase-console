import {Component, inject, ChangeDetectionStrategy, input, signal} from "@angular/core";
import {AppAudit} from "../../models/audit";
import {JsonPipe} from "@angular/common";
import {LocalDateComponent} from "../../../../../../core/locale/components/local-date/local-date.component";
import {AuditConfigService} from "../../services/audit-config.service";
import {EntityTableRowComponent} from '../../../../../base-entities/components/entity-table-row/entity-table-row.component';
import {BaseEntityTableRowComponent} from '../../../../../base-entities/components/entity-table-row/base-entity-table-row.component';
import {AuditDetailsComponent} from '../audit-details/audit-details.component';
import {RevisionConfigService} from '../../../../revision/services/revision-config.service';
import {AppRevision} from '../../../../revision/models/revision';
import {ROLES} from '../../../../../../shared/enums/roles';
import {DetailType} from '../../../../../base-entities/enums/detail-type';

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
export class AuditTableRowComponent {
  protected readonly ROLES = ROLES;
  protected readonly DetailType = DetailType;

  configService = inject(AuditConfigService);

  entity = input.required<AppAudit>();
  extensionClass = input<string>();
  gridView = input<boolean>(false);

  updated = signal(false);

}
