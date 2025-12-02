import {Component, inject, input} from '@angular/core';
import { AppSourceData } from "../../models/source-data";
import {SourceDataSourceTypeComponent} from "../source-data-source-type/source-data-source-type.component";
import {
  SourceDataProcessingStateComponent
} from "../source-data-processing-state/source-data-processing-state.component";
import {DialogMode} from "../../../../enums/dialog";
import {DetailType} from "../../../../enums/detail-type";
import {DetailsComponent} from "../../../../components/details/details.component";
import {SourceDataConfigService} from "../../services/source-data-config.service";

@Component({
  selector: 'app-source-data-details',
  templateUrl: './source-data-details.component.html',
  imports: [
    SourceDataSourceTypeComponent,
    SourceDataProcessingStateComponent,
    DetailsComponent,
  ]
})
export class SourceDataDetailsComponent {
  protected readonly DetailType = DetailType;

  protected configService = inject(SourceDataConfigService);

  entity = input.required<AppSourceData>();
  dialogMode = input<DialogMode>();
  detailType = input<DetailType>();
}
