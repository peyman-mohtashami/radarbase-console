import {Component, input} from "@angular/core";
import {TagComponent} from '../../../../../shared/components/tag/tag.component';

@Component({
  selector: 'app-subject-group',
  templateUrl: './subject-group.component.html',
  imports: [
    TagComponent
  ]
})
export class SubjectGroupComponent {
  group = input<string>()
}
