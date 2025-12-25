import {Component, inject} from '@angular/core';

import { AppClient } from "../../models/client";
import {ClientTagsComponent} from "../client-resource-ids/client-tags.component";
import {MatIcon} from "@angular/material/icon";
import {EntityDetailsComponent} from "../../../../base-entities/components/entity-details/entity-details.component";
import {DhmsPipe} from '../../../../../shared/pipes/dhms.pipe';
import {ClientConfigService} from "../../services/client-config.service";
import {BaseEntityDetailsComponent} from '../../../../base-entities/components/entity-details/base-entity-details.component';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  imports: [
    MatIcon,
    ClientTagsComponent,
    DhmsPipe,
    EntityDetailsComponent,
  ]
})
export class ClientDetailsComponent extends BaseEntityDetailsComponent<AppClient> {
  override configService = inject(ClientConfigService);
}
