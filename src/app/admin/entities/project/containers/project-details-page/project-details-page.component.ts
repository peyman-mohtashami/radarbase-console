import {Component, inject,} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppProject } from "../../models/project";
import {LoaderComponent} from "../../../../../shared/components/loader/loader.component";
import {MatCard, MatCardContent} from "@angular/material/card";
import {ProjectDetailsComponent} from "../../components/project-details/project-details.component";
import {TranslatePipe} from "@ngx-translate/core";
import {AsyncPipe} from "@angular/common";
import {ProjectConfigService} from '../../services/project-config.service';

@Component({
  selector: 'rb-project-details-page',
  templateUrl: './project-details-page.component.html',
  imports: [
    LoaderComponent,
    MatCard,
    MatCardContent,
    ProjectDetailsComponent,
    TranslatePipe,
    AsyncPipe
  ]
})
export class ProjectDetailsPageComponent {
  private activatedRoute = inject(ActivatedRoute);
  private configService = inject(ProjectConfigService);

  loading = false;
  entity = this.activatedRoute.snapshot.parent?.data['entity'] as AppProject;
  tableFields = this.configService.getTableFields();
}
