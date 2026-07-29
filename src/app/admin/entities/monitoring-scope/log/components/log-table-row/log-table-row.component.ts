import {Component, inject, ChangeDetectionStrategy, input, signal} from "@angular/core";
import {AppLog} from "../../models/log";
import {TranslatePipe} from "@ngx-translate/core";
import {TagComponent} from '../../../../../../shared/components/tag/tag.component';
import {LogConfigService} from "../../services/log-config.service";
import {BaseEntityTableRowComponent} from '../../../../../base-entities/components/entity-table-row/base-entity-table-row.component';
import {EntityTableRowComponent} from '../../../../../base-entities/components/entity-table-row/entity-table-row.component';
import {OrganizationConfigService} from '../../../../organization/services/organization-config.service';
import {AppOrganization} from '../../../../organization/models/organization';
import {ROLES} from '../../../../../../shared/enums/roles';
import {DetailType} from '../../../../../base-entities/enums/detail-type';

@Component({
  selector: 'app-log-table-row',
  templateUrl: './log-table-row.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
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
