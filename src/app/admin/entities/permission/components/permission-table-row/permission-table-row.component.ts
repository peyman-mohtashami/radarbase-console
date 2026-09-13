import {Component, computed, inject, input, signal} from "@angular/core";
import {PermissionRolesComponent} from '../permission-roles/permission-roles.component';
import {UserActivatedComponent} from '../../../user/components/user-activated/user-activated.component';
import {PermissionDetailsComponent} from '../permission-details/permission-details.component';
import {AppUser, UserDto} from "../../../user/models/user";
import {PermissionConfigService} from "../../services/permission-config.service";
import {
  EntityTableRowComponent
} from '../../../../shared/components/entity-table-row/entity-table-row.component';
import {PermissionActionsComponent} from '../permission-actions/permission-actions.component';
import {UserActivateComponent} from '../../../user/components/user-activate/user-activate.component';
import {APP_ROLES} from '../../../../../core/auth/models/auth.model';
import {DetailType} from '../../../../shared/models/table.model';

@Component({
  selector: 'app-permission-table-row',
  templateUrl: './permission-table-row.component.html',
  imports: [
    UserActivatedComponent,
    PermissionRolesComponent,
    PermissionDetailsComponent,
    EntityTableRowComponent,
    PermissionActionsComponent,
    UserActivateComponent,
  ]
})
export class PermissionTableRowComponent {
  protected readonly ROLES = APP_ROLES;
  protected readonly DetailType = DetailType;

  configService = inject(PermissionConfigService);

  entity = input.required<AppUser>();
  extensionClass = input<string>();
  gridView = input<boolean>(false);

  updated = signal(false);

  organizationName = input<string>();
  projectName = input<string>();

  user = input.required<UserDto | null>();

  isDisabled = computed(() => {
    if (this.user()?.id === this.entity().id) {
      return true;
    }

    if (this.projectName() && this.organizationName()) {
      return !!(this.entity().uiRoles._sysAdmin || (this.entity().uiRoles._organizationAdmin && this.entity().uiRoles._organizations?.find(o => o.name === this.organizationName())));
    } else if (!this.projectName() && this.organizationName()) {
      return !!this.entity().uiRoles._sysAdmin;
    }

    return false;
  });
}
