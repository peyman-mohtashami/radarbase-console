import {Component, input} from "@angular/core";
import {TagComponent} from "../../../../components/tag/tag.component";
import {AppRole} from '../../models/user';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'rb-user-roles',
  templateUrl: './user-roles.component.html',
  imports: [
    TagComponent,
    JsonPipe,
  ]
})
export class UserRolesComponent {
  roles$ = input<AppRole>();
}
