import {
  Component,
  inject, OnDestroy,
} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

import {PermissionDirective} from "../../../../../core/auth/directives/show-if-has-role.directive";
import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {OrganizationActionsComponent} from '../../components/organization-actions/organization-actions.component';
import {TranslatePipe} from '@ngx-translate/core';
import {ROLES} from "../../../../../shared/enums/roles";
import {ENTITY_REGISTRY} from "../../../../../shared/consts/entity-registry";
import {TabLink} from "../../../../base-entities/models/tab-link";
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {OrganizationStore} from '../../services/organization.store';
import {ProjectStore} from '../../../project/services/project.store';

@Component({
  selector: 'app-organization-page',
  templateUrl: './organization-page.component.html',
  imports: [
    PermissionDirective,
    MatTabNav,
    MatTabLink,
    RouterLink,
    MatTabNavPanel,
    RouterOutlet,
    OrganizationActionsComponent,
    TranslatePipe,
    RouterLinkActive,
    MatButton,
    MatIcon,
  ]
})
export class OrganizationPageComponent implements OnDestroy {
  protected readonly ROLES = ROLES;
  protected readonly ENTITY_REGISTRY = ENTITY_REGISTRY;

  protected store = inject(OrganizationStore);
  protected projectStore = inject(ProjectStore);

  links: TabLink[] = [
    {path: 'projects', label: `ADMIN.${ENTITY_REGISTRY.project.name}.title.plural`},
    {
      path: 'users',
      label: `ADMIN.${ENTITY_REGISTRY.user.name}.title.plural`,
      permissions: [{role: ROLES.SYS_ADMIN}, {role: ROLES.ORGANIZATION_ADMIN, entityName: this.store.selected()!.name}]
    },
    {path: 'details', label: `ADMIN.${ENTITY_REGISTRY.organization.name}.details`},
  ];

  ngOnDestroy() {
    this.store.selected.set(null);
  }
}
