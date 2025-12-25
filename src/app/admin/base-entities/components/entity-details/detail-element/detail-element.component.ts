import {Component, input} from "@angular/core";
import {DetailType} from '../../../enums/detail-type';
import {TableElement} from '../../../models/table.model';

@Component({
  selector: 'app-detail-element',
  templateUrl: './detail-element.component.html',
})
export class DetailElementComponent {
  protected readonly DetailType = DetailType;

  tableElement = input<TableElement>();
  detailType = input<DetailType>(DetailType.TABLE);
}
