import {Component, input} from "@angular/core";
import {TagComponent} from "../../../../components/tag/tag.component";
import {AppRole} from '../../models/user';

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
