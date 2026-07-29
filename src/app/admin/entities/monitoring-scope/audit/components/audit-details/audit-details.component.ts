import {Component, inject, ChangeDetectionStrategy, input} from '@angular/core';

import {EntityDetailsComponent} from "../../../../../base-entities/components/entity-details/entity-details.component";
import {AppAudit} from '../../models/audit';
import {AuditConfigService} from "../../services/audit-config.service";
import {BaseEntityDetailsComponent} from '../../../../../base-entities/components/entity-details/base-entity-details.component';
import {ProjectConfigService} from '../../../../project/services/project-config.service';
import {AppProject} from '../../../../project/models/project';
import {DetailType} from '../../../../../base-entities/enums/detail-type';

@Component({
  selector: 'app-audit-details',
  templateUrl: './audit-details.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    EntityDetailsComponent,
  ]
})
export class AuditDetailsComponent {
  configService = inject(AuditConfigService);

  entity = input.required<AppAudit | undefined>();
  detailType = input<DetailType>();
}
