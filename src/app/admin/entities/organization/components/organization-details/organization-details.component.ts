import {Component, inject} from '@angular/core';
import { AppOrganization } from "../../models/organization";
import {OrganizationProjectsComponent} from "../organization-projects/organization-projects.component";
import {EntityDetailsComponent} from "../../../../base-entities/components/entity-details/entity-details.component";
import {OrganizationConfigService} from "../../services/organization-config.service";
import {BaseEntityDetailsComponent} from '../../../../base-entities/components/entity-details/base-entity-details.component';

@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  imports: [
    OrganizationProjectsComponent,
    EntityDetailsComponent,
  ]
})
export class OrganizationDetailsComponent extends BaseEntityDetailsComponent<AppOrganization>{
  override configService = inject(OrganizationConfigService);
}
