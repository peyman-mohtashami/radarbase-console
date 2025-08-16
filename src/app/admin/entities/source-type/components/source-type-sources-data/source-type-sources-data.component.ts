import {Component, input} from "@angular/core";
import {TagComponent} from "../../../../components/tag/tag.component";
import {RadarSourceData} from '../../../../../shared/models/radar-source-data.model';

@Component({
  selector: 'rb-source-type-sources-data',
  templateUrl: './source-type-sources-data.component.html',
  imports: [
    TagComponent,
  ]
})
export class SourceTypeSourcesDataComponent {
  sourcesData = input<RadarSourceData[]>()
}
