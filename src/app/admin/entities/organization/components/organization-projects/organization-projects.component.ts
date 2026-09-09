import {Component, input} from "@angular/core";
import {ProjectDto} from '../../../project/models/project';
import {TranslatePipe} from '@ngx-translate/core';
import {TagComponent} from '../../../../../shared/components/tag/tag.component';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-organization-projects',
  templateUrl: './organization-projects.component.html',
  imports: [
    TagComponent,
    TranslatePipe,
    MatButton,
  ]
})
export class OrganizationProjectsComponent {
  projects = input.required<ProjectDto[]>();
  organization = input<string>()

  showAll = false;

  toggleView($event: MouseEvent, showAll: boolean) {
    $event?.stopPropagation();
    this.showAll = !showAll
  }
}
