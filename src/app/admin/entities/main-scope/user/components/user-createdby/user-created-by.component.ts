import {Component, input, ChangeDetectionStrategy} from "@angular/core";
import {TagComponent} from '../../../../../../shared/components/tag/tag.component';

@Component({
  selector: 'app-user-created-by',
  templateUrl: './user-created-by.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    TagComponent
  ]
})
export class UserCreatedByComponent {
  createdBy = input<string | null>();
}
