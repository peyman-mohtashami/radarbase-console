import {Component, input} from "@angular/core";

@Component({
  selector: 'rb-user-activated',
  templateUrl: './user-activated.component.html',
})
export class UserActivatedComponent {
  activated = input<boolean>();
}
