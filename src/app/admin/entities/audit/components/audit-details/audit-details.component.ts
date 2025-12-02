import {Component, inject, input} from '@angular/core';

import {DialogMode} from "../../../../enums/dialog";
import {DetailType} from "../../../../enums/detail-type";
import {DetailsComponent} from "../../../../components/details/details.component";
import {AppAudit} from '../../models/audit';
import {AuditConfigService} from "../../services/audit-config.service";

@Component({
  selector: 'app-audit-details',
  templateUrl: './audit-details.component.html',
  imports: [
    DetailsComponent,
  ]
})
export class AuditDetailsComponent {
  protected readonly DetailType = DetailType;

  protected configService = inject(AuditConfigService);

  entity = input.required<AppAudit>();
  dialogMode = input<DialogMode>();
  detailType = input<DetailType>();
}
