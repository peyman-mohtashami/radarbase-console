import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import {LogConfigService} from '../../services/log-config.service';
import {AppLog, RadarLog} from '../../models/log';
import {LogTableRowComponent} from '../../components/log-table-row/log-table-row.component';
import {EntitiesPageHeaderComponent} from '../../../../components/entities-page-header/entities-page-header.component';
import {
  DataTableFilterComponent,
} from '../../../../components/data-table-filter/data-table-filter.component';
import {BaseEntityListPageComponent} from '../../../../components/entity-list-page/base-entity-list-page.component';
import {EntitiesPageComponent} from '../../../../components/entity-list-page/entities-page.component';
import {LogService} from '../../services/log.service';

@Component({
  selector: 'app-log-list-page',
  templateUrl: './log-list-page.component.html',
  imports: [
    EntitiesPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    LogTableRowComponent,
    EntitiesPageComponent,
  ]
})
export class LogListPageComponent extends BaseEntityListPageComponent<AppLog, RadarLog> implements OnInit, OnDestroy {
  override configService = inject(LogConfigService);
  override entityService = inject(LogService);

  override entities = signal<AppLog[]>(this.activatedRoute.snapshot.data['logList']);

  ngOnInit() {
    super.init();
  }

  ngOnDestroy() {
    super.destroy();
  }
}
