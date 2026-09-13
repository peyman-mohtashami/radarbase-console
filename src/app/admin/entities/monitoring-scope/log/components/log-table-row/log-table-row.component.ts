import {Component, inject, input, signal} from "@angular/core";
import {AppLog} from "../../models/log";
import {TranslatePipe} from "@ngx-translate/core";
import {TagComponent} from '../../../../../../shared/components/tag/tag.component';
import {LogConfigService} from "../../services/log-config.service";
import {EntityTableRowComponent} from '../../../../../shared/components/entity-table-row/entity-table-row.component';
import {APP_ROLES} from '../../../../../../core/auth/models/auth.model';
import {DetailType} from '../../../../../shared/models/table.model';

@Component({
  selector: 'app-log-table-row',
  templateUrl: './log-table-row.component.html',
  imports: [
    TranslatePipe,
    TagComponent,
    EntityTableRowComponent,
  ]
})
export class LogTableRowComponent {
  protected readonly ROLES = APP_ROLES;
  protected readonly DetailType = DetailType;

  configService = inject(LogConfigService);

  entity = input.required<AppLog>();
  extensionClass = input<string>();
  gridView = input<boolean>(false);

  updated = signal(false);
}
