import {computed, ErrorHandler, inject, Injectable, signal} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {Params} from '@angular/router';
import {filterItems, paginateItems, sortItems} from '../../../shared/utils/store-helpers';
import {ClientService} from './client.service';
import {ClientConfigService} from './client-config.service';
import {AppClient, ClientDto, CreateClientDto, UpdateClientDto} from '../models/client';
import {PageEvent} from '@angular/material/paginator';
import {RbSort, TableElement} from '../../../shared/models/table.model';
import {
  FilterEvent
} from '../../../shared/components/data-table-filter/data-table-filter.component';
import {AppSubject} from '../../project-subject/models/subject';
import {HttpParams} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ClientStore {
  private api = inject(ClientService);
  private configService = inject(ClientConfigService);
  private errorHandler = inject(ErrorHandler);

  readonly allItems = signal<AppClient[]>([]);
  // readonly items = signal<AppClient[]>([]);
  readonly selected = signal<AppClient | null>(null);
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

  readonly items = computed<AppClient[]>(() => {
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

  async getByKey(key: string): Promise<boolean> {
    this.loading.set(true);
    try {
      const dto = await firstValueFrom(this.api.getByKey(key));
      this.selected.set(this.toAppModel(dto));
      return true;
    } catch (e) {
      this.errorHandler.handleError(e);
      return false;
    } finally {
      this.loading.set(false);
    }
  }

  async add(entity: CreateClientDto): Promise<boolean> {
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

  async update(entity: UpdateClientDto): Promise<boolean> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const updatedEntity = await firstValueFrom(this.api.update(entity));
      await this.getAll();
      if (this.selected()) {
        this.selected.set(this.toAppModel(updatedEntity));
      }
      return true;
    } catch (e) {
      this.error.set(e as Error);
      return false;
    } finally {
      this.loading.set(false);
    }
  }

  async delete(entity: AppClient): Promise<boolean> {
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

  async getClientPairInfo(client: AppClient, subject: AppSubject, persistent: boolean) {
    this.loading.set(true);
    this.error.set(null);

    let params = new HttpParams();

    if (subject.login) {
      params = params.append('clientId', client.clientId);
      params = params.append('login', subject.login);
      params = params.append('persistent', persistent.toString());
    }
    try {
      return await firstValueFrom(this.api.getClientPairInfo(params));
    } catch (e) {
      this.error.set(e as Error);
      return undefined;
    } finally {
      this.loading.set(false);
    }
  }

  async deletePairInfoToken(tokenName: string) {
    this.loading.set(true);
    this.error.set(null);
    try {
      await firstValueFrom(this.api.deletePairInfoToken(tokenName));
      return true;
    } catch (e) {
      this.error.set(e as Error);
      return false;
    } finally {
      this.loading.set(false);
    }
  }

  toAppModel(entity: ClientDto): AppClient {
    return {
      ...entity,
      id: entity.clientId,
      name: `${entity.clientId}`,
      search: `${entity.clientId}`,
      _authorizedGrantTypes: entity.authorizedGrantTypes?.reduce((a: Record<string, boolean>, c: string) => {
            a[c] = true;
            return a;
          }, {}),
      _dynamic_registration: entity.additionalInformation?.['dynamic_registration'] === 'true',
    };
  }
}
