import {Component, inject} from '@angular/core';
import {AppProtocol} from "../../models/protocol";
import {EntityDetailsComponent} from "../../../../../base-entities/components/entity-details/entity-details.component";
import {ProtocolConfigService} from "../../services/protocol-config.service";
import {TranslatePipe} from '@ngx-translate/core';
import {BaseEntityDetailsComponent} from '../../../../../base-entities/components/entity-details/base-entity-details.component';

@Component({
  selector: 'app-protocol-details',
  templateUrl: './protocol-details.component.html',
  imports: [
    EntityDetailsComponent,
    TranslatePipe,
  ]
})
export class ProtocolDetailsComponent extends BaseEntityDetailsComponent<AppProtocol> {
  override configService = inject(ProtocolConfigService);
}
