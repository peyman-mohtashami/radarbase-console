import {Component, inject} from '@angular/core';
import { AppOrganization } from "../../models/organization";
import {OrganizationProjectsComponent} from "../organization-projects/organization-projects.component";
import {DetailsComponent} from "../../../../components/details/details.component";
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
  override configService = inject(OrganizationConfigService);
}
