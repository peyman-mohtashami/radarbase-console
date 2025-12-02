import {Component, input} from "@angular/core";
import {AppRole} from '../../models/user';
import {TagComponent} from '../../../../../shared/components/tag/tag.component';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  imports: [
    TagComponent,
  ]
})
export class UserRolesComponent {
  roles = input<AppRole>();
}
