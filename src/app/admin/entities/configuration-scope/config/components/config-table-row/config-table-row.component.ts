import {Component, inject, ChangeDetectionStrategy} from "@angular/core";
import {AppConfig} from '../../models/config';
import {MatTooltip} from "@angular/material/tooltip";
import {ConfigConfigService} from "../../services/config-config.service";
import {BaseEntityTableRowComponent} from '../../../../../base-entities/components/entity-table-row/base-entity-table-row.component';
import {EntityTableRowComponent} from '../../../../../base-entities/components/entity-table-row/entity-table-row.component';
import {MatIcon} from '@angular/material/icon';
import {ConfigActionsComponent} from '../config-actions/config-actions.component';

@Component({
  selector: 'app-config-table-row',
  templateUrl: './config-table-row.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatTooltip,
    EntityTableRowComponent,
    MatIcon,
    ConfigActionsComponent,
  ]
})
export class ConfigTableRowComponent extends BaseEntityTableRowComponent<AppConfig> {
  override configService = inject(ConfigConfigService);
}
