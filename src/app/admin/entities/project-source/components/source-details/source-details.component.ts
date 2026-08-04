import {Component, inject, input} from '@angular/core';

import { AppSource } from "../../models/source";
import {SourceAssignedComponent} from "../source-assigned/source-assigned.component";
import {KeyValuePipe} from "@angular/common";
import {SourceSourceTypeComponent} from "../source-source-type/source-source-type.component";
import {EntityDetailsComponent} from "../../../../shared/components/entity-details/entity-details.component";
import {SourceConfigService} from "../../services/source-config.service";
import {DetailType} from '../../../../shared/enums/detail-type';

@Component({
  selector: 'app-source-details',
  templateUrl: './source-details.component.html',
  imports: [
    SourceAssignedComponent,
    KeyValuePipe,
    SourceSourceTypeComponent,
    EntityDetailsComponent,
  ]
})
export class SourceDetailsComponent {
  configService = inject(SourceConfigService);

  entity = input.required<AppSource | undefined>();
  detailType = input<DetailType>();
}
