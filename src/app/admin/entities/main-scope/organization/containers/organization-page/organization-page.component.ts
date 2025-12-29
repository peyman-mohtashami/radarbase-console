import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

import {AppOrganization, RadarOrganization} from "../../models/organization";
import {PermissionDirective} from "../../../../../../core/auth/directives/show-if-has-role.directive";
import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {OrganizationConfigService} from '../../services/organization-config.service';
import {OrganizationDialogService} from '../../services/organization-dialog.service';
import {OrganizationActionsComponent} from '../../components/organization-actions/organization-actions.component';
import {TranslatePipe} from '@ngx-translate/core';
import {MatPrefix} from '@angular/material/input';
import {ROLES} from "../../../../../../shared/enums/roles";
import {ENTITY_REGISTRY} from "../../../../../../shared/consts/entity-registry";
import {TabLink} from "../../../../../base-entities/models/tab-link";
import {BaseEntityPageComponent} from '../../../../../base-entities/containers/entity-page/base-entity-page.component';

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
    MatPrefix,
    TranslatePipe,
    RouterLinkActive,
  ]
})
export class OrganizationPageComponent extends BaseEntityPageComponent<AppOrganization, RadarOrganization> implements OnInit, OnDestroy {
  override configService = inject(OrganizationConfigService);
  override dialogService = inject(OrganizationDialogService);

  override entity = signal<AppOrganization>(this.activatedRoute.snapshot.data['organization']);

  links: TabLink[] = [];

  hasProject = this.selectedEntitiesService.selectedProject;

  ngOnInit() {
      this.links = [
      {path: 'projects', label: `ADMIN.${ENTITY_REGISTRY.project.name}.title.plural`},
      {
        path: 'users',
        label: `ADMIN.${ENTITY_REGISTRY.user.name}.title.plural`,
        permissions: [{role: ROLES.SYS_ADMIN}, {role: ROLES.ORGANIZATION_ADMIN, entityName: this.entity().name}]
      },
      {path: 'details', label: `ADMIN.${ENTITY_REGISTRY.organization.name}.details`},
    ];

    super.init();
  }

  ngOnDestroy() {
    super.destroy();
  }
}
