import {Component, inject} from '@angular/core';
import {AppProtocol} from "../../models/protocol";
import {DetailsComponent} from "../../../../components/details/details.component";
import {ProtocolConfigService} from "../../services/protocol-config.service";
import {TranslatePipe} from '@ngx-translate/core';
import {BaseDetailsComponent} from '../../../../components/details/base-details.component';

@Component({
  selector: 'app-protocol-details',
  templateUrl: './protocol-details.component.html',
  imports: [
    DetailsComponent,
    TranslatePipe,
  ]
})
export class ProtocolDetailsComponent extends BaseDetailsComponent<AppProtocol> {
  override configService = inject(ProtocolConfigService);
}
