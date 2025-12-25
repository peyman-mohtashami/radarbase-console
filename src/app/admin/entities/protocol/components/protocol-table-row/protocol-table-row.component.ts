import {Component, inject} from "@angular/core";

import {AppProtocol} from "../../models/protocol";
import {ProtocolConfigService} from "../../services/protocol-config.service";
import {ProtocolActionsComponent} from '../protocol-actions/protocol-actions.component';
import {TranslatePipe} from '@ngx-translate/core';
import {BaseEntityTableRowComponent} from '../../../../base-entities/components/entity-table-row/base-entity-table-row.component';
import {EntityTableRowComponent} from '../../../../base-entities/components/entity-table-row/entity-table-row.component';
import {ProtocolDetailsComponent} from '../protocol-details/protocol-details.component';

@Component({
  selector: 'app-protocol-table-row',
  templateUrl: './protocol-table-row.component.html',
  imports: [
    ProtocolActionsComponent,
    TranslatePipe,
    EntityTableRowComponent,
    ProtocolDetailsComponent,
  ]
})
export class ProtocolTableRowComponent extends BaseEntityTableRowComponent<AppProtocol> {
  override configService = inject(ProtocolConfigService);
}
