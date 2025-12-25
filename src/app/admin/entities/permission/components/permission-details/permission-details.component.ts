import {Component, inject, input} from '@angular/core';
import {LocalDateComponent} from "../../../../../core/locale/components/local-date/local-date.component";
import {EntityDetailsComponent} from "../../../../base-entities/components/entity-details/entity-details.component";
import {UserActivatedComponent} from '../../../user/components/user-activated/user-activated.component';
import {UserCreatedByComponent} from '../../../user/components/user-createdby/user-created-by.component';
import {PermissionRolesComponent} from '../permission-roles/permission-roles.component';
import {PermissionConfigService} from "../../services/permission-config.service";
import {AppUser} from "../../../user/models/user";
import {BaseEntityDetailsComponent} from '../../../../base-entities/components/entity-details/base-entity-details.component';
import {UserActivateComponent} from '../../../user/components/user-activate/user-activate.component';

@Component({
  selector: 'app-permission-details',
  templateUrl: './permission-details.component.html',
  imports: [
    UserActivatedComponent,
    UserCreatedByComponent,
    LocalDateComponent,
    EntityDetailsComponent,
    UserActivatedComponent,
    UserCreatedByComponent,
    PermissionRolesComponent,
    UserActivateComponent,
  ]
})
export class PermissionDetailsComponent extends BaseEntityDetailsComponent<AppUser>{
  override configService = inject(PermissionConfigService);

  organizationName = input<string>();
  projectName = input<string>();
}
