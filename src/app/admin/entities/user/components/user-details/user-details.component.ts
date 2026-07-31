import {Component, inject, input} from '@angular/core';
import { AppUser } from "../../models/user";
import {UserActivatedComponent} from "../user-activated/user-activated.component";
import {UserRolesComponent} from "../user-roles/user-roles.component";
import {UserCreatedByComponent} from "../user-createdby/user-created-by.component";
import {LocalDateComponent} from "../../../../../core/locale/components/local-date/local-date.component";
import {EntityDetailsComponent} from "../../../../base-entities/components/entity-details/entity-details.component";
import {UserConfigService} from "../../services/user-config.service";
import {UserActivateComponent} from '../user-activate/user-activate.component';
import {DetailType} from '../../../../base-entities/enums/detail-type';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  imports: [
    UserActivatedComponent,
    UserRolesComponent,
    UserCreatedByComponent,
    LocalDateComponent,
    EntityDetailsComponent,
    UserActivateComponent,
  ]
})
export class UserDetailsComponent {
  configService = inject(UserConfigService);

  entity = input.required<AppUser | undefined>();
  detailType = input<DetailType>();
}
