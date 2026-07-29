import {Component, inject, signal, ChangeDetectionStrategy} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

import {AppClient, ClientDto} from "../../models/client";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslatePipe} from "@ngx-translate/core";
import {MatPrefix} from "@angular/material/input";
import {ClientConfigService} from '../../services/client-config.service';
import {ClientDialogService} from '../../services/client-dialog.service';
import {MatTabLink, MatTabNav, MatTabNavPanel} from '@angular/material/tabs';
import {PermissionDirective} from '../../../../../core/auth/directives/show-if-has-role.directive';
import {TabLink} from "../../../../base-entities/models/tab-link";
import {ENTITY_REGISTRY} from "../../../../../shared/consts/entity-registry";
import {BaseEntityPageComponent} from '../../../../base-entities/containers/entity-page/base-entity-page.component';
import {ClientActionsComponent} from '../../components/client-actions/client-actions.component';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {
  SourceTypeActionsComponent
} from '../../../source-type/components/source-type-actions/source-type-actions.component';
import {OrganizationStore} from '../../../organization/services/organization.store';
import {ProjectStore} from '../../../project/services/project.store';
import {ClientStore} from '../../services/client.store';
import {ROLES} from '../../../../../shared/enums/roles';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    MatPrefix,
    MatTabLink,
    MatTabNav,
    MatTabNavPanel,
    RouterOutlet,
    RouterLink,
    PermissionDirective,
    ClientActionsComponent,
    RouterLinkActive,
    MatButton,
    MatIcon,
    SourceTypeActionsComponent,
  ]
})
export class ClientPageComponent {
  protected readonly ROLES = ROLES;
  protected readonly ENTITY_REGISTRY = ENTITY_REGISTRY;

  protected store = inject(ClientStore);
  // protected projectStore = inject(ProjectStore);

  // links: TabLink[] = [
  //   {path: 'projects', label: `ADMIN.${ENTITY_REGISTRY.project.name}.title.plural`},
  //   {
  //     path: 'users',
  //     label: `ADMIN.${ENTITY_REGISTRY.user.name}.title.plural`,
  //     permissions: [{role: ROLES.SYS_ADMIN}, {role: ROLES.ORGANIZATION_ADMIN, entityName: this.organizationStore.selected()!.name}]
  //   },
  //   {path: 'details', label: `ADMIN.${ENTITY_REGISTRY.organization.name}.details`},
  // ];

  // override configService = inject(ClientConfigService);
  // override dialogService = inject(ClientDialogService);

  // override entity = signal<AppClient>(this.activatedRoute.snapshot.data['client']);

  links: TabLink[] = [
    { path: 'configs', label: `ADMIN.${ENTITY_REGISTRY.config.name}.title.plural` },
    { path: 'details', label: `ADMIN.${ENTITY_REGISTRY.client.name}.details` },
  ];
}
