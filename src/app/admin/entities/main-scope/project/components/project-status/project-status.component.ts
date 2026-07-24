import {Component, input, ChangeDetectionStrategy} from "@angular/core";
import {ProjectStatus} from '../../models/project';
import {TagComponent} from '../../../../../../shared/components/tag/tag.component';

@Component({
  selector: 'app-project-status',
  templateUrl: './project-status.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    TagComponent
  ]
})
export class ProjectStatusComponent {
  protected readonly ProjectStatus = ProjectStatus;

  projectStatus = input<ProjectStatus | null>();
}
