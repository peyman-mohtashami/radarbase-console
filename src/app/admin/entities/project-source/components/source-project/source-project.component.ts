import {Component, input} from "@angular/core";
import {ProjectDto} from '../../../project/models/project';
import {TagComponent} from '../../../../../shared/components/tag/tag.component';

@Component({
  selector: 'app-source-project',
  templateUrl: './source-project.component.html',
  imports: [
    TagComponent
  ]
})
export class SourceProjectComponent {
  project = input<ProjectDto>();
}
