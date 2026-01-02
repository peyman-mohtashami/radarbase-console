import {Component, inject} from "@angular/core";
import {AppLog} from "../../models/log";
import {TranslatePipe} from "@ngx-translate/core";
import {TagComponent} from '../../../../../../shared/components/tag/tag.component';
import {LogConfigService} from "../../services/log-config.service";
import {BaseEntityTableRowComponent} from '../../../../../base-entities/components/entity-table-row/base-entity-table-row.component';
import {EntityTableRowComponent} from '../../../../../base-entities/components/entity-table-row/entity-table-row.component';

@Component({
  selector: 'app-log-table-row',
  templateUrl: './log-table-row.component.html',
  imports: [
    TranslatePipe,
    TagComponent,
    EntityTableRowComponent,
  ]
})
export class LogTableRowComponent extends BaseEntityTableRowComponent<AppLog>{
  override configService = inject(LogConfigService);

  // updateAction(log: AppLog, level: string) {
  //   //TODO
  // }
}
