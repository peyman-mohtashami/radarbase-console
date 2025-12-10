import {Component, inject} from '@angular/core';

import { AppSource } from "../../models/source";
import {SourceAssignedComponent} from "../source-assigned/source-assigned.component";
import {KeyValuePipe} from "@angular/common";
import {SourceSourceTypeComponent} from "../source-source-type/source-source-type.component";
import {DetailsComponent} from "../../../../components/details/details.component";
import {SourceConfigService} from "../../services/source-config.service";
import {BaseDetailsComponent} from '../../../../components/details/base-details.component';

@Component({
  selector: 'app-source-details',
  templateUrl: './source-details.component.html',
  imports: [
    SourceAssignedComponent,
    KeyValuePipe,
    SourceSourceTypeComponent,
    DetailsComponent,
  ]
})
export class SourceDetailsComponent extends BaseDetailsComponent<AppSource> {
  override configService = inject(SourceConfigService);
}
