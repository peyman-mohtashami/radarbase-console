import {Component, input} from "@angular/core";
import {TagComponent} from "../../../../components/tag/tag.component";
import {RadarSourceType} from '../../../source-type/models/source-type';

@Component({
  selector: 'rb-source-source-type',
  templateUrl: './source-source-type.component.html',
  imports: [
    TagComponent
  ]
})
export class SourceSourceTypeComponent {
  sourceType$ = input<RadarSourceType>()
}
