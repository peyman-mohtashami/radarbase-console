import {Component, input} from "@angular/core";
import {MatTooltip} from '@angular/material/tooltip';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-user-activated',
  templateUrl: './user-activated.component.html',
  imports: [
    MatTooltip,
    TranslatePipe,
    MatIcon
  ]
})
export class UserActivatedComponent {
  activated = input<boolean | null>();
}
