import {Component, inject} from "@angular/core";

import {AppProtocol} from "../../models/protocol";
import {ProtocolConfigService} from "../../services/protocol-config.service";
import {ProtocolActionsComponent} from '../protocol-actions/protocol-actions.component';
import {TranslatePipe} from '@ngx-translate/core';
import {BaseEntityComponent} from '../../../../components/entity/base-entity.component';
import {EntityComponent} from '../../../../components/entity/entity.component';
import {ProtocolDetailsComponent} from '../protocol-details/protocol-details.component';

@Component({
  selector: 'app-protocol-table-row',
  templateUrl: './protocol-table-row.component.html',
  imports: [
    ProtocolActionsComponent,
    TranslatePipe,
    EntityComponent,
    ProtocolDetailsComponent,
  ]
})
export class ProtocolTableRowComponent extends BaseEntityComponent<AppProtocol> {
  override configService = inject(ProtocolConfigService);
}
