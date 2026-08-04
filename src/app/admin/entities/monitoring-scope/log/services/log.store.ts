import {computed, ErrorHandler, inject, Injectable, signal} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {Params} from '@angular/router';
import {execute, filterItems, paginateItems, sortItems} from '../../../../shared/utils/store-helpers';
import {LogService} from './log.service';
import {LogConfigService} from './log-config.service';
import {AppLog, LogDto} from '../models/log';
import {PageEvent} from '@angular/material/paginator';
import {RbSort, TableElement} from '../../../../shared/models/table.model';
import {
  FilterEvent
} from '../../../../shared/components/data-table-filter/data-table-filter.component';
import {AppSourceType} from '../../../source-type/models/source-type';

@Injectable({providedIn: 'root'})
export class LogStore {
  private api = inject(LogService);
  private configService = inject(LogConfigService);
  private errorHandler = inject(ErrorHandler);

  readonly allItems = signal<AppLog[]>([]);
  readonly selected = signal<AppLog | null>(null);
  readonly total = signal<number>(0);
  readonly loading = signal(false);
  readonly error = signal<Error | null>(null);

  readonly page = signal<PageEvent>({
    pageIndex: 0,
    pageSize: this.configService.getStoredPageSize(),
    length: 0,
  });
  readonly sort = signal<RbSort>({sortField: 'id', sortOrder: 'desc'});
  readonly filter = signal<FilterEvent>({});

  readonly items = computed<AppLog[]>(() => {
    const filtered = filterItems(this.allItems(), this.filter() as Record<string, string | undefined>);
    const sorted = sortItems(filtered, this.sort());
    const {pageIndex, pageSize} = this.page();
    return paginateItems(sorted, {pageIndex, pageSize});
  });

  setPage(page: PageEvent) {
    this.configService.setStoredPageSize(page.pageSize);
    this.page.set(page);
  }

  toggleSort({name, sortable}: TableElement) {
    if (!sortable) return;
    this.sort.update(({sortOrder}) => ({
      sortField: name,
      sortOrder: sortOrder === 'asc' ? 'desc' : 'asc',
    }));
  }

  setFilter(filter: FilterEvent) {
    this.filter.set(filter);
  }

  applyQueryParams(queryParams: Params = {}) {
    this.page.set({
      pageIndex: +(queryParams['pageIndex'] ?? 0),
      pageSize: +(queryParams['pageSize'] ?? this.configService.getStoredPageSize()),
      length: 0,
    });
    this.sort.set({
      sortField: queryParams['sortField'] ?? 'id',
      sortOrder: queryParams['sortOrder'] ?? 'desc',
    });
    this.filter.set(this.buildFilter(queryParams));
  }

  private buildFilter(queryParams: Params): FilterEvent {
    return this.configService.getTableFilters().reduce<FilterEvent>((filter, {name}) => {
      filter[name] = queryParams[name];
      return filter;
    }, {});
  }

  async getAll(): Promise<boolean> {
    this.loading.set(true);
    try {
      const dtos = await firstValueFrom(this.api.getWithQuery());
      this.allItems.set(dtos.map(dto => this.toAppModel(dto)));
      this.total.set(dtos.length);
      return true;
    } catch (e) {
      this.errorHandler.handleError(e);
      return false;
    } finally {
      this.loading.set(false);
    }
  }

  toAppModel(entity: LogDto): AppLog {
    return {
      ...entity,
      search: `${entity.name}`,
    };
  }
}
