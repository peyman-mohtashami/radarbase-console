import {Component, input} from '@angular/core';

import { AppClient } from "../../models/client";
import { PROPERTIES} from "../../config";
import {ClientTagsComponent} from "../client-resource-ids/client-tags.component";
import {MatIcon} from "@angular/material/icon";
import {DhmsPipe} from "../../../../pipes/dhms.pipe";
import {DialogMode} from "../../../../enums/dialog";
import {DetailType} from "../../../../enums/detail-type";
import {ENTITY_NAME} from "../../../../enums/entities";
import {DetailsComponent} from "../../../../components/details/details.component";

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
  protected readonly PROPERTIES = PROPERTIES;
  protected readonly ENTITY_NAME = ENTITY_NAME;

  entity = input.required<AppClient>();
  config = input<Record<string, boolean>>({})
  mode = input<DialogMode>();
  type = input<DetailType>();
}
