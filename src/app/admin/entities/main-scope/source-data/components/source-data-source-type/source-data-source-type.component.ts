import {Component, input, ChangeDetectionStrategy} from "@angular/core";
import {RadarSourceType} from '../../../source-type/models/source-type';
import {TagComponent} from '../../../../../../shared/components/tag/tag.component';

@Component({
  selector: 'app-source-data-source-type',
  templateUrl: './source-data-source-type.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    TagComponent,
  ]
})
export class SourceDataSourceTypeComponent {
  sourceType = input<RadarSourceType | null>();
}
