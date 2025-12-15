import {Component, input} from "@angular/core";
import {RadarSourceData} from '../../../source-data/models/source-data';
import {TagComponent} from '../../../../../shared/components/tag/tag.component';

@Component({
  selector: 'app-source-type-sources-data',
  templateUrl: './source-type-sources-data.component.html',
  imports: [
    TagComponent,
  ]
})
export class SourceTypeSourcesDataComponent {
  sourcesData = input<RadarSourceData[] | null>()
}
