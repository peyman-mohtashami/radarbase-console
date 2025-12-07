import {Component, inject} from "@angular/core";
import {AppProtocol} from "../../models/protocol";
import {ActionsComponent} from "../actions/actions.component";
import {ProtocolConfigService} from "../../services/protocol-config.service";
import {ProtocolDetailsComponent} from "../protocol-details/protocol-details.component";
import {BaseEntityComponent} from '../../../../components/entity/base-entity.component';
import {EntityComponent} from '../../../../components/entity/entity.component';

@Component({
  selector: 'app-protocol-table-row',
  templateUrl: './protocol-table-row.component.html',
  imports: [
    ActionsComponent,
    ActionsComponent,
    ProtocolDetailsComponent,
    ActionsComponent,
    EntityComponent,
  ]
})
export class ProtocolTableRowComponent extends BaseEntityComponent<AppProtocol>{
  override configService = inject(ProtocolConfigService);
}
