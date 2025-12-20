import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {NavigationEnd, RouterLink, RouterOutlet} from '@angular/router';

import {AppOrganization} from "../../models/organization";
import {PermissionDirective} from "../../../../../core/auth/directives/show-if-has-role.directive";
import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {takeUntil} from 'rxjs/operators';
import {filter} from 'rxjs';
import {OrganizationConfigService} from '../../services/organization-config.service';
import {OrganizationDialogService} from '../../services/organization-dialog.service';
import {OrganizationActionsComponent} from '../../components/organization-actions/organization-actions.component';
import {TranslatePipe} from '@ngx-translate/core';
import {MatPrefix} from '@angular/material/input';
import {ROLES} from "../../../../../shared/enums/roles";
import {ENTITY_REGISTRY} from "../../../../../shared/consts/entity-registry";
import {TabLink} from "../../../../models/tab-link";
import {BaseEntityPageComponent} from '../../../../components/entity-page/base-entity-page.component';

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
  ]
})
export class OrganizationPageComponent extends BaseEntityPageComponent<AppOrganization> implements OnInit, OnDestroy {
  override configService = inject(OrganizationConfigService);
  override dialogService = inject(OrganizationDialogService);

  protected readonly ROLES = ROLES;
  protected readonly ENTITY_REGISTRY = ENTITY_REGISTRY;

  override entity = signal<AppOrganization>(this.activatedRoute.snapshot.data['organization']);
  // organizationFullList: AppOrganization[] = this.activatedRoute.snapshot.data['organizationFullList'];

  links: TabLink[] = [
    {path: 'projects', label: `ADMIN.${ENTITY_REGISTRY.project.name}.title.plural`},
    {
      path: 'users',
      label: `ADMIN.${ENTITY_REGISTRY.user.name}.title.plural`,
      permissions: [{role: ROLES.SYS_ADMIN}, {role: ROLES.ORGANIZATION_ADMIN, entityName: this.entity().name}]
    },
    {path: 'details', label: `ADMIN.${ENTITY_REGISTRY.organization.name}.details`},
  ];

  activePath?: string;

  hasChildren = !!this.activatedRoute.firstChild?.firstChild?.snapshot?.params?.['id'];

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this._destroy$)
    ).subscribe(() => {
      this.hasChildren = !!this.activatedRoute.firstChild?.firstChild?.snapshot.params['id'];
    });
    this.activePath = this.activatedRoute.firstChild?.snapshot?.url?.[0]?.path;

    super.init();
  }

  ngOnDestroy() {
    super.destroy();
  }

  override navigateOnUpdateSuccess(entity: AppOrganization) {
    const lastSegment = this.activatedRoute.firstChild?.snapshot.url[this.activatedRoute.firstChild?.snapshot.url.length - 1].path;
    this.router.navigate(['/admin', 'organizations', entity.name, lastSegment], {fragment: undefined}).then();
  }

  override getDialogData(entity?: AppOrganization) {
    return {
      entity: entity,
      // organizations: this.organizationFullList,
    }
  }
}
