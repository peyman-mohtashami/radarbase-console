import {Component, inject, input} from '@angular/core';
import {DialogMode} from "../../../../enums/dialog";
import {DetailType} from "../../../../enums/detail-type";
import {AppProtocol} from "../../models/protocol";
import {DetailsComponent} from "../../../../components/details/details.component";
import {ProtocolConfigService} from "../../services/protocol-config.service";
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-protocol-details',
  templateUrl: './protocol-details.component.html',
  imports: [
    DetailsComponent,
    TranslatePipe,
  ]
})
export class ProtocolDetailsComponent {
  protected readonly DetailType = DetailType;

  protected configService = inject(ProtocolConfigService);

  entity = input.required<AppProtocol>();
  dialogMode = input<DialogMode>();
  detailType = input<DetailType>();
}
