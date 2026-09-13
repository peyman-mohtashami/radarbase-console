import {Component, input, TemplateRef} from "@angular/core";
import {TranslatePipe} from "@ngx-translate/core";
import {DetailType, TableElement} from "../../models/table.model";
import {NgTemplateOutlet} from "@angular/common";
import {EntityRegistry} from "../../../../shared/consts/entity-registry";
import {DialogMode} from '../../models/dialog.model';

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
