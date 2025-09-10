import {Component, input} from "@angular/core";
import {TagComponent} from "../../../../components/tag/tag.component";
import {RadarSourceType} from '../../../source-type/models/source-type';

@Component({
  selector: 'rb-source-data-source-type',
  templateUrl: './source-data-source-type.component.html',
  imports: [
    TagComponent,
  ]
})
export class SourceDataSourceTypeComponent {
  sourceType = input<RadarSourceType>();
}
