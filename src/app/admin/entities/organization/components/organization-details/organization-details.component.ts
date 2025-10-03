import {Component, input} from '@angular/core';
import { AppOrganization } from "../../models/organization";
import {OrganizationProjectsComponent} from "../organization-projects/organization-projects.component";
import {DetailsComponent} from "../../../../components/details/details.component";
import {DetailType} from "../../../../enums/detail-type";
import {ENTITY_NAME} from "../../../../enums/entities";
import {DialogMode} from "../../../../enums/dialog";
import {TableElement} from '../../../../models/table.model';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'rb-organization-details',
  templateUrl: './organization-details.component.html',
  imports: [
    OrganizationProjectsComponent,
    DetailsComponent,
    JsonPipe,
  ]
})
export class OrganizationDetailsComponent {
  protected readonly DetailType = DetailType;
  protected readonly ENTITY_NAME = ENTITY_NAME;

  entity$ = input.required<AppOrganization>();
  mode$ = input<DialogMode>();
  type$ = input<DetailType>();
  tableFields$ = input.required<TableElement[]>();
}
