import {Component, computed, inject, input, ChangeDetectionStrategy, signal} from "@angular/core";
import {PermissionRolesComponent} from '../permission-roles/permission-roles.component';
import {UserActivatedComponent} from '../../../user/components/user-activated/user-activated.component';
import {PermissionDetailsComponent} from '../permission-details/permission-details.component';
import {AppUser} from "../../../user/models/user";
import {PermissionConfigService} from "../../services/permission-config.service";
// import {
//   BaseEntityTableRowComponent
// } from '../../../../base-entities/components/entity-table-row/base-entity-table-row.component';
import {
  EntityTableRowComponent
} from '../../../../shared/components/entity-table-row/entity-table-row.component';
import {PermissionActionsComponent} from '../permission-actions/permission-actions.component';
import {UserActivateComponent} from '../../../user/components/user-activate/user-activate.component';
import {ManagementPortalUser} from '../../../../../core/auth/models/auth.model';
import {UserConfigService} from '../../../user/services/user-config.service';
import {ROLES} from '../../../../../shared/enums/roles';
import {DetailType} from '../../../../shared/enums/detail-type';

@Component({
  selector: 'app-permission-table-row',
  templateUrl: './permission-table-row.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
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
  protected readonly ROLES = ROLES;
  protected readonly DetailType = DetailType;

  configService = inject(PermissionConfigService);

  entity = input.required<AppUser>();
  extensionClass = input<string>();
  gridView = input<boolean>(false);

  updated = signal(false);

  organizationName = input<string>();
  projectName = input<string>();

  user = input.required<ManagementPortalUser | null>();

  isDisabled = computed(() => {
    if (this.user()?.id === this.entity().id) {
      return true;
    }

    if (this.projectName() && this.organizationName()) {
      return !!(this.entity()._roles._sysAdmin || (this.entity()._roles._organizationAdmin && this.entity()._roles._organizations?.find(o => o.name === this.organizationName())));
    } else if (!this.projectName() && this.organizationName()) {
      return !!this.entity()._roles._sysAdmin;
    }

    return false;
  });
  // selection = input.required<SelectionModel<AppUser>>();
}
