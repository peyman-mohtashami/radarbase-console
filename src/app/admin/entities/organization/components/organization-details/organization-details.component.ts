import {Component, inject, input} from '@angular/core';
import {OrganizationProjectsComponent} from "../organization-projects/organization-projects.component";
import {EntityDetailsComponent} from "../../../../base-entities/components/entity-details/entity-details.component";
import {OrganizationConfigService} from "../../services/organization-config.service";
import {DetailType} from '../../../../base-entities/enums/detail-type';
import {AppOrganization} from '../../models/organization';

@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  imports: [
    OrganizationProjectsComponent,
    EntityDetailsComponent,
  ]
})
export class OrganizationDetailsComponent {

  configService = inject(OrganizationConfigService);

  entity = input.required<AppOrganization | undefined>();
  detailType = input<DetailType>();
}
