import {Component, inject} from '@angular/core';

import { AppSource } from "../../models/source";
import {SourceAssignedComponent} from "../source-assigned/source-assigned.component";
import {KeyValuePipe} from "@angular/common";
import {SourceSourceTypeComponent} from "../source-source-type/source-source-type.component";
import {EntityDetailsComponent} from "../../../../base-entities/components/entity-details/entity-details.component";
import {SourceConfigService} from "../../services/source-config.service";
import {BaseEntityDetailsComponent} from '../../../../base-entities/components/entity-details/base-entity-details.component';

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
export class SourceDetailsComponent extends BaseEntityDetailsComponent<AppSource> {
  override configService = inject(SourceConfigService);
}
