import {computed, ErrorHandler, inject, Injectable, signal} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {Params} from '@angular/router';
import {filterItems, paginateItems, sortItems} from '../../../shared/utils/store-helpers';
import {GroupService} from './group.service';
import {AppGroup, CreateGroupDto, GroupDto} from '../models/group';
import {GroupConfigService} from './group-config.service';
import {PageEvent} from '@angular/material/paginator';
import {RbSort, TableElement} from '../../../shared/models/table.model';
import {
  FilterEvent
} from '../../../shared/components/data-table-filter/data-table-filter.component';

@Injectable({providedIn: 'root'})
export class GroupStore {
  private api = inject(GroupService);
  private configService = inject(GroupConfigService);
  private errorHandler = inject(ErrorHandler);

  readonly allItems = signal<AppGroup[]>([]);
  readonly selected = signal<AppGroup | null>(null);
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

  readonly items = computed<AppGroup[]>(() => {
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

  async add(entity: CreateGroupDto): Promise<boolean> {
    this.loading.set(true);
    this.error.set(null);
    try {
      await firstValueFrom(this.api.add(entity));
      await this.getAll();
      return true;
    } catch (e) {
      this.error.set(e as Error);
      return false;
    } finally {
      this.loading.set(false);
    }
  }

  async delete(entity: AppGroup): Promise<boolean> {
    this.loading.set(true);
    this.error.set(null);
    try {
      await firstValueFrom(this.api.delete(entity));
      await this.getAll();
      this.selected.set(null);
      return true;
    } catch (e) {
      this.error.set(e as Error);
      return false;
    } finally {
      this.loading.set(false);
    }
  }

  toAppModel(entity: GroupDto): AppGroup {
    return {
      ...entity,
      search: `${entity.name}`,
    };
  }
}

