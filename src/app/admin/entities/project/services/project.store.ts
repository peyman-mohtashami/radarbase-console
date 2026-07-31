import {computed, ErrorHandler, inject, Injectable, signal} from '@angular/core';
import {AppProject, CreateProjectDto, ProjectDto, UpdateProjectDto} from "../models/project";
import {firstValueFrom} from 'rxjs';
import {Params} from '@angular/router';
import {ProjectConfigService} from './project-config.service';
import {ProjectService} from './project.service';
import {filterItems, paginateItems, sortItems} from '../../../shared/utils/store-helpers';
import {PageEvent} from '@angular/material/paginator';
import {RbSort, TableElement} from '../../../base-entities/models/table.model';
import {
  FilterEvent
} from '../../../base-entities/containers/entity-list-page/data-table-filter/data-table-filter.component';
import {OrganizationStore} from '../../organization/services/organization.store';

@Injectable({providedIn: 'root'})
export class ProjectStore {
  private api = inject(ProjectService);
  private configService = inject(ProjectConfigService);
  private errorHandler = inject(ErrorHandler);
  private organizationStore = inject(OrganizationStore);

  readonly allItems = signal<AppProject[]>([]);
  readonly selected = signal<AppProject | null>(null);
  readonly total = signal<number>(0);
  readonly loading = signal(false);
  readonly error = signal<Error | null>(null)

  readonly page = signal<PageEvent>({
    pageIndex: 0,
    pageSize: this.configService.getStoredPageSize(),
    length: 0,
  });
  readonly sort = signal<RbSort>({sortField: 'id', sortOrder: 'desc'});
  readonly filter = signal<FilterEvent>({});

  readonly items = computed<AppProject[]>(() => {
    const organization = this.organizationStore.selected();
    const organizationFiltered = organization ? this.allItems().filter(i => i.organization.id === organization.id) : this.allItems();
    const filtered = filterItems(organizationFiltered, this.filter() as Record<string, string | undefined>);
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

  async add(entity: CreateProjectDto): Promise<boolean> {
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

  async update(entity: UpdateProjectDto): Promise<boolean> {
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

  async delete(entity: AppProject): Promise<boolean> {
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

  toAppModel(entity: ProjectDto): AppProject {
    return {
      ...entity,
      name: entity.projectName,
      search: `${entity.projectName} ${entity.description} ${entity.location}`,
    };
  }
}

