import {Component, inject, input} from "@angular/core";
import {PermissionRolesComponent} from '../permission-roles/permission-roles.component';
import {UserActivatedComponent} from '../../../user/components/user-activated/user-activated.component';
import {PermissionDetailsComponent} from '../permission-details/permission-details.component';
import {AppUser} from "../../../user/models/user";
import {PermissionConfigService} from "../../services/permission-config.service";
import {BaseEntityComponent} from '../../../../components/entity/base-entity.component';
import {EntityComponent} from '../../../../components/entity/entity.component';
import {PermissionActionsComponent} from '../permission-actions/permission-actions.component';
import {UserActivateComponent} from '../../../user/components/user-activate/user-activate.component';

@Component({
  selector: 'app-permission-table-row',
  templateUrl: './permission-table-row.component.html',
  imports: [
    UserActivatedComponent,
    PermissionRolesComponent,
    PermissionDetailsComponent,
    EntityComponent,
    PermissionActionsComponent,
    UserActivateComponent,
  ]
})
export class PermissionTableRowComponent extends BaseEntityComponent<AppUser>{
  override configService = inject(PermissionConfigService);

  organizationName = input<string>();
  projectName = input<string>();
}
