import { Component, Input } from "@angular/core";
import { DetailType } from "../../../enums/detail-type";

@Component({
    selector: 'rb-detail-wrapper',
    templateUrl: './detail-wrapper.component.html',
})
export class DetailWrapperComponent {
  protected readonly DetailType = DetailType;

  @Input()
  type: DetailType | undefined = DetailType.TABLE;
}
