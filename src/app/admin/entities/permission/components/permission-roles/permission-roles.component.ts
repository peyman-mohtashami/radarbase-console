import {ChangeDetectionStrategy, Component, input} from "@angular/core";
import {TagComponent} from '../../../../../shared/components/tag/tag.component';
import {AppRole, AppUser} from "../../../user/models/user";

@Component({
  selector: 'app-permission-roles',
  templateUrl: './permission-roles.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TagComponent,
  ]
})
export class PermissionRolesComponent {
  roles = input<AppRole>();
  project = input<string>();
  organization = input<string>();
  entity = input<AppUser>();
}
