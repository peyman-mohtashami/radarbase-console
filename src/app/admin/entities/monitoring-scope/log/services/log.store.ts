import {inject, Injectable, signal} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {Params} from '@angular/router';
import {execute, filterItems, paginateItems, sortItems} from '../../../../shared/utils/store-helpers';
import {LogService} from './log.service';
import {LogConfigService} from './log-config.service';
import {AppLog, LogDto} from '../models/log';

@Injectable({providedIn: 'root'})
export class LogStore {
  private api = inject(LogService);
  private configService = inject(LogConfigService);

  readonly items = signal<AppLog[]>([]);
  readonly selected = signal<AppLog | null>(null);
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

  // async getByKey(key: string): Promise<boolean> {
  //   return await execute({
  //     loading: this.loading,
  //     error: this.error,
  //     action: async () => {
  //       const dto = await firstValueFrom(this.api.getByKey(key));
  //       const entity = this.toAppModel(dto);
  //       this.selected.set(entity);
  //     },
  //   });
  // }
  //
  // async add(entity: CreateOrganizationDto): Promise<boolean> {
  //   return await execute({
  //     loading: this.loading,
  //     error: this.error,
  //     action: async () => {
  //       await firstValueFrom(this.api.add(entity));
  //       await this.getWithQuery();
  //     }
  //   });
  // }

  // async update(entity: UpdateLogDto): Promise<boolean> {
  //   return await execute({
  //     loading: this.loading,
  //     error: this.error,
  //     action: async () => {
  //       const updatedEntity = await firstValueFrom(this.api.update(entity));
  //       await this.getWithQuery();
  //       this.selected.set(this.toAppModel(updatedEntity));
  //     }
  //   });
  // }

  // async delete(entity: AppOrganization): Promise<boolean> {
  //   return await execute({
  //     loading: this.loading,
  //     error: this.error,
  //     action: async () => {
  //       await firstValueFrom(this.api.delete(entity));
  //       await this.getWithQuery();
  //       this.selected.set(null);
  //     }
  //   });
  // }

  toAppModel(entity: LogDto): AppLog {
    return {
      ...entity,
      search: `${entity.name}`,
    };
  }
}
