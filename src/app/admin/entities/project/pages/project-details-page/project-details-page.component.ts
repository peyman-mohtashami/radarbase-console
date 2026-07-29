import {Component, inject} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {ProjectDetailsComponent} from "../../components/project-details/project-details.component";
import {ProjectStore} from '../../services/project.store';

@Component({
  selector: 'app-project-details-page',
  templateUrl: './project-details-page.component.html',
  imports: [
    MatCard,
    MatCardContent,
    ProjectDetailsComponent,
  ]
})
export class ProjectDetailsPageComponent {
  protected store = inject(ProjectStore);
}
