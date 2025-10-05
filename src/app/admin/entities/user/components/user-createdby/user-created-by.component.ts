import {Component, input} from "@angular/core";
import {TagComponent} from "../../../../components/tag/tag.component";

@Component({
  selector: 'rb-user-created-by',
  templateUrl: './user-created-by.component.html',
  imports: [
    TagComponent
  ]
})
export class UserCreatedByComponent {
  createdBy$ = input<string>();
}
