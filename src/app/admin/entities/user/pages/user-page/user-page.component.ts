import {Component, inject, signal, ChangeDetectionStrategy} from '@angular/core';
import {AppUser, UserDto} from "../../models/user";
import {TranslatePipe} from "@ngx-translate/core";
import {UserConfigService} from '../../services/user-config.service';
import {UserDialogService} from '../../services/user-dialog.service';
import {MatPrefix} from '@angular/material/input';
import {BaseEntityPageComponent} from '../../../../base-entities/containers/entity-page/base-entity-page.component';
import {UserActionsComponent} from '../../components/user-actions/user-actions.component';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {TabLink} from '../../../../base-entities/models/tab-link';
import {ENTITY_REGISTRY} from '../../../../../shared/consts/entity-registry';
import {MatTabLink, MatTabNav, MatTabNavPanel} from '@angular/material/tabs';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {PermissionDirective} from '../../../../../core/auth/directives/show-if-has-role.directive';
import {ProjectActionsComponent} from '../../../project/components/project-actions/project-actions.component';
import {ProjectStore} from '../../../project/services/project.store';
import {OrganizationStore} from '../../../organization/services/organization.store';
import {ROLES} from '../../../../../shared/enums/roles';
import {UserStore} from '../../services/user.store';
import {SubjectConfigService} from '../../../project-subject/services/subject-config.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    TranslatePipe,
    MatPrefix,
    MatPrefix,
    UserActionsComponent,
    RouterLink,
    MatTabLink,
    MatTabNav,
    MatTabNavPanel,
    RouterLinkActive,
    RouterOutlet,
    MatButton,
    MatIcon,
    PermissionDirective,
    ProjectActionsComponent,
  ]
})
export class UserPageComponent {
  protected readonly ROLES = ROLES;
  protected readonly ENTITY_REGISTRY = ENTITY_REGISTRY;

  protected store = inject(UserStore);
  protected projectStore = inject(ProjectStore);
  protected organizationStore = inject(OrganizationStore);
  configService = inject(SubjectConfigService);

  links: TabLink[] = [
    { path: 'details', label: `ADMIN.${ENTITY_REGISTRY.user.name}.details` },
  ];
}
