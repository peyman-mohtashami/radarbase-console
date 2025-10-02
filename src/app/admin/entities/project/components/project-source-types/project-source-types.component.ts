import {Component, input} from "@angular/core";
import {TagComponent} from "../../../../components/tag/tag.component";
import {RadarSourceType} from '../../../source-type/models/source-type';

@Component({
  selector: 'rb-project-source-types',
  templateUrl: './project-source-types.component.html',
  imports: [
    TagComponent
  ]
})
export class ProjectSourceTypesComponent {
  sourceTypes$ = input<RadarSourceType[]>();

  showAll = false;

  toggleView($event: MouseEvent, showAll: boolean) {
    $event?.stopPropagation();
    this.showAll = !showAll
  }
}
