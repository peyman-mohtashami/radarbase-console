import {Component, input} from "@angular/core";
import {AppProject, RadarProject} from '../../../project/models/project';
import {TranslatePipe} from '@ngx-translate/core';
import {TagComponent} from '../../../../../shared/components/tag/tag.component';


@Component({
  selector: 'rb-organization-projects',
  templateUrl: './organization-projects.component.html',
  imports: [
    TagComponent,
    TranslatePipe,
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
