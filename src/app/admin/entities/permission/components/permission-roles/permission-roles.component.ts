import {ChangeDetectionStrategy, Component, input} from "@angular/core";
import {TagComponent} from '../../../../../shared/components/tag/tag.component';
import {AppRole, AppUser} from "../../../user/models/user";
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-permission-roles',
  templateUrl: './permission-roles.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TagComponent,
    TranslatePipe,
  ]
})
export class PermissionRolesComponent {
  roles = input<AppRole>();
  project = input<string>();
  organization = input<string>();
  entity = input<AppUser>();
}
