import {Component, inject, input} from "@angular/core";
import {PermissionRolesComponent} from '../permission-roles/permission-roles.component';
import {UserActivatedComponent} from '../../../user/components/user-activated/user-activated.component';
import {PermissionDetailsComponent} from '../permission-details/permission-details.component';
import {AppUser} from "../../../user/models/user";
import {PermissionConfigService} from "../../services/permission-config.service";
import {BaseEntityTableRowComponent} from '../../../../base-entities/components/entity-table-row/base-entity-table-row.component';
import {EntityTableRowComponent} from '../../../../base-entities/components/entity-table-row/entity-table-row.component';
import {PermissionActionsComponent} from '../permission-actions/permission-actions.component';
import {UserActivateComponent} from '../../../user/components/user-activate/user-activate.component';

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
export class PermissionTableRowComponent extends BaseEntityTableRowComponent<AppUser>{
  override configService = inject(PermissionConfigService);

  organizationName = input<string>();
  projectName = input<string>();
}
