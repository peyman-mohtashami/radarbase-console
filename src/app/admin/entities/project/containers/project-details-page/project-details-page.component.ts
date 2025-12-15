import {Component, inject,} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppProject } from "../../models/project";
import {MatCard, MatCardContent} from "@angular/material/card";
import {ProjectDetailsComponent} from "../../components/project-details/project-details.component";
import {ProjectConfigService} from '../../services/project-config.service';

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
  private activatedRoute = inject(ActivatedRoute);
  private configService = inject(ProjectConfigService);

  entity = this.activatedRoute.snapshot.parent?.data['entity'] as AppProject;
  tableFields = this.configService.getTableFields();
}
