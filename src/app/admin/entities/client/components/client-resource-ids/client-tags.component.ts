import {Component, input} from "@angular/core";
import {TagComponent} from '../../../../../shared/components/tag/tag.component';

@Component({
  selector: 'app-client-tags',
  templateUrl: './client-tags.component.html',
  imports: [
    TagComponent,
  ]
})
export class ClientTagsComponent {
  colorClass = input<string>('')
  tags = input<string[] | null>();
}
