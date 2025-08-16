import {Component, input} from "@angular/core";
import {TagComponent} from "../../../../components/tag/tag.component";

@Component({
  selector: 'rb-subject-group',
  templateUrl: './subject-group.component.html',
  imports: [
    TagComponent
  ]
})
export class SubjectGroupComponent {
  group = input<string>()
}
