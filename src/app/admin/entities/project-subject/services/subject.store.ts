import {computed, ErrorHandler, inject, Injectable, signal} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {Params} from '@angular/router';
import {SubjectService} from './subject.service';
import {AppSubject, CreateSubjectDto, SubjectDto, UpdateSubjectDto} from '../models/subject';
import {SubjectConfigService} from './subject-config.service';
import {PageEvent} from '@angular/material/paginator';
import {RbSort, TableElement} from '../../../base-entities/models/table.model';
import {
  FilterEvent
} from '../../../base-entities/containers/entity-list-page/data-table-filter/data-table-filter.component';
import {SelectionModel} from '@angular/cdk/collections';

@Injectable({providedIn: 'root'})
export class SubjectStore {
  private api = inject(SubjectService);
  private configService = inject(SubjectConfigService);
  private errorHandler = inject(ErrorHandler);

  readonly items = signal<AppSubject[]>([]);
  readonly selected = signal<AppSubject | null>(null);
  readonly total = signal<number>(0);
  readonly loading = signal(false);
  readonly error = signal<Error | null>(null);
  selection = new SelectionModel<AppSubject>(true, []);

  readonly page = signal<PageEvent>({
    pageIndex: 0,
    pageSize: this.configService.getStoredPageSize(),
    length: 0,
  });
  readonly sort = signal<RbSort>({sortField: 'id', sortOrder: 'desc'});
  readonly filter = signal<FilterEvent>({});

  readonly params = computed<Params>(() => ({
    page: this.page().pageIndex,
    size: this.page().pageSize,
    sort: `${this.sort().sortField},${this.sort().sortOrder}`,
    ...this.filter(),
  }));

  async setPage(page: PageEvent) {
    this.configService.setStoredPageSize(page.pageSize);
    this.page.set(page);
    await this.getWithQuery();
  }

  async toggleSort({name, sortable}: TableElement) {
    if (!sortable) return;
    this.sort.update(({sortOrder}) => ({
      sortField: name,
      sortOrder: sortOrder === 'asc' ? 'desc' : 'asc',
    }));
    await this.getWithQuery();
  }

  async setFilter(filter: FilterEvent) {
    Object.keys(filter).forEach(key => {
      if (!filter[key]) delete filter[key];
    });
    this.filter.set(filter);
    await this.getWithQuery();
  }

  async getWithQuery(): Promise<boolean> {
    this.loading.set(true);
    try {
      const response = await firstValueFrom(this.api.getWithQuery(this.params()));
      const sourceData = (response.body ?? []).map((dto: SubjectDto) => this.toAppModel(dto));
      const total = response.headers.get('X-Total-Count');
      this.items.set([...sourceData]);
      this.total.set(total ? +total : 0);
      return true;
    } catch (e) {
      this.errorHandler.handleError(e);
      return false;
    } finally {
      this.loading.set(false);
    }
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
      if (queryParams[name]) {
        filter[name] = queryParams[name];
      }
      return filter;
    }, {});
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

  async add(entity: CreateSubjectDto): Promise<boolean> {
    this.loading.set(true);
    this.error.set(null);
    try {
      await firstValueFrom(this.api.add(entity));
      await this.getWithQuery();
      return true;
    } catch (e) {
      this.error.set(e as Error);
      return false;
    } finally {
      this.loading.set(false);
    }
  }

  async update(entity: UpdateSubjectDto): Promise<boolean> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const updatedEntity = await firstValueFrom(this.api.update(entity));
      await this.getWithQuery();
      if (this.selected()
      ) {
        this.selected.set(this.toAppModel(updatedEntity));
      }
      return true;
    } catch
      (e) {
      this.error.set(e as Error);
      return false;
    } finally {
      this.loading.set(false);
    }
  }

  async delete(entity: AppSubject): Promise<boolean> {
    this.loading.set(true);
    this.error.set(null);
    try {
      await firstValueFrom(this.api.delete(entity));
      await this.getWithQuery();
      this.selected.set(null);
      return true;
    } catch (e) {
      this.error.set(e as Error);
      return false;
    } finally {
      this.loading.set(false);
    }
  }

  async discontinue(entity: UpdateSubjectDto): Promise<boolean> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const updatedEntity = await firstValueFrom(this.api.discontinue(entity));
      await this.getWithQuery();
      if (this.selected()
      ) {
        this.selected.set(this.toAppModel(updatedEntity));
      }
      return true;
    } catch
      (e) {
      this.error.set(e as Error);
      return false;
    } finally {
      this.loading.set(false);
    }
  }

  async addSubjectsToGroup(groupName: string, subjects: { login?: string; id?: number }[]): Promise<boolean> {
    this.loading.set(true);
    this.error.set(null);
    try {
      await firstValueFrom(this.api.addSubjectsToGroup(groupName, subjects));
      this.selection.clear();
      await this.getWithQuery();
      return true;
    } catch
      (e) {
      this.error.set(e as Error);
      return false;
    } finally {
      this.loading.set(false);
    }
  }

  toAppModel(entity: SubjectDto): AppSubject {
    return {
      ...entity,
      name: entity.login,
      search: `${entity.login}`,
    };
  }
}

