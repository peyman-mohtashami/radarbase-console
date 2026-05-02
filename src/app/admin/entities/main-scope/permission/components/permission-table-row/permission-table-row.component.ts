import {Component, computed, inject, input} from "@angular/core";
import {PermissionRolesComponent} from '../permission-roles/permission-roles.component';
import {UserActivatedComponent} from '../../../user/components/user-activated/user-activated.component';
import {PermissionDetailsComponent} from '../permission-details/permission-details.component';
import {AppUser} from "../../../user/models/user";
import {PermissionConfigService} from "../../services/permission-config.service";
import {
  BaseEntityTableRowComponent
} from '../../../../../base-entities/components/entity-table-row/base-entity-table-row.component';
import {
  EntityTableRowComponent
} from '../../../../../base-entities/components/entity-table-row/entity-table-row.component';
import {PermissionActionsComponent} from '../permission-actions/permission-actions.component';
import {UserActivateComponent} from '../../../user/components/user-activate/user-activate.component';
import {ManagementPortalUser} from '../../../../../../core/auth/models/auth.model';

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
export class PermissionTableRowComponent extends BaseEntityTableRowComponent<AppUser> {
  override configService = inject(PermissionConfigService);

  user = input.required<ManagementPortalUser | null>();
  organizationName = input<string>();
  projectName = input<string>();

  isDisabled = computed(() => {
    if (this.user()?.id === this.entity().id) {
      return true;
    }

    if (this.projectName() && this.organizationName()) {
      return !!(this.entity()._roles._sysAdmin || (this.entity()._roles._organizationAdmin && this.entity()._roles._organizations?.find(o => o._name === this.organizationName())));
    } else if (!this.projectName() && this.organizationName()) {
      return !!this.entity()._roles._sysAdmin;
    }

    return false;
  });
}
