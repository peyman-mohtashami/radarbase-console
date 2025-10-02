import {Component, input} from "@angular/core";
import {TagComponent} from "../../../../components/tag/tag.component";
import {AppProject, RadarProject} from '../../../project/models/project';


@Component({
  selector: 'rb-organization-projects',
  templateUrl: './organization-projects.component.html',
  imports: [
    TagComponent,
  ]
})
export class OrganizationProjectsComponent {
  projects = input<RadarProject[] | AppProject[]>()
  organization = input<string>()

  showAll = false;

  toggleView($event: MouseEvent, showAll: boolean) {
    $event?.stopPropagation();
    this.showAll = !showAll
  }
}
