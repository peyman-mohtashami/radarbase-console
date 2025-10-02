import {Component, input, TemplateRef} from "@angular/core";
import {TranslatePipe} from "@ngx-translate/core";
import {DialogMode} from "../../enums/dialog";
import {DetailType} from "../../enums/detail-type";
import {ENTITY_NAME} from "../../enums/entities";
import {TableElement} from "../../models/table.model";
import {NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'rb-details',
  templateUrl: './details.component.html',
  imports: [
    TranslatePipe,
    NgTemplateOutlet,
  ]
})
export class DetailsComponent {
  protected readonly DetailType = DetailType;

  customTemplate = input<TemplateRef<any>>();
  tableFields = input<TableElement[]>([]);
  name = input.required<ENTITY_NAME>();
  entity = input.required<any>();
  mode = input<DialogMode>();
  type = input<DetailType>();
}
