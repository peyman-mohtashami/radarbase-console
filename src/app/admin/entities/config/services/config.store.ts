import {computed, ErrorHandler, inject, Injectable, signal} from '@angular/core';
import {firstValueFrom} from "rxjs";

import {AppConfig, ConfigDto, CreateConfigDto, UpdateConfigDto} from "../models/config";
import {Params} from '@angular/router';
import {ConfigService} from './config.service';
import {ConfigConfigService} from './config-config.service';
import {PageEvent} from '@angular/material/paginator';
import {RbSort, TableElement} from '../../../shared/models/table.model';
import {
  FilterEvent
} from '../../../shared/components/data-table-filter/data-table-filter.component';
import {filterItems, paginateItems, sortItems} from '../../../shared/utils/store-helpers';
import {ClientStore} from '../../client/services/client.store';
import {ProjectStore} from '../../project/services/project.store';
import {SubjectStore} from '../../project-subject/services/subject.store';

export type ChangeType = 'added' | 'updated' | 'deleted';

export interface ConfigDifference {
  change: ChangeType;
  oldValue?: AppConfig;
  newValue?: AppConfig;
}

@Injectable({ providedIn: 'root' })
export class ConfigStore {
  private api = inject(ConfigService);
  private configService = inject(ConfigConfigService);
  private errorHandler = inject(ErrorHandler);

  private clientStore = inject(ClientStore);
  private projectStore = inject(ProjectStore);
  private subjectStore = inject(SubjectStore);

  readonly allItems = signal<AppConfig[]>([]);
  readonly selected = signal<AppConfig | null>(null);
  readonly total = signal<number>(0);
  readonly loading = signal(false);
  readonly error = signal<Error | null>(null);
  readonly oldItems = signal<AppConfig[]>([]);

  readonly page = signal<PageEvent>({
    pageIndex: 0,
    pageSize: this.configService.getStoredPageSize(),
    length: 0,
  });
  readonly sort = signal<RbSort>({sortField: 'id', sortOrder: 'desc'});
  readonly filter = signal<FilterEvent>({});

  readonly items = computed<AppConfig[]>(() => {
    const filtered = filterItems(this.allItems(), this.filter() as Record<string, string | undefined>);
    const sorted = sortItems(filtered, this.sort());
    const {pageIndex, pageSize} = this.page();
    return paginateItems(sorted, {pageIndex, pageSize});
  });

  readonly differences = computed<ConfigDifference[]>(() => {
    const current = this.allItems();
    const old = this.oldItems();

    const currentMap = new Map(current.map(item => [item.name, item]));
    const oldMap = new Map(old.map(item => [item.name, item]));

    const result: ConfigDifference[] = [];

    // Added & Updated
    for (const [name, newItem] of currentMap) {
      const oldItem = oldMap.get(name);

      if (!oldItem) {
        result.push({
          change: 'added',
          newValue: newItem,
        });
        continue;
      }

      if (!isEqual(oldItem, newItem)) {
        result.push({
          change: 'updated',
          oldValue: oldItem,
          newValue: newItem,
        });
      }
    }

    // Deleted
    for (const [name, oldItem] of oldMap) {
      if (!currentMap.has(name)) {
        result.push({
          change: 'deleted',
          oldValue: oldItem,
        });
      }
    }

    return result;
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
    const client = this.clientStore.selected();
    if (!client) return false;

    const project = this.projectStore.selected() ?? undefined;
    const subject = this.subjectStore.selected() ?? undefined;

    this.loading.set(true);
    try {
      const dtos = await firstValueFrom(this.api.getWithQuery(client.clientId, project?.projectName, subject?.login));
      this.allItems.set(dtos.map(dto => this.toAppModel(dto)));
      this.oldItems.set([...this.allItems()]);
      this.total.set(dtos.length);
      return true;
    } catch (e) {
      this.errorHandler.handleError(e);
      return false;
    } finally {
      this.loading.set(false);
    }
  }

  async add(entity: CreateConfigDto): Promise<boolean> {
    this.allItems.update((value) => ([...value, this.toAppModel(entity)]));
    return true;
  }

  async update(entity: UpdateConfigDto): Promise<boolean> {
    this.allItems.update((items) =>
      ([...items.map(item =>
        item.name === entity.name
          ? this.toAppModel(entity)
          : item
      )])
    );
    return true;
  }

  async delete(entity: AppConfig): Promise<boolean> {
    this.allItems.update((items) =>
      [...items.filter(item => item.name !== entity.name)]
    );
    return true;
  }

  toAppModel(entity: ConfigDto): AppConfig {
    return {
      ...entity,
      search: entity.name
    };
  }


  async publish(): Promise<boolean>{
    const client = this.clientStore.selected();
    if (!client) return false;

    const project = this.projectStore.selected() ?? undefined;
    const subject = this.subjectStore.selected() ?? undefined;

    this.loading.set(true);
    this.error.set(null);
    try {
      await firstValueFrom(this.api.publish(this.allItems(), client.clientId, project?.projectName, subject?.login));
      await this.getAll();
      return true;
    } catch
      (e) {
      this.error.set(e as Error);
      return false;
    } finally {
      this.loading.set(false);
    }
  }

  discard(): void{
    this.allItems.set([...this.oldItems()]);
  }
}

function isEqual(a: AppConfig, b: AppConfig): boolean {
  return (
    a.name === b.name &&
    a.value === b.value &&
    a.default === b.default &&
    a.scope === b.scope &&
    a.search === b.search
  );
}
