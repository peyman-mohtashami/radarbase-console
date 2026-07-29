import {inject, Injectable, signal} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {Params} from '@angular/router';
import {execute, filterItems, paginateItems, sortItems} from '../../../shared/utils/store-helpers';
import {ClientService} from './client.service';
import {ClientConfigService} from './client-config.service';
import {AppClient, ClientDto, CreateClientDto, UpdateClientDto} from '../models/client';

@Injectable({providedIn: 'root'})
export class ClientStore {
  private api = inject(ClientService);
  private configService = inject(ClientConfigService);

  readonly items = signal<AppClient[]>([]);
  readonly selected = signal<AppClient | null>(null);
  readonly total = signal<number>(0);
  readonly loading = signal(false);
  readonly error = signal<Error | null>(null);

  async getWithQuery(queryParams?: Params): Promise<boolean> {
    return await execute({
      loading: this.loading,
      error: this.error,
      action: async () => {
        const dtos = await firstValueFrom(this.api.getWithQuery());
        const all = dtos.map(dto => this.toAppModel(dto));

        const {
          pageIndex = 0,
          pageSize = this.configService.getStoredPageSize(),
          sortField = 'id',
          sortOrder = 'desc',
          ...filter
        } = queryParams ?? {};

        const filtered = filterItems(all, filter);
        const sorted = sortItems(filtered, {sortField, sortOrder});
        const paged = paginateItems(sorted, {pageSize: +pageSize, pageIndex: +pageIndex});

        this.items.set(paged);
        this.total.set(all.length);
      },
    });
  }

  async getByKey(key: string): Promise<boolean> {
    return await execute({
      loading: this.loading,
      error: this.error,
      action: async () => {
        const dto = await firstValueFrom(this.api.getByKey(key));
        const entity = this.toAppModel(dto);
        this.selected.set(entity);
      },
    });
  }

  async add(entity: CreateClientDto): Promise<boolean> {
    return await execute({
      loading: this.loading,
      error: this.error,
      action: async () => {
        await firstValueFrom(this.api.add(entity));
        await this.getWithQuery();
      }
    });
  }

  async update(entity: UpdateClientDto): Promise<boolean> {
    return await execute({
      loading: this.loading,
      error: this.error,
      action: async () => {
        const updatedEntity = await firstValueFrom(this.api.update(entity));
        await this.getWithQuery();
        this.selected.set(this.toAppModel(updatedEntity));
      }
    });
  }

  async delete(entity: AppClient): Promise<boolean> {
    return await execute({
      loading: this.loading,
      error: this.error,
      action: async () => {
        await firstValueFrom(this.api.delete(entity));
        await this.getWithQuery();
        this.selected.set(null);
      }
    });
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
