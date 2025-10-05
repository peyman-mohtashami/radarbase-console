import {Component, input} from "@angular/core";
import {TagComponent} from "../../../../components/tag/tag.component";
import {AppRole} from '../../models/user';

@Component({
  selector: 'rb-user-roles',
  templateUrl: './user-roles.component.html',
  imports: [
    TagComponent,
  ]
})
export class UserRolesComponent {
  roles$ = input<AppRole>();
}
