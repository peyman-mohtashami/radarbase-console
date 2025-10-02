import {Component, input} from "@angular/core";
import {TagComponent} from "../../../../components/tag/tag.component";
import {ProjectStatus} from '../../models/project';

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
