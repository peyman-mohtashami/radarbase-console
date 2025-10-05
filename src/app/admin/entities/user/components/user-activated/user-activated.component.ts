import {Component, input} from "@angular/core";
import {MatTooltip} from '@angular/material/tooltip';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'rb-user-activated',
  templateUrl: './user-activated.component.html',
  imports: [
    MatTooltip,
    TranslatePipe
  ]
})
export class UserActivatedComponent {
  activated$ = input<boolean>();
}
