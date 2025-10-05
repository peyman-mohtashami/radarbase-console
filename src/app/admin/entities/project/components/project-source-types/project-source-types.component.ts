import {Component, input} from "@angular/core";
import {TagComponent} from "../../../../components/tag/tag.component";
import {RadarSourceType} from '../../../source-type/models/source-type';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'rb-project-source-types',
  templateUrl: './project-source-types.component.html',
  imports: [
    TagComponent,
    TranslatePipe
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
