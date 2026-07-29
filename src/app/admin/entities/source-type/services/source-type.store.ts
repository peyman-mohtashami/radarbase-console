import {inject, Injectable, signal} from '@angular/core';
import {AppSourceType, CreateSourceTypeDto, SourceTypeDto, UpdateSourceTypeDto} from "../models/source-type";
import {firstValueFrom} from 'rxjs';
import {SourceTypeConfigService} from './source-type-config.service';
import {SourceTypeService} from './source-type.service';
import {Params} from '@angular/router';
import {execute, filterItems, paginateItems, sortItems} from '../../../shared/utils/store-helpers';

@Injectable({providedIn: 'root'})
export class SourceTypeStore {
  private api = inject(SourceTypeService);
  private configService = inject(SourceTypeConfigService);

  readonly items = signal<AppSourceType[]>([]);
  readonly selected = signal<AppSourceType | null>(null);
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

  async add(entity: CreateSourceTypeDto): Promise<boolean> {
    return await execute({
      loading: this.loading,
      error: this.error,
      action: async () => {
        await firstValueFrom(this.api.add(entity));
        await this.getWithQuery();
      }
    });
  }

  async update(entity: UpdateSourceTypeDto): Promise<boolean> {
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

  async delete(entity: AppSourceType): Promise<boolean> {
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

  toAppModel(entity: SourceTypeDto): AppSourceType {
    return {
      ...entity,
      search: `${entity.producer} ${entity.model} ${entity.catalogVersion} ${entity.description} ${entity.name}`,
    };
  }
}
