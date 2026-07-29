import {Component, inject, ChangeDetectionStrategy, input} from '@angular/core';
import { AppUser } from "../../models/user";
import {UserActivatedComponent} from "../user-activated/user-activated.component";
import {UserRolesComponent} from "../user-roles/user-roles.component";
import {UserCreatedByComponent} from "../user-createdby/user-created-by.component";
import {LocalDateComponent} from "../../../../../core/locale/components/local-date/local-date.component";
import {EntityDetailsComponent} from "../../../../base-entities/components/entity-details/entity-details.component";
import {UserConfigService} from "../../services/user-config.service";
import {BaseEntityDetailsComponent} from '../../../../base-entities/components/entity-details/base-entity-details.component';
import {UserActivateComponent} from '../user-activate/user-activate.component';
import {DetailType} from '../../../../base-entities/enums/detail-type';
import {UserDialogService} from '../../services/user-dialog.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
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
