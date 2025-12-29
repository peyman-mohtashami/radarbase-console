import {Component, inject} from "@angular/core";
import {AppGroup} from "../../models/group";
import {BaseEntityTableRowComponent} from '../../../../../base-entities/components/entity-table-row/base-entity-table-row.component';
import {GroupConfigService} from '../../services/group-config.service';
import {EntityTableRowComponent} from '../../../../../base-entities/components/entity-table-row/entity-table-row.component';
import {GroupActionsComponent} from '../group-actions/group-actions.component';

@Component({
  selector: 'app-group-table-row',
  templateUrl: './group-table-row.component.html',
  imports: [
    EntityTableRowComponent,
    GroupActionsComponent,
  ]
})
export class GroupTableRowComponent extends BaseEntityTableRowComponent<AppGroup>{
  override configService = inject(GroupConfigService);
}
