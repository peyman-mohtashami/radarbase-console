import {Component, input} from "@angular/core";
import {RadarProject} from '../../../project/models/project';
import {TagComponent} from '../../../../../shared/components/tag/tag.component';

@Component({
  selector: 'rb-source-project',
  templateUrl: './source-project.component.html',
  imports: [
    TagComponent
  ]
})
export class SourceProjectComponent {
  project$ = input<RadarProject>();
}
