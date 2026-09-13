import {Component, inject, input, signal} from "@angular/core";
import {MatTooltip} from "@angular/material/tooltip";
import {EntityTableRowComponent} from '../../../../shared/components/entity-table-row/entity-table-row.component';
import {MatIcon} from '@angular/material/icon';
import {ConfigActionsComponent} from '../config-actions/config-actions.component';
import {APP_ROLES} from '../../../../../core/auth/models/auth.model';
import {DetailType} from '../../../../shared/models/table.model';
import {ConfigConfigService} from '../../services/config-config.service';
import {AppConfig} from '../../models/config';

@Component({
  selector: 'app-config-table-row',
  templateUrl: './config-table-row.component.html',
  imports: [
    MatTooltip,
    EntityTableRowComponent,
    MatIcon,
    ConfigActionsComponent,
  ]
})
export class ConfigTableRowComponent {
  protected readonly ROLES = APP_ROLES;
  protected readonly DetailType = DetailType;

  configService = inject(ConfigConfigService);

  entity = input.required<AppConfig>();
  extensionClass = input<string>();
  gridView = input<boolean>(false);

  updated = signal(false);
}
