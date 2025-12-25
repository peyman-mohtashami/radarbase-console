import {Component, inject} from "@angular/core";
import {RouterLink} from "@angular/router";
import {ClientDetailsComponent} from "../client-details/client-details.component";
import {AppClient} from '../../models/client';
import {TagComponent} from '../../../../../shared/components/tag/tag.component';
import {DhmsPipe} from '../../../../../shared/pipes/dhms.pipe';
import {ClientConfigService} from "../../services/client-config.service";
import {BaseEntityTableRowComponent} from '../../../../base-entities/components/entity-table-row/base-entity-table-row.component';
import {EntityTableRowComponent} from '../../../../base-entities/components/entity-table-row/entity-table-row.component';
import {TranslatePipe} from '@ngx-translate/core';
import {ClientActionsComponent} from '../client-actions/client-actions.component';

@Component({
  selector: 'app-client-table-row',
  templateUrl: './client-table-row.component.html',
  imports: [
    RouterLink,
    TagComponent,
    DhmsPipe,
    ClientDetailsComponent,
    EntityTableRowComponent,
    TranslatePipe,
    ClientActionsComponent,
  ]
})
export class ClientTableRowComponent extends BaseEntityTableRowComponent<AppClient>{
  override configService = inject(ClientConfigService);
}
