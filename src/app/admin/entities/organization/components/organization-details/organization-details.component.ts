import {Component, input} from '@angular/core';
import { AppOrganization } from "../../models/organization";
import {OrganizationProjectsComponent} from "../organization-projects/organization-projects.component";
import {DetailsComponent} from "../../../../components/details/details.component";
import {DetailType} from "../../../../enums/detail-type";
import {TableElements} from "../../config";
import {ENTITY_NAME} from "../../../../enums/entities";
import {DialogMode} from "../../../../enums/dialog";

@Component({
  selector: 'rb-organization-details',
  templateUrl: './organization-details.component.html',
  imports: [
    OrganizationProjectsComponent,
    DetailsComponent,
  ]
})
export class OrganizationDetailsComponent {
  protected readonly DetailType = DetailType;
  protected readonly PROPERTIES = TableElements;
  protected readonly ENTITY_NAME = ENTITY_NAME;

  entity = input.required<AppOrganization>();
  config = input<Record<string, boolean>>({})
  mode = input<DialogMode>();
  type = input<DetailType>();
}
