import {Component, inject} from '@angular/core';
import { AppUser } from "../../models/user";
import {UserActivatedComponent} from "../user-activated/user-activated.component";
import {UserRolesComponent} from "../user-roles/user-roles.component";
import {UserCreatedByComponent} from "../user-createdby/user-created-by.component";
import {LocalDateComponent} from "../../../../../core/locale/components/local-date/local-date.component";
import {DetailsComponent} from "../../../../components/details/details.component";
import {UserConfigService} from "../../services/user-config.service";
import {BaseDetailsComponent} from '../../../../components/details/base-details.component';
import {UserActivateComponent} from '../user-activate/user-activate.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  imports: [
    UserActivatedComponent,
    UserRolesComponent,
    UserCreatedByComponent,
    LocalDateComponent,
    DetailsComponent,
    UserActivateComponent,
  ]
})
export class UserDetailsComponent extends BaseDetailsComponent<AppUser>{
  override configService = inject(UserConfigService);
}
