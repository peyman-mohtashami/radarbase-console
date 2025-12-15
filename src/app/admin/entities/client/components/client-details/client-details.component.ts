import {Component, inject} from '@angular/core';

import { AppClient } from "../../models/client";
import {ClientTagsComponent} from "../client-resource-ids/client-tags.component";
import {MatIcon} from "@angular/material/icon";
import {DetailsComponent} from "../../../../components/details/details.component";
import {DhmsPipe} from '../../../../../shared/pipes/dhms.pipe';
import {ClientConfigService} from "../../services/client-config.service";
import {BaseDetailsComponent} from '../../../../components/details/base-details.component';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  imports: [
    MatIcon,
    ClientTagsComponent,
    DhmsPipe,
    DetailsComponent,
  ]
})
export class ClientDetailsComponent extends BaseDetailsComponent<AppClient> {
  override configService = inject(ClientConfigService);
}
