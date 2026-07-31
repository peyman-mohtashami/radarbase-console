import {computed, ErrorHandler, inject, Injectable, signal} from '@angular/core';
import {firstValueFrom} from "rxjs";

import {AppConfig, ConfigDto, CreateConfigDto, UpdateConfigDto} from "../models/config";
import {Params} from '@angular/router';
import {RadarbaseAppConfigService} from '../../../../../core/configuration/services/radarbase-app-config.service';
import {ConfigService} from './config.service';
import {ConfigConfigService} from './config-config.service';
import {PageEvent} from '@angular/material/paginator';
import {RbSort, TableElement} from '../../../../base-entities/models/table.model';
import {
  FilterEvent
} from '../../../../base-entities/containers/entity-list-page/data-table-filter/data-table-filter.component';
import {filterItems, paginateItems, sortItems} from '../../../../shared/utils/store-helpers';
import {ClientStore} from '../../../client/services/client.store';
import {ProjectStore} from '../../../project/services/project.store';
import {SubjectStore} from '../../../project-subject/services/subject.store';

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
    // add item to items
    // refresh the page (sort, filter, pagination)
    return true;
  }

  async update(entity: UpdateConfigDto): Promise<boolean> {
    // replace the updated item
    // refresh the page (sort, filter, pagination)
    return true;
  }

  async delete(entity: AppConfig): Promise<boolean> {
    // remove item form items
    // refresh the page (sort, filter, pagination)
    return true;
  }

  toAppModel(entity: ConfigDto): AppConfig {
    return {
      ...entity,
      search: entity.name
    };
  }


  async publish(configs: AppConfig[]): Promise<boolean>{
    const client = this.clientStore.selected();
    if (!client) return false;

    const project = this.projectStore.selected() ?? undefined;
    const subject = this.subjectStore.selected() ?? undefined;

    this.loading.set(true);
    this.error.set(null);
    try {
      await firstValueFrom(this.api.publish(configs, client.clientId, project?.projectName, subject?.login));
      await this.getAll();
      // if (this.selected()
      // ) {
      //   this.selected.set(this.toAppModel(updatedEntity));
      // }
      return true;
    } catch
      (e) {
      this.error.set(e as Error);
      return false;
    } finally {
      this.loading.set(false);
    }
  }
}
