import {computed, ErrorHandler, inject, Injectable, signal} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {Params} from '@angular/router';
import {AppRole, AppUser, CreateUserDto, RoleDto, UpdateUserDto, UserDto} from '../models/user';
import {UserService} from './user.service';
import {ROLES} from '../../../../shared/enums/roles';
import {UserConfigService} from './user-config.service';
import {PageEvent} from '@angular/material/paginator';
import {RbSort, TableElement} from '../../../shared/models/table.model';
import {
  FilterEvent
} from '../../../shared/components/data-table-filter/data-table-filter.component';

@Injectable({providedIn: 'root'})
export class UserStore {
  private api = inject(UserService);
  private configService = inject(UserConfigService);
  private errorHandler = inject(ErrorHandler);

  readonly allItems = signal<AppUser[]>([]);
  readonly items = signal<AppUser[]>([]);
  readonly selected = signal<AppUser | null>(null);
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
    this.filter.set(filter);
    await this.getWithQuery();
  }

  async getAll(): Promise<boolean> {
    this.loading.set(true);
    try {
      const dtos = await firstValueFrom(this.api.getAll());
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

  async getWithQuery(): Promise<boolean> {
    console.log('Class: UserStore, Function: getWithQuery, Line 78 ' , this.params());
    this.loading.set(true);
    try {
      const response = await firstValueFrom(this.api.getWithQuery(this.params()));
      console.log('Class: UserStore, Function: getWithQuery, Line 82 response' , response);
      const sourceData = (response.body ?? []).map((dto: UserDto) => this.toAppModel(dto));
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
      if (queryParams[name] !== undefined) {
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

  async add(entity: CreateUserDto): Promise<boolean> {
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

  async update(entity: UpdateUserDto): Promise<boolean> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const updatedEntity = await firstValueFrom(this.api.update(entity));
      await this.getWithQuery();
      if (this.selected()) {
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

  async delete(entity: AppUser): Promise<boolean> {
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

  async sendActivationEmail(entity: AppUser): Promise<boolean> {
    this.loading.set(true);
    this.error.set(null);
    try {
      await firstValueFrom(this.api.sendActivationEmail(entity));
      return true;
    } catch
      (e) {
      this.error.set(e as Error);
      return false;
    } finally {
      this.loading.set(false);
    }
  }

  toAppModel(entity: UserDto): AppUser {
    return {
      ...entity,
      name: entity.login,
      search: `${entity.login}`,
      _roles: this.toAppRole(entity.roles),
    };
  }

  private toAppRole(roles: RoleDto[] | undefined = []): AppRole {
    const defaultAppRole: AppRole = {
      _sysAdmin: false, _organizationAdmin: false, _projectAdmin: false, _organizations: [], _projects: []
    };
    return roles.reduce((acc: AppRole, role: RoleDto) => {
      const authorityName = role.authorityName ?? role.authority?.name;
      if (authorityName === ROLES.SYS_ADMIN) {
        acc._sysAdmin = true;
      } else if (authorityName === ROLES.ORGANIZATION_ADMIN) {
        const organizationId = role.organizationId ?? role.organization?.id ?? '';
        const organizationName = role.organizationName ?? role.organization?.name ?? '';
        acc._organizationAdmin = true;
        acc._organizations = acc._organizations || [];
        acc._organizations.push({ id: Number(organizationId), name: organizationName });
      } else if (authorityName === ROLES.PROJECT_ADMIN) {
        const projectId = role.projectId ?? role.project?.id ?? '';
        const projectName = role.projectName ?? role.project?.projectName ?? '';
        acc._projectAdmin = true;
        acc._projects = acc._projects || [];
        acc._projects.push({id: Number(projectId), projectName: projectName});
      }
      return acc;
    }, defaultAppRole);
  }
}

