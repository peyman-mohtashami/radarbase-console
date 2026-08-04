import {computed, ErrorHandler, inject, Injectable, signal} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {Params} from '@angular/router';
import {RevisionService} from './revision.service';
import {AppRevision, RevisionDto} from '../models/revision';
import {RevisionConfigService} from './revision-config.service';
import {PageEvent} from '@angular/material/paginator';
import {RbSort, TableElement} from '../../../shared/models/table.model';
import {
  FilterEvent
} from '../../../shared/components/data-table-filter/data-table-filter.component';

@Injectable({providedIn: 'root'})
export class RevisionStore {
  private api = inject(RevisionService);
  private configService = inject(RevisionConfigService);
  private errorHandler = inject(ErrorHandler);

  readonly items = signal<AppRevision[]>([]);
  readonly selected = signal<AppRevision | null>(null);
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

  readonly params = computed<Params>(() => ({
    page: this.page().pageIndex,
    size: this.page().pageSize,
    sort: `${this.sort().sortField},${this.sort().sortOrder}`,
    ...this.filter(),
  }));

  async setPage(page: PageEvent) {
    this.configService.setStoredPageSize(page.pageSize);
    this.page.set(page);
    await this.getWithQuery();
  }

  async toggleSort({name, sortable}: TableElement) {
    if (!sortable) return;
    this.sort.update(({sortOrder}) => ({
      sortField: name,
      sortOrder: sortOrder === 'asc' ? 'desc' : 'asc',
    }));
    await this.getWithQuery();
  }

  async setFilter(filter: FilterEvent) {
    this.filter.set(filter);
    await this.getWithQuery();
  }

  async getWithQuery(): Promise<boolean> {
    this.loading.set(true);
    try {
      const response = await firstValueFrom(this.api.getWithQuery(this.params()));
      const sourceData = (response.body ?? []).map((dto: RevisionDto) => this.toAppModel(dto));
      const total = response.headers.get('X-Total-Count');
      this.items.set([...sourceData]);
      this.total.set(total ? +total : 0);
      return true;
    } catch (e) {
      this.errorHandler.handleError(e);
      return false;
    } finally {
      this.loading.set(false);
    }
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

  toAppModel(entity: RevisionDto): AppRevision {
    return {
      ...entity,
      name: `${entity.id}`,
      search: `${entity.id}`,
    };
  }
}

