import {Component, inject, ChangeDetectionStrategy} from '@angular/core';
import { AppProject } from "../../models/project";
import {ProjectStatusComponent} from "../project-status/project-status.component";
import {ProjectSourceTypesComponent} from "../project-source-types/project-source-types.component";
import {LocalDateComponent} from "../../../../../../core/locale/components/local-date/local-date.component";
import {EntityDetailsComponent} from "../../../../../base-entities/components/entity-details/entity-details.component";
import {KeyValuePipe} from "@angular/common";
import {ProjectConfigService} from "../../services/project-config.service";
import {BaseEntityDetailsComponent} from '../../../../../base-entities/components/entity-details/base-entity-details.component';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    ProjectStatusComponent,
    ProjectSourceTypesComponent,
    LocalDateComponent,
    EntityDetailsComponent,
    KeyValuePipe,
  ]
})
export class ProjectDetailsComponent extends BaseEntityDetailsComponent<AppProject>{
  override configService = inject(ProjectConfigService);
}
