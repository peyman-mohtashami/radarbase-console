import {Component, input} from "@angular/core";
import {AppProject, ProjectDto} from '../../../project/models/project';
import {TranslatePipe} from '@ngx-translate/core';
import {TagComponent} from '../../../../../shared/components/tag/tag.component';

@Component({
  selector: 'app-organization-projects',
  templateUrl: './organization-projects.component.html',
  imports: [
    TagComponent,
    TranslatePipe,
  ]
})
export class OrganizationProjectsComponent {
  projects = input<ProjectDto[] | AppProject[] | null>()
  organization = input<string>()

  showAll = false;

  toggleView($event: MouseEvent, showAll: boolean) {
    $event?.stopPropagation();
    this.showAll = !showAll
  }
}
