import {Component, inject} from '@angular/core';
import { AppProject } from "../../models/project";
import {ProjectStatusComponent} from "../project-status/project-status.component";
import {ProjectSourceTypesComponent} from "../project-source-types/project-source-types.component";
import {LocalDateComponent} from "../../../../../core/locale/components/local-date/local-date.component";
import {DetailsComponent} from "../../../../components/details/details.component";
import {JsonPipe} from "@angular/common";
import {ProjectConfigService} from "../../services/project-config.service";
import {BaseDetailsComponent} from '../../../../components/details/base-details.component';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  imports: [
    ProjectStatusComponent,
    ProjectSourceTypesComponent,
    LocalDateComponent,
    DetailsComponent,
    JsonPipe,
  ]
})
export class ProjectDetailsComponent extends BaseDetailsComponent<AppProject>{
  override configService = inject(ProjectConfigService);
}
