import {Component, DestroyRef, inject, signal, ChangeDetectionStrategy} from '@angular/core';
import {ActivatedRoute, NavigationEnd, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

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
import {filter, startWith} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-organization-page',
  templateUrl: './organization-page.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
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
    MatButton,
    MatIcon,
  ]
})
export class OrganizationPageComponent extends BaseEntityPageComponent<AppOrganization, RadarOrganization> {
  override configService = inject(OrganizationConfigService);
  override dialogService = inject(OrganizationDialogService);
  private destroyRef = inject(DestroyRef);

  override entity = signal<AppOrganization>(this.activatedRoute.snapshot.data['organization']);

  links: TabLink[] = [];

  projectId: string | null = null;

  override ngOnInit() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      startWith(null),
      map(() => {
        let route: ActivatedRoute = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      switchMap((route) => route.paramMap),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((paramMap) => {
      console.log('Child route params:', paramMap);
      this.projectId = paramMap.get('projectId');
    });

    this.links = [
      {path: 'projects', label: `ADMIN.${ENTITY_REGISTRY.project.name}.title.plural`},
      {
        path: 'users',
        label: `ADMIN.${ENTITY_REGISTRY.user.name}.title.plural`,
        permissions: [{role: ROLES.SYS_ADMIN}, {role: ROLES.ORGANIZATION_ADMIN, entityName: this.entity().name}]
      },
      {path: 'details', label: `ADMIN.${ENTITY_REGISTRY.organization.name}.details`},
    ];

    super.ngOnInit();
  }
}
