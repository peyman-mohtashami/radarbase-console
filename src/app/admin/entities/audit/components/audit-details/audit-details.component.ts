import {Component, input} from '@angular/core';

import {DialogMode} from "../../../../enums/dialog";
import {DetailType} from "../../../../enums/detail-type";
import {ENTITY_NAME} from "../../../../enums/entities";
import {DetailsComponent} from "../../../../components/details/details.component";
import {TableElement} from '../../../../models/table.model';
import {AppAudit} from '../../models/audit';

@Component({
  selector: 'rb-audit-details',
  templateUrl: './audit-details.component.html',
  imports: [
    DetailsComponent,
  ]
})
export class AuditDetailsComponent {
  protected readonly DetailType = DetailType;
  protected readonly ENTITY_NAME = ENTITY_NAME;

  entity$ = input.required<AppAudit>();
  mode$ = input<DialogMode>();
  type$ = input<DetailType>();
  tableFields$ = input.required<TableElement[]>();
}
