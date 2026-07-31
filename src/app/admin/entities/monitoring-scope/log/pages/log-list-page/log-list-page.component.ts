import {Component, inject, signal} from '@angular/core';
import {LoaderComponent} from '../../../../../../shared/components/loader/loader.component';
import {LogConfigService} from '../../services/log-config.service';
import {AppLog} from '../../models/log';
import {LogTableRowComponent} from '../../components/log-table-row/log-table-row.component';
import {
  DataTableFilterComponent, FilterEvent,
} from '../../../../../base-entities/containers/entity-list-page/data-table-filter/data-table-filter.component';
import {EntityListPageComponent} from '../../../../../base-entities/containers/entity-list-page/entity-list-page.component';
import {TranslatePipe} from '@ngx-translate/core';
import {getHighestPriorityClass} from '../../../../../shared/utils/table-extension.util';
import {PageEvent} from '@angular/material/paginator';
import {MIN_ENTITIES_FOR_FILTERS} from '../../../../../base-entities/consts/default-table-values';
import {TableElement} from '../../../../../base-entities/models/table.model';
import {SelectionModel} from '@angular/cdk/collections';
import {DialogMode} from '../../../../../base-entities/enums/dialog';
import {ROLES} from '../../../../../../shared/enums/roles';
import {LogStore} from '../../services/log.store';

@Component({
  selector: 'app-log-list-page',
  templateUrl: './log-list-page.component.html',
  imports: [
    DataTableFilterComponent,
    LoaderComponent,
    LogTableRowComponent,
    EntityListPageComponent,
    TranslatePipe,
  ]
})
export class LogListPageComponent {
  protected readonly DialogMode = DialogMode;
  protected readonly ROLES = ROLES;
  protected readonly MIN_ENTITIES_FOR_FILTERS = MIN_ENTITIES_FOR_FILTERS;

  readonly store = inject(LogStore);
  readonly configService = inject(LogConfigService);

  readonly entities = this.store.items;
  protected gridView = this.configService.getViewMode() === 'grid';

  readonly extensionClass = signal(getHighestPriorityClass(this.configService.getTableFields()));

  protected isFilterOpened = true;
  protected selection = new SelectionModel<AppLog>(true, []);

  handleFilterChange(event: FilterEvent) {
    this.store.setFilter(event);
  }

  switchPage(page: PageEvent) {
    this.store.setPage(page);
  }

  switchSort(element: TableElement) {
    this.store.toggleSort(element);
  }
}
