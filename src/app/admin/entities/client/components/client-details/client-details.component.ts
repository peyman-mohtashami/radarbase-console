import {Component, input} from '@angular/core';

import { AppClient } from "../../models/client";
import {ClientTagsComponent} from "../client-resource-ids/client-tags.component";
import {MatIcon} from "@angular/material/icon";
import {DialogMode} from "../../../../enums/dialog";
import {DetailType} from "../../../../enums/detail-type";
import {ENTITY_NAME} from "../../../../enums/entities";
import {DetailsComponent} from "../../../../components/details/details.component";
import {TableElement} from '../../../../models/table.model';
import {DhmsPipe} from '../../../../../shared/pipes/dhms.pipe';

@Component({
  selector: 'rb-client-details',
  templateUrl: './client-details.component.html',
  imports: [
    MatIcon,
    ClientTagsComponent,
    DhmsPipe,
    DetailsComponent,
  ]
})
export class ClientDetailsComponent {
  protected readonly DetailType = DetailType;
  protected readonly ENTITY_NAME = ENTITY_NAME;

  entity$ = input.required<AppClient>();
  mode$ = input<DialogMode>();
  type$ = input<DetailType>();
  tableFields$ = input.required<TableElement[]>();
}
