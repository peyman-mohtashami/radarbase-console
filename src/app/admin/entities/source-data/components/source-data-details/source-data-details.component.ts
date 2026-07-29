import {Component, inject, ChangeDetectionStrategy, input} from '@angular/core';
import { AppSourceData } from "../../models/source-data";
import {SourceDataSourceTypeComponent} from "../source-data-source-type/source-data-source-type.component";
import {
  SourceDataProcessingStateComponent
} from "../source-data-processing-state/source-data-processing-state.component";
import {EntityDetailsComponent} from "../../../../base-entities/components/entity-details/entity-details.component";
import {SourceDataConfigService} from "../../services/source-data-config.service";
import {BaseEntityDetailsComponent} from '../../../../base-entities/components/entity-details/base-entity-details.component';
import {DetailType} from '../../../../base-entities/enums/detail-type';

@Component({
  selector: 'app-source-data-details',
  templateUrl: './source-data-details.component.html',
  imports: [
    SourceDataSourceTypeComponent,
    SourceDataProcessingStateComponent,
    EntityDetailsComponent,
  ]
})
export class SourceDataDetailsComponent {
  configService = inject(SourceDataConfigService);

  entity = input.required<AppSourceData | undefined>();
  detailType = input<DetailType>();
}
