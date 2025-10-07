import {Component, input} from "@angular/core";
import {ProjectStatus} from '../../models/project';
import {TagComponent} from '../../../../../shared/components/tag/tag.component';

@Component({
  selector: 'rb-project-status',
  templateUrl: './project-status.component.html',
  imports: [
    TagComponent
  ]
})
export class ProjectStatusComponent {
  protected readonly ProjectStatus = ProjectStatus;

  projectStatus$ = input<ProjectStatus>();
}
