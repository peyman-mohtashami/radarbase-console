import {Component, inject} from '@angular/core';

import {DetailsComponent} from "../../../../components/details/details.component";
import {AppAudit} from '../../models/audit';
import {AuditConfigService} from "../../services/audit-config.service";
import {BaseDetailsComponent} from '../../../../components/details/base-details.component';

@Component({
  selector: 'app-audit-details',
  templateUrl: './audit-details.component.html',
  imports: [
    DetailsComponent,
  ]
})
export class AuditDetailsComponent extends BaseDetailsComponent<AppAudit> {
  override configService = inject(AuditConfigService);
}
