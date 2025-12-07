import {Component, inject, input} from '@angular/core';
import { AppOrganization } from "../../models/organization";
import {OrganizationProjectsComponent} from "../organization-projects/organization-projects.component";
import {DetailsComponent} from "../../../../components/details/details.component";
import {DetailType} from "../../../../enums/detail-type";
import {DialogMode} from "../../../../enums/dialog";
import {OrganizationConfigService} from "../../services/organization-config.service";
import {BaseDetailsComponent} from '../../../../components/details/base-details.component';

@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  imports: [
    OrganizationProjectsComponent,
    DetailsComponent,
  ]
})
export class OrganizationDetailsComponent extends BaseDetailsComponent<AppOrganization>{
  // protected readonly DetailType = DetailType;

  override configService = inject(OrganizationConfigService);

  // entity = input.required<AppOrganization>();
  // dialogMode = input<DialogMode>();
  // detailType = input<DetailType>();
}
