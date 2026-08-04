import {Component, inject, input} from '@angular/core';
import { AppProject } from "../../models/project";
import {ProjectStatusComponent} from "../project-status/project-status.component";
import {ProjectSourceTypesComponent} from "../project-source-types/project-source-types.component";
import {LocalDateComponent} from "../../../../../core/locale/components/local-date/local-date.component";
import {EntityDetailsComponent} from "../../../../shared/components/entity-details/entity-details.component";
import {KeyValuePipe} from "@angular/common";
import {ProjectConfigService} from "../../services/project-config.service";
import {DetailType} from '../../../../shared/enums/detail-type';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  imports: [
    ProjectStatusComponent,
    ProjectSourceTypesComponent,
    LocalDateComponent,
    EntityDetailsComponent,
    KeyValuePipe,
  ]
})
export class ProjectDetailsComponent {
  configService = inject(ProjectConfigService);

  entity = input.required<AppProject | undefined>();
  detailType = input<DetailType>();
}
