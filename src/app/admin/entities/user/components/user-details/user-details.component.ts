import {Component, inject, input} from '@angular/core';
import { AppUser } from "../../models/user";
import {UserActivatedComponent} from "../user-activated/user-activated.component";
import {UserRolesComponent} from "../user-roles/user-roles.component";
import {UserCreatedByComponent} from "../user-createdby/user-created-by.component";
import {LocalDateComponent} from "../../../../../core/locale/components/local-date/local-date.component";
import {DialogMode} from "../../../../enums/dialog";
import {DetailType} from "../../../../enums/detail-type";
import {DetailsComponent} from "../../../../components/details/details.component";
import {ActivateComponent} from '../activate/activate.component';
import {UserConfigService} from "../../services/user-config.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  imports: [
    UserActivatedComponent,
    UserRolesComponent,
    UserCreatedByComponent,
    LocalDateComponent,
    DetailsComponent,
    ActivateComponent,
  ]
})
export class UserDetailsComponent {
  protected readonly DetailType = DetailType;

  protected configService = inject(UserConfigService);

  entity = input.required<AppUser>();
  dialogMode = input<DialogMode>();
  detailType = input<DetailType>();
}
