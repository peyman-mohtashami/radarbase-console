import {Component, inject, input, signal} from "@angular/core";
import {RouterLink} from "@angular/router";
import {MatCard, MatCardContent} from "@angular/material/card";

import {AppOrganization} from "../../models/organization";
import {OrganizationProjectsComponent} from "../organization-projects/organization-projects.component";
import {OrganizationDetailsComponent} from "../organization-details/organization-details.component";
import {OrganizationActionsComponent} from "../organization-actions/organization-actions.component";
import {PermissionDirective} from "../../../../../core/auth/directives/show-if-has-role.directive";
import {OrganizationConfigService} from "../../services/organization-config.service";
import {EntityTableRowComponent} from '../../../../base-entities/components/entity-table-row/entity-table-row.component';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';
import {ROLES} from '../../../../../shared/enums/roles';
import {DetailType} from '../../../../base-entities/enums/detail-type';

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
export class OrganizationTableRowComponent {
  protected readonly ROLES = ROLES;
  protected readonly DetailType = DetailType;

  configService = inject(OrganizationConfigService);

  entity = input.required<AppOrganization>();
  extensionClass = input<string>();
  gridView = input<boolean>(false);

  updated = signal(false);
}
