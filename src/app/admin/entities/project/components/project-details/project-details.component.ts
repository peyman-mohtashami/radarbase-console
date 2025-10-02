import {Component, input} from '@angular/core';
import { AppProject } from "../../models/project";
import {ProjectStatusComponent} from "../project-status/project-status.component";
import {ProjectSourceTypesComponent} from "../project-source-types/project-source-types.component";
import {LocalDateComponent} from "../../../../../core/locale/components/local-date/local-date.component";
import {ENTITY_NAME} from "../../../../enums/entities";
import {DialogMode} from "../../../../enums/dialog";
import {DetailType} from "../../../../enums/detail-type";
import {DetailsComponent} from "../../../../components/details/details.component";
import {JsonPipe} from "@angular/common";
import {TableElement} from '../../../../models/table.model';

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
  protected readonly ENTITY_NAME = ENTITY_NAME;

  entity$ = input.required<AppProject>();
  mode$ = input<DialogMode>();
  type$ = input<DetailType>();
  tableFields$ = input.required<TableElement[]>();
}
