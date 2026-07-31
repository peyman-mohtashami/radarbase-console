import {Component, inject, OnDestroy} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {UserActionsComponent} from '../../components/user-actions/user-actions.component';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {TabLink} from '../../../../base-entities/models/tab-link';
import {ENTITY_REGISTRY} from '../../../../../shared/consts/entity-registry';
import {MatTabLink, MatTabNav, MatTabNavPanel} from '@angular/material/tabs';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {ProjectStore} from '../../../project/services/project.store';
import {OrganizationStore} from '../../../organization/services/organization.store';
import {ROLES} from '../../../../../shared/enums/roles';
import {UserStore} from '../../services/user.store';
import {SubjectConfigService} from '../../../project-subject/services/subject-config.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  imports: [
    TranslatePipe,
    UserActionsComponent,
    RouterLink,
    MatTabLink,
    MatTabNav,
    MatTabNavPanel,
    RouterLinkActive,
    RouterOutlet,
    MatButton,
    MatIcon,
  ]
})
export class UserPageComponent implements OnDestroy {
  protected readonly ROLES = ROLES;
  protected readonly ENTITY_REGISTRY = ENTITY_REGISTRY;

  protected store = inject(UserStore);
  protected projectStore = inject(ProjectStore);
  protected organizationStore = inject(OrganizationStore);
  configService = inject(SubjectConfigService);

  links: TabLink[] = [
    { path: 'details', label: `ADMIN.${ENTITY_REGISTRY.user.name}.details` },
  ];

  ngOnDestroy() {
    this.store.selected.set(null);
  }
}
