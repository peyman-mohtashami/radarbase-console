import {Component, input} from "@angular/core";
import {TagComponent} from "../../../../components/tag/tag.component";
import {RadarSourceType} from '../../../../../shared/models/radar-source-type.model';

@Component({
  selector: 'rb-source-source-type',
  templateUrl: './source-source-type.component.html',
  imports: [
    TagComponent
  ]
})
export class SourceSourceTypeComponent {
  sourceType = input<RadarSourceType>()
}
