import {Component, input} from '@angular/core';
import { AppProject } from "../../models/project";
import {ProjectStatusComponent} from "../project-status/project-status.component";
import {ProjectSourceTypesComponent} from "../project-source-types/project-source-types.component";
import {LocalDateComponent} from "../../../../../core/locale/components/local-date/local-date.component";
import {PROPERTIES} from "../../config";
import {ENTITY_NAME} from "../../../../enums/entities";
import {DialogMode} from "../../../../enums/dialog";
import {DetailType} from "../../../../enums/detail-type";
import {DetailsComponent} from "../../../../components/details/details.component";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'rb-project-details',
  templateUrl: './project-details.component.html',
  imports: [
    ProjectStatusComponent,
    ProjectSourceTypesComponent,
    LocalDateComponent,
    DetailsComponent,
    JsonPipe,
  ]
})
export class ProjectDetailsComponent {
  protected readonly DetailType = DetailType;
  protected readonly PROPERTIES = PROPERTIES;
  protected readonly ENTITY_NAME = ENTITY_NAME;

  entity = input.required<AppProject>();
  config = input<Record<string, boolean>>({})
  mode = input<DialogMode>();
  type = input<DetailType>();

}
