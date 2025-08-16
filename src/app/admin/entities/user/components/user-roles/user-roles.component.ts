import {Component, input} from "@angular/core";
import {TagComponent} from "../../../../components/tag/tag.component";

@Component({
  selector: 'rb-user-roles',
  templateUrl: './user-roles.component.html',
  imports: [
    TagComponent
  ]
})
export class UserRolesComponent {
  roles = input<any>()
}
