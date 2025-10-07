import {Component, input} from "@angular/core";
import {DetailType} from '../../enums/detail-type';
import {TableElement} from '../../models/table.model';

@Component({
  selector: 'rb-detail-element',
  templateUrl: './detail-element.component.html',
})
export class DetailElementComponent {
  protected readonly DetailType = DetailType;

  element$ = input<TableElement>();
  type$ = input<DetailType>(DetailType.TABLE);
}
