import {Component, input} from "@angular/core";
import {TagComponent} from "../../../../components/tag/tag.component";
import {RadarProject} from '../../../../../shared/models/radar-project.model';

@Component({
  selector: 'rb-source-project',
  templateUrl: './source-project.component.html',
  imports: [
    TagComponent
  ]
})
export class SourceProjectComponent {
  project = input<RadarProject>();
}
