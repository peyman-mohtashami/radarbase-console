import {Component, inject} from "@angular/core";
import {AppGroup} from "../../models/group";
import {BaseEntityComponent} from '../../../../components/entity/base-entity.component';
import {GroupConfigService} from '../../services/group-config.service';
import {EntityComponent} from '../../../../components/entity/entity.component';
import {ActionsComponent} from '../actions/actions.component';

@Component({
  selector: 'app-group-table-row',
  templateUrl: './group-table-row.component.html',
  imports: [
    EntityComponent,
    ActionsComponent,
  ]
})
export class GroupTableRowComponent extends BaseEntityComponent<AppGroup>{
  override configService = inject(GroupConfigService);
}
