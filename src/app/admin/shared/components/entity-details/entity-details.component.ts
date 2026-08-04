import {Component, input, TemplateRef} from "@angular/core";
import {TranslatePipe} from "@ngx-translate/core";
import {DialogMode} from "../../enums/dialog";
import {DetailType} from "../../enums/detail-type";
import {TableElement} from "../../models/table.model";
import {NgTemplateOutlet} from "@angular/common";
import {EntityRegistry} from "../../../../shared/consts/entity-registry";

@Component({
  selector: 'app-entity-details',
  templateUrl: './entity-details.component.html',
  imports: [
    TranslatePipe,
    NgTemplateOutlet,
  ]
})
export class EntityDetailsComponent {
  protected readonly DetailType = DetailType;

  customTemplate = input<TemplateRef<unknown>>();
  tableFields = input<TableElement[]>([]);
  entityMetadata = input.required<EntityRegistry>();
  dialogMode = input<DialogMode>();
  detailType = input<DetailType>();
}
