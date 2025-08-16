import {Component, input} from '@angular/core';
import { AppSourceData } from "../../models/source-data";
import { TableElements} from "../../config";
import {SourceDataSourceTypeComponent} from "../source-data-source-type/source-data-source-type.component";
import {
  SourceDataProcessingStateComponent
} from "../source-data-processing-state/source-data-processing-state.component";
import {DialogMode} from "../../../../enums/dialog";
import {DetailType} from "../../../../enums/detail-type";
import {ENTITY_NAME} from "../../../../enums/entities";
import {DetailsComponent} from "../../../../components/details/details.component";

@Component({
  selector: 'rb-source-data-details',
  templateUrl: './source-data-details.component.html',
  imports: [
    SourceDataSourceTypeComponent,
    SourceDataProcessingStateComponent,
    DetailsComponent,
  ]
})
export class SourceDataDetailsComponent {
  protected readonly DetailType = DetailType;
  protected readonly TableElements = TableElements;
  protected readonly ENTITY_NAME = ENTITY_NAME;

  entity = input.required<AppSourceData>();
  config = input<Record<string, boolean>>({})
  mode = input<DialogMode>();
  type = input<DetailType>();
}
