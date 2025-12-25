import {Component, inject} from "@angular/core";
import {AppUser} from "../../models/user";
import {RouterLink} from "@angular/router";
import {UserDetailsComponent} from "../user-details/user-details.component";
import {UserActivatedComponent} from "../user-activated/user-activated.component";
import {UserRolesComponent} from "../user-roles/user-roles.component";
import {UserConfigService} from "../../services/user-config.service";
import {BaseEntityTableRowComponent} from '../../../../base-entities/components/entity-table-row/base-entity-table-row.component';
import {EntityTableRowComponent} from '../../../../base-entities/components/entity-table-row/entity-table-row.component';
import {UserActionsComponent} from '../user-actions/user-actions.component';
import {UserActivateComponent} from '../user-activate/user-activate.component';

@Component({
  selector: 'app-user-table-row',
  templateUrl: './user-table-row.component.html',
  imports: [
    RouterLink,
    UserDetailsComponent,
    UserActivatedComponent,
    UserRolesComponent,
    EntityTableRowComponent,
    UserActionsComponent,
    UserActivateComponent,
  ]
})
export class UserTableRowComponent extends BaseEntityTableRowComponent<AppUser> {
  override configService = inject(UserConfigService);
}
