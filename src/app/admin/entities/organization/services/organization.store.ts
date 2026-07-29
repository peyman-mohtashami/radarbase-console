import {inject, Injectable, signal} from '@angular/core';
import {AppOrganization, CreateOrganizationDto, OrganizationDto, UpdateOrganizationDto} from "../models/organization";
import {firstValueFrom} from 'rxjs';
import {OrganizationConfigService} from './organization-config.service';
import {Params} from '@angular/router';
import {OrganizationService} from './organization.service';
import {execute, filterItems, paginateItems, sortItems} from '../../../shared/utils/store-helpers';

@Injectable({providedIn: 'root'})
export class OrganizationStore {
  private api = inject(OrganizationService);
  private configService = inject(OrganizationConfigService);

  readonly items = signal<AppOrganization[]>([]);
  readonly selected = signal<AppOrganization | null>(null);
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

  async add(entity: CreateOrganizationDto): Promise<boolean> {
    return await execute({
      loading: this.loading,
      error: this.error,
      action: async () => {
        await firstValueFrom(this.api.add(entity));
        await this.getWithQuery();
      }
    });
  }

  async update(entity: UpdateOrganizationDto): Promise<boolean> {
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

  async delete(entity: AppOrganization): Promise<boolean> {
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

  toAppModel(entity: OrganizationDto): AppOrganization {
    return {
      ...entity,
      search: `${entity.name} ${entity.description} ${entity.location}`,
    };
  }
}
