import {Component, inject, input} from "@angular/core";
import {ActionsComponent} from '../actions/actions.component';
import {PermissionRolesComponent} from '../permission-roles/permission-roles.component';
import {UserActivatedComponent} from '../../../user/components/user-activated/user-activated.component';
import {ActivateComponent} from '../../../user/components/activate/activate.component';
import {PermissionDetailsComponent} from '../permission-details/permission-details.component';
import {AppUser} from "../../../user/models/user";
import {PermissionConfigService} from "../../services/permission-config.service";
import {BaseEntityComponent} from '../../../../components/entity/base-entity.component';
import {EntityComponent} from '../../../../components/entity/entity.component';

@Component({
  selector: 'app-permission-table-row',
  templateUrl: './permission-table-row.component.html',
  imports: [
    UserActivatedComponent,
    ActionsComponent,
    PermissionRolesComponent,
    ActivateComponent,
    PermissionDetailsComponent,
    ActionsComponent,
    EntityComponent,
  ]
})
export class PermissionTableRowComponent extends BaseEntityComponent<AppUser>{
  override configService = inject(PermissionConfigService);

  organizationName = input<string>();
  projectName = input<string>();
}
