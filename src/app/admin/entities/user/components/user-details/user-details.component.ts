import {Component, input} from '@angular/core';
import { AppUser } from "../../models/user";
import {UserActivatedComponent} from "../user-activated/user-activated.component";
import {UserRolesComponent} from "../user-roles/user-roles.component";
import {UserCreatedByComponent} from "../user-createdby/user-created-by.component";
import {LocalDateComponent} from "../../../../../core/locale/components/local-date/local-date.component";
import {DialogMode} from "../../../../enums/dialog";
import {DetailType} from "../../../../enums/detail-type";
import {ENTITY_NAME} from "../../../../enums/entities";
import {DetailsComponent} from "../../../../components/details/details.component";
import {TableElement} from '../../../../models/table.model';
import {ActivateComponent} from '../activate/activate.component';

@Component({
  selector: 'rb-user-details',
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
  protected readonly ENTITY_NAME = ENTITY_NAME;

  entity$ = input.required<AppUser>();
  mode$ = input<DialogMode>();
  type$ = input<DetailType>();
  tableFields$ = input.required<TableElement[]>();
}
