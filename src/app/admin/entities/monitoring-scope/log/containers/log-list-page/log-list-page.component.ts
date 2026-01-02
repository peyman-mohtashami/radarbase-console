import {Component, inject, signal} from '@angular/core';
import {LoaderComponent} from '../../../../../../shared/components/loader/loader.component';
import {LogConfigService} from '../../services/log-config.service';
import {AppLog, RadarLog} from '../../models/log';
import {LogTableRowComponent} from '../../components/log-table-row/log-table-row.component';
import {ListPageHeaderComponent} from '../../../../../base-entities/containers/entity-list-page/list-page-header/list-page-header.component';
import {
  DataTableFilterComponent,
} from '../../../../../base-entities/containers/entity-list-page/data-table-filter/data-table-filter.component';
import {BaseEntityListPageComponent} from '../../../../../base-entities/containers/entity-list-page/base-entity-list-page.component';
import {EntityListPageComponent} from '../../../../../base-entities/containers/entity-list-page/entity-list-page.component';
import {LogService} from '../../services/log.service';

@Component({
  selector: 'app-log-list-page',
  templateUrl: './log-list-page.component.html',
  imports: [
    ListPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    LogTableRowComponent,
    EntityListPageComponent,
  ]
})
export class LogListPageComponent extends BaseEntityListPageComponent<AppLog, RadarLog> {
  override configService = inject(LogConfigService);
  override entityService = inject(LogService);

  override entities = signal<AppLog[]>(this.activatedRoute.snapshot.data['logList']);
}
