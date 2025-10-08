import {ChangeDetectionStrategy, Component, input} from "@angular/core";
import {AppRole, AppUser} from '../../models/user';
import {TagComponent} from '../../../../../shared/components/tag/tag.component';

@Component({
  selector: 'rb-permission-roles',
  templateUrl: './permission-roles.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TagComponent,
  ]
})
export class PermissionRolesComponent {
  roles$ = input<AppRole>();
  project$ = input<string>();
  organization$ = input<string>();
  entity$ = input<AppUser>();
}
