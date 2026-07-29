import {Component, input, ChangeDetectionStrategy} from "@angular/core";
import {AppRole} from '../../models/user';
import {TagComponent} from '../../../../../shared/components/tag/tag.component';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    TagComponent,
    TranslatePipe,
  ]
})
export class UserRolesComponent {
  roles = input<AppRole>();
}
