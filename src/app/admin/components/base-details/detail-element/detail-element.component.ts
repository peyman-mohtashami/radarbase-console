import { Component, Input } from "@angular/core";
import { DetailType } from "../../../enums/detail-type";
import {TableElement} from "../../../models/table.model";
import {NgClass} from "@angular/common";

@Component({
  selector: ' rb-detail-element',
  templateUrl: './detail-element.component.html',
  imports: [
    NgClass
  ]
})
export class DetailElementComponent {
  protected readonly DetailType = DetailType;

  @Input()
  element?: TableElement;

  @Input()
  type: DetailType | undefined = DetailType.TABLE;
}
