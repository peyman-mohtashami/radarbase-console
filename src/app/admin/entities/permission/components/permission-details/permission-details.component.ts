import {Component, inject, input} from '@angular/core';
import {LocalDateComponent} from "../../../../../core/locale/components/local-date/local-date.component";
import {DialogMode} from "../../../../enums/dialog";
import {DetailType} from "../../../../enums/detail-type";
import {DetailsComponent} from "../../../../components/details/details.component";
import {UserActivatedComponent} from '../../../user/components/user-activated/user-activated.component';
import {ActivateComponent} from '../../../user/components/activate/activate.component';
import {UserCreatedByComponent} from '../../../user/components/user-createdby/user-created-by.component';
import {PermissionRolesComponent} from '../permission-roles/permission-roles.component';
import {PermissionConfigService} from "../../services/permission-config.service";
import {AppUser} from "../../../user/models/user";
import {BaseDetailsComponent} from '../../../../components/details/base-details.component';

@Component({
  selector: 'app-permission-details',
  templateUrl: './permission-details.component.html',
  imports: [
    UserActivatedComponent,
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
export class PermissionDetailsComponent extends BaseDetailsComponent<AppUser>{
  // protected readonly DetailType = DetailType;

  override configService = inject(PermissionConfigService);

  // entity = input.required<AppUser>();
  // dialogMode = input<DialogMode>();
  // detailType = input<DetailType>();

  organizationName = input<string>();
  projectName = input<string>();
}
