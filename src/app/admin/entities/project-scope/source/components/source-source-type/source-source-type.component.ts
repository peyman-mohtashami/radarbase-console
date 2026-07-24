import {Component, input, ChangeDetectionStrategy} from "@angular/core";
import {RadarSourceType} from '../../../../main-scope/source-type/models/source-type';
import {TagComponent} from '../../../../../../shared/components/tag/tag.component';

@Component({
  selector: 'app-source-source-type',
  templateUrl: './source-source-type.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    TagComponent
  ]
})
export class SourceSourceTypeComponent {
  sourceType = input<RadarSourceType>()
}
