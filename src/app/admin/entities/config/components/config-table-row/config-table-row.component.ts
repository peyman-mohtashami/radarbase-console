import {Component, inject} from "@angular/core";
import {AppConfig} from '../../models/config';
import {MatTooltip} from "@angular/material/tooltip";
import {ConfigConfigService} from "../../services/config-config.service";
import {BaseEntityComponent} from '../../../../components/entity/base-entity.component';
import {EntityComponent} from '../../../../components/entity/entity.component';
import {MatIcon} from '@angular/material/icon';
import {ConfigActionsComponent} from '../config-actions/config-actions.component';

@Component({
  selector: 'app-config-table-row',
  templateUrl: './config-table-row.component.html',
  imports: [
    MatTooltip,
    EntityComponent,
    MatIcon,
    ConfigActionsComponent,
  ]
})
export class ConfigTableRowComponent extends BaseEntityComponent<AppConfig> {
  override configService = inject(ConfigConfigService);
}
