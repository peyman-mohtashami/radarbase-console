import {Component, input} from "@angular/core";
import {RadarSourceType} from '../../../source-type/models/source-type';
import {TagComponent} from '../../../../../shared/components/tag/tag.component';

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
