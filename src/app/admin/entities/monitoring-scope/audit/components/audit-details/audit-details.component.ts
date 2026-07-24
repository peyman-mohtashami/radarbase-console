import {Component, inject, ChangeDetectionStrategy} from '@angular/core';

import {EntityDetailsComponent} from "../../../../../base-entities/components/entity-details/entity-details.component";
import {AppAudit} from '../../models/audit';
import {AuditConfigService} from "../../services/audit-config.service";
import {BaseEntityDetailsComponent} from '../../../../../base-entities/components/entity-details/base-entity-details.component';

@Component({
  selector: 'app-audit-details',
  templateUrl: './audit-details.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    EntityDetailsComponent,
  ]
})
export class AuditDetailsComponent extends BaseEntityDetailsComponent<AppAudit> {
  override configService = inject(AuditConfigService);
}
