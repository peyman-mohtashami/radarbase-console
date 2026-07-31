import {Component, inject, input, signal} from "@angular/core";
import {AppGroup} from "../../models/group";
import {GroupConfigService} from '../../services/group-config.service';
import {EntityTableRowComponent} from '../../../../base-entities/components/entity-table-row/entity-table-row.component';
import {GroupActionsComponent} from '../group-actions/group-actions.component';
import {ROLES} from '../../../../../shared/enums/roles';
import {DetailType} from '../../../../base-entities/enums/detail-type';

@Component({
  selector: 'app-group-table-row',
  templateUrl: './group-table-row.component.html',
  imports: [
    EntityTableRowComponent,
    GroupActionsComponent,
  ]
})
export class GroupTableRowComponent {
  protected readonly ROLES = ROLES;
  protected readonly DetailType = DetailType;

  configService = inject(GroupConfigService);

  entity = input.required<AppGroup>();
  extensionClass = input<string>();
  gridView = input<boolean>(false);

  updated = signal(false);
}
