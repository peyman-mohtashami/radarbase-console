import {Component, inject, input} from '@angular/core';

import {EntityDetailsComponent} from "../../../../../base-entities/components/entity-details/entity-details.component";
import {AppAudit} from '../../models/audit';
import {AuditConfigService} from "../../services/audit-config.service";
import {DetailType} from '../../../../../base-entities/enums/detail-type';

@Component({
  selector: 'app-audit-details',
  templateUrl: './audit-details.component.html',
  imports: [
    EntityDetailsComponent,
  ]
})
export class AuditDetailsComponent {
  configService = inject(AuditConfigService);

  entity = input.required<AppAudit | undefined>();
  detailType = input<DetailType>();
}
