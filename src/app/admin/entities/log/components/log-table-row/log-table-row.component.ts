import {Component, inject} from "@angular/core";
import {AppLog} from "../../models/log";
import {TranslatePipe} from "@ngx-translate/core";
import {TagComponent} from '../../../../../shared/components/tag/tag.component';
import {LogConfigService} from "../../services/log-config.service";
import {BaseEntityComponent} from '../../../../components/entity/base-entity.component';
import {EntityComponent} from '../../../../components/entity/entity.component';

@Component({
  selector: 'app-log-table-row',
  templateUrl: './log-table-row.component.html',
  imports: [
    TranslatePipe,
    TagComponent,
    EntityComponent,
  ]
})
export class LogTableRowComponent extends BaseEntityComponent<AppLog>{
  override configService = inject(LogConfigService);

  updateAction(log: AppLog, level: string) {
    //TODO
  }
}
