import {inject, Injectable, signal} from '@angular/core';
import {AppProject, CreateProjectDto, ProjectDto, UpdateProjectDto} from "../models/project";
import {firstValueFrom} from 'rxjs';
import {Params} from '@angular/router';
import {ProjectConfigService} from './project-config.service';
import {ProjectService} from './project.service';
import {execute, filterItems, paginateItems, sortItems} from '../../../shared/utils/store-helpers';

@Injectable({providedIn: 'root'})
export class ProjectStore {
  private api = inject(ProjectService);
  private configService = inject(ProjectConfigService);

  readonly items = signal<AppProject[]>([]);
  readonly selected = signal<AppProject | null>(null);
  readonly total = signal<number>(0);
  readonly loading = signal(false);
  readonly error = signal<Error | null>(null)

  async getWithQuery(queryParams?: Params, organizationName?: string): Promise<boolean> {
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

  async add(entity: CreateProjectDto): Promise<boolean> {
    return await execute({
      loading: this.loading,
      error: this.error,
      action: async () => {
        await firstValueFrom(this.api.add(entity));
        await this.getWithQuery();
      }
    });
  }

  async update(entity: UpdateProjectDto): Promise<boolean> {
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

  async delete(entity: AppProject): Promise<boolean> {
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

  toAppModel(entity: ProjectDto): AppProject {
    return {
      ...entity,
      name: entity.projectName,
      search: `${entity.projectName} ${entity.description} ${entity.location}`,
    };
  }
}

