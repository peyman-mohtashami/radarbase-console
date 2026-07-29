import {Component, input} from "@angular/core";
import {ProjectStatus} from '../../models/project';
import {TagComponent} from '../../../../../shared/components/tag/tag.component';

@Component({
  selector: 'app-project-status',
  templateUrl: './project-status.component.html',
  imports: [
    TagComponent
  ]
})
export class ProjectStatusComponent {
  projectStatus = input<ProjectStatus | null>();
}
