import {Component, inject, input} from '@angular/core';

import { AppClient } from "../../models/client";
import {ClientTagsComponent} from "../client-resource-ids/client-tags.component";
import {MatIcon} from "@angular/material/icon";
import {EntityDetailsComponent} from "../../../../shared/components/entity-details/entity-details.component";
import {ClientConfigService} from "../../services/client-config.service";
import {DurationPipe} from '../../../../../shared/pipes/duration.pipe';
import {DetailType} from '../../../../shared/enums/detail-type';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  imports: [
    MatIcon,
    ClientTagsComponent,
    EntityDetailsComponent,
    DurationPipe,
  ]
})
export class ClientDetailsComponent {
  configService = inject(ClientConfigService);

  entity = input.required<AppClient | undefined>();
  detailType = input<DetailType>();
}
