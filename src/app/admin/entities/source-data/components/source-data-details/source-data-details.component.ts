import {Component, inject} from '@angular/core';
import { AppSourceData } from "../../models/source-data";
import {SourceDataSourceTypeComponent} from "../source-data-source-type/source-data-source-type.component";
import {
  SourceDataProcessingStateComponent
} from "../source-data-processing-state/source-data-processing-state.component";
import {DetailsComponent} from "../../../../components/details/details.component";
import {SourceDataConfigService} from "../../services/source-data-config.service";
import {BaseDetailsComponent} from '../../../../components/details/base-details.component';

@Component({
  selector: 'app-source-data-details',
  templateUrl: './source-data-details.component.html',
  imports: [
    SourceDataSourceTypeComponent,
    SourceDataProcessingStateComponent,
    DetailsComponent,
  ]
})
export class SourceDataDetailsComponent extends BaseDetailsComponent<AppSourceData>{
  override configService = inject(SourceDataConfigService);
}
