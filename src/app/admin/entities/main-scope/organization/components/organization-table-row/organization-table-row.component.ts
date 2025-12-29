import {Component, inject} from "@angular/core";
import {RouterLink} from "@angular/router";
import {MatCard, MatCardContent} from "@angular/material/card";

import {AppOrganization} from "../../models/organization";
import {OrganizationProjectsComponent} from "../organization-projects/organization-projects.component";
import {OrganizationDetailsComponent} from "../organization-details/organization-details.component";
import {OrganizationActionsComponent} from "../organization-actions/organization-actions.component";
import {PermissionDirective} from "../../../../../../core/auth/directives/show-if-has-role.directive";
import {OrganizationConfigService} from "../../services/organization-config.service";
import {BaseEntityTableRowComponent} from '../../../../../base-entities/components/entity-table-row/base-entity-table-row.component';
import {EntityTableRowComponent} from '../../../../../base-entities/components/entity-table-row/entity-table-row.component';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-organization-table-row',
  templateUrl: './organization-table-row.component.html',
  imports: [
    MatCard,
    RouterLink,
    OrganizationProjectsComponent,
    OrganizationDetailsComponent,
    MatCardContent,
    OrganizationActionsComponent,
    PermissionDirective,
    EntityTableRowComponent,
    MatIcon,
    TranslatePipe,
  ]
})
export class OrganizationTableRowComponent extends BaseEntityTableRowComponent<AppOrganization> {
  override configService = inject(OrganizationConfigService);
}
