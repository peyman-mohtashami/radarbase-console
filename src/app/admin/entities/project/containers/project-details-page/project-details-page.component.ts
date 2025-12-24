import {Component, inject,} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {ProjectDetailsComponent} from "../../components/project-details/project-details.component";
import {ProjectConfigService} from '../../services/project-config.service';
import {SelectedEntitiesService} from '../../../../services/selected-entities.service';

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
  private configService = inject(ProjectConfigService);
  private selectedEntitiesService = inject(SelectedEntitiesService);

  entity = this.selectedEntitiesService.selectedProject()!;
  tableFields = this.configService.getTableFields();
}
