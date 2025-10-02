import {Component, input} from "@angular/core";
import {DetailType} from "../../../../enums/detail-type";
import {TagComponent} from "../../../../components/tag/tag.component";

@Component({
  selector: 'rb-client-tags',
  templateUrl: './client-tags.component.html',
  imports: [
    TagComponent,
  ]
})
export class ClientTagsComponent {
  colorClass = input<string>('')
  tags = input<string[]>();
  type = input<DetailType>();
}
