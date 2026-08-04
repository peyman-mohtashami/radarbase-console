import {Component, inject, input, signal} from "@angular/core";
import {AppLog} from "../../models/log";
import {TranslatePipe} from "@ngx-translate/core";
import {TagComponent} from '../../../../../../shared/components/tag/tag.component';
import {LogConfigService} from "../../services/log-config.service";
import {EntityTableRowComponent} from '../../../../../shared/components/entity-table-row/entity-table-row.component';
import {ROLES} from '../../../../../../shared/enums/roles';
import {DetailType} from '../../../../../shared/enums/detail-type';

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
  protected readonly ROLES = ROLES;
  protected readonly DetailType = DetailType;

  configService = inject(LogConfigService);

  entity = input.required<AppLog>();
  extensionClass = input<string>();
  gridView = input<boolean>(false);

  updated = signal(false);
}
