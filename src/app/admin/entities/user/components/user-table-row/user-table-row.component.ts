import {Component, inject} from "@angular/core";
import {AppUser} from "../../models/user";
import {RouterLink} from "@angular/router";
import {UserDetailsComponent} from "../user-details/user-details.component";
import {UserActivatedComponent} from "../user-activated/user-activated.component";
import {ActivateComponent} from "../activate/activate.component";
import {UserRolesComponent} from "../user-roles/user-roles.component";
import {ActionsComponent} from '../actions/actions.component';
import {UserConfigService} from "../../services/user-config.service";
import {BaseEntityComponent} from '../../../../components/entity/base-entity.component';
import {EntityComponent} from '../../../../components/entity/entity.component';

@Component({
  selector: 'app-user-table-row',
  templateUrl: './user-table-row.component.html',
  imports: [
    RouterLink,
    UserDetailsComponent,
    UserActivatedComponent,
    ActivateComponent,
    UserRolesComponent,
    ActionsComponent,
    ActionsComponent,
    EntityComponent,
  ]
})
export class UserTableRowComponent extends BaseEntityComponent<AppUser> {
  override configService = inject(UserConfigService);
}
