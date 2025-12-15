import {Component, input} from "@angular/core";
import {RadarSourceType} from '../../../source-type/models/source-type';
import {TagComponent} from '../../../../../shared/components/tag/tag.component';

@Component({
  selector: 'app-source-data-source-type',
  templateUrl: './source-data-source-type.component.html',
  imports: [
    TagComponent,
  ]
})
export class SourceDataSourceTypeComponent {
  sourceType = input<RadarSourceType | null>();
}
