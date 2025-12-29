import {Component, inject} from '@angular/core';

import { AppClient } from "../../models/client";
import {ClientTagsComponent} from "../client-resource-ids/client-tags.component";
import {MatIcon} from "@angular/material/icon";
import {EntityDetailsComponent} from "../../../../../base-entities/components/entity-details/entity-details.component";
import {ClientConfigService} from "../../services/client-config.service";
import {BaseEntityDetailsComponent} from '../../../../../base-entities/components/entity-details/base-entity-details.component';
import {DurationPipe} from '../../../../../../shared/pipes/duration.pipe';

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
export class ClientDetailsComponent extends BaseEntityDetailsComponent<AppClient> {
  override configService = inject(ClientConfigService);
}
