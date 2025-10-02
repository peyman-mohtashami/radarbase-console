import {Component, input} from "@angular/core";
import {TagComponent} from "../../../../components/tag/tag.component";
import {AppRole} from '../../models/user';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'rb-permission-roles',
  templateUrl: './permission-roles.component.html',
  imports: [
    TagComponent,
    JsonPipe,
  ]
})
export class PermissionRolesComponent {
  roles$ = input<AppRole>();
  project$ = input<string>();
  organization$ = input<string>();
}
