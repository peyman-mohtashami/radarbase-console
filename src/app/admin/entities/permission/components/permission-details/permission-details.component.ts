import {Component, input} from '@angular/core';
import { AppUser } from "../../models/user";
import {LocalDateComponent} from "../../../../../core/locale/components/local-date/local-date.component";
import {DialogMode} from "../../../../enums/dialog";
import {DetailType} from "../../../../enums/detail-type";
import {ENTITY_NAME} from "../../../../enums/entities";
import {DetailsComponent} from "../../../../components/details/details.component";
import {TableElement} from '../../../../models/table.model';
import {UserActivatedComponent} from '../../../user/components/user-activated/user-activated.component';
import {ActivateComponent} from '../../../user/components/activate/activate.component';
import {UserCreatedByComponent} from '../../../user/components/user-createdby/user-created-by.component';
import {PermissionRolesComponent} from '../permission-roles/permission-roles.component';

@Component({
  selector: 'rb-permission-details',
  templateUrl: './permission-details.component.html',
  imports: [
    UserActivatedComponent,
    // UserRolesComponent,
    UserCreatedByComponent,
    LocalDateComponent,
    DetailsComponent,
    ActivateComponent,
    UserActivatedComponent,
    ActivateComponent,
    UserCreatedByComponent,
    PermissionRolesComponent,
  ]
})
export class PermissionDetailsComponent {
  protected readonly DetailType = DetailType;
  protected readonly ENTITY_NAME = ENTITY_NAME;

  entity$ = input.required<AppUser>();
  mode$ = input<DialogMode>();
  type$ = input<DetailType>();
  tableFields$ = input.required<TableElement[]>();

  organizationName$ = input<string>();
  projectName$ = input<string>();
}
