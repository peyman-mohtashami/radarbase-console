import {Component, input} from '@angular/core';

import { TableElements} from "../../config";
import { AppAudit } from "../../models/audit";
import {DialogMode} from "../../../../enums/dialog";
import {DetailType} from "../../../../enums/detail-type";
import {ENTITY_NAME} from "../../../../enums/entities";
import {DetailsComponent} from "../../../../components/details/details.component";

@Component({
  selector: 'rb-audit-details',
  templateUrl: './audit-details.component.html',
  imports: [
    DetailsComponent,
  ]
})
export class AuditDetailsComponent {
  protected readonly DetailType = DetailType;
  protected readonly TableElements = TableElements;
  protected readonly ENTITY_NAME = ENTITY_NAME;

  entity = input.required<AppAudit>();
  config = input<Record<string, boolean>>({})
  mode = input<DialogMode>();
  type = input<DetailType>();
}
