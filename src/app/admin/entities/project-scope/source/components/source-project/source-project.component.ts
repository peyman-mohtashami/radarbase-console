import {Component, input} from "@angular/core";
import {RadarProject} from '../../../../main-scope/project/models/project';
import {TagComponent} from '../../../../../../shared/components/tag/tag.component';

@Component({
  selector: 'app-source-project',
  templateUrl: './source-project.component.html',
  imports: [
    TagComponent
  ]
})
export class SourceProjectComponent {
  project = input<RadarProject>();
}
