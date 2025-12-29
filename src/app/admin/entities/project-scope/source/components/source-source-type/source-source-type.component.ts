import {Component, input} from "@angular/core";
import {RadarSourceType} from '../../../../main-scope/source-type/models/source-type';
import {TagComponent} from '../../../../../../shared/components/tag/tag.component';

@Component({
  selector: 'app-source-source-type',
  templateUrl: './source-source-type.component.html',
  imports: [
    TagComponent
  ]
})
export class SourceSourceTypeComponent {
  sourceType = input<RadarSourceType>()
}
