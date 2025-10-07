import {Component, input} from "@angular/core";
import {AppRole} from '../../models/user';
import {TagComponent} from '../../../../../shared/components/tag/tag.component';

@Component({
  selector: 'rb-permission-roles',
  templateUrl: './permission-roles.component.html',
  imports: [
    TagComponent,
  ]
})
export class PermissionRolesComponent {
  roles$ = input<AppRole>();
  project$ = input<string>();
  organization$ = input<string>();
}
