import {computed, ErrorHandler, inject, Injectable, signal} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {Params} from '@angular/router';
import {filterItems, paginateItems, sortItems} from '../../../shared/utils/store-helpers';
import {UserService} from '../../user/services/user.service';
import {AppUser, UpdateUserDto, UserDto} from '../../user/models/user';
import {UserStore} from '../../user/services/user.store';
import {PageEvent} from '@angular/material/paginator';
import {RbSort, TableElement} from '../../../shared/models/table.model';
import {FilterEvent} from '../../../shared/components/data-table-filter/data-table-filter.component';
import {PermissionConfigService} from './permission-config.service';
import {OrganizationStore} from '../../organization/services/organization.store';
import {ProjectStore} from '../../project/services/project.store';

@Injectable({providedIn: 'root'})
export class PermissionStore {
  private api = inject(UserService);
  private userStore = inject(UserStore);
  private projectStore = inject(ProjectStore);
  private organizationStore = inject(OrganizationStore);
  private configService = inject(PermissionConfigService);
  private errorHandler = inject(ErrorHandler);

  readonly allItems = signal<AppUser[]>([]);
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

  readonly items = computed<AppUser[]>(() => {
    const project = this.projectStore.selected() ?? undefined;
    const organization = this.organizationStore.selected() ?? undefined;
    const usersWithPermission = this.getUsersWithPermission(this.allItems(), organization?.name, project?.projectName);
    const filtered = filterItems(usersWithPermission, this.filter() as Record<string, string | undefined>);
    const sorted = sortItems(filtered, this.sort());
    const {pageIndex, pageSize} = this.page();
    return paginateItems(sorted, {pageIndex, pageSize});
  });

  async setPage(page: PageEvent) {
    this.configService.setStoredPageSize(page.pageSize);
    this.page.set(page);
  }

  async toggleSort({name, sortable}: TableElement) {
    if (!sortable) return;
    this.sort.update(({sortOrder}) => ({
      sortField: name,
      sortOrder: sortOrder === 'asc' ? 'desc' : 'asc',
    }));
  }

  async setFilter(filter: FilterEvent) {
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
      const dtos = await firstValueFrom(this.api.getAll());
      this.allItems.set(dtos.map(dto => this.userStore.toAppModel(dto)));
      this.total.set(dtos.length);
      return true;
    } catch (e) {
      this.errorHandler.handleError(e);
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
      await this.getAll();
      if (this.selected()) {
        this.selected.set(this.userStore.toAppModel(updatedEntity));
      }
      return true;
    } catch (e) {
      this.error.set(e as Error);
      return false;
    } finally {
      this.loading.set(false);
    }
  }

  private getUsersWithPermission(
    entities: AppUser[],
    currentOrganization?: string,
    currentProject?: string
  ): AppUser[] {
    return entities.filter(e => {
      if (e._roles?._sysAdmin) {
        return true;
      }
      if (currentOrganization) {
        if (e._roles?._organizationAdmin) {
          const organization = e._roles._organizations?.find(o =>
            o.name === currentOrganization);
          // o._name === currentOrganization?.name);
          if (organization) {
            return true;
          }
        }
      }
      if (currentProject) {
        if (e._roles?._projectAdmin) {
          const project = e._roles._projects?.find(p =>
            p.projectName === currentProject);
          // p._name === currentProject?.projectName);
          if (project) {
            return true;
          }
        }
      }
      return false;
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
  // async add(entity: CreateUserDto): Promise<boolean> {
  //   return await execute({
  //     loading: this.loading,
  //     error: this.error,
  //     action: async () => {
  //       await firstValueFrom(this.api.add(entity));
  //       await this.getWithQuery(this.queryParams()!);
  //     }
  //   });
  // }
  //
  // async update(entity: UpdateUserDto): Promise<boolean> {
  //   return await execute({
  //     loading: this.loading,
  //     error: this.error,
  //     action: async () => {
  //       const updatedEntity = await firstValueFrom(this.api.update(entity));
  //       await this.getWithQuery(this.queryParams()!);
  //       this.selected.set(this.toAppModel(updatedEntity));
  //     }
  //   });
  // }
  //
  // async delete(entity: AppUser): Promise<boolean> {
  //   return await execute({
  //     loading: this.loading,
  //     error: this.error,
  //     action: async () => {
  //       await firstValueFrom(this.api.delete(entity));
  //       await this.getWithQuery(this.queryParams()!);
  //       this.selected.set(null);
  //     }
  //   });
  // }
  //
  // toAppModel(entity: UserDto): AppUser {
  //   return {
  //     ...entity,
  //     name: entity.login,
  //     search: `${entity.login}`,
  //     // _roles: entity.roles,
  //   };
  // }

  // override toAppModel(entity: UserDto): AppUser {
  //   const appRole = this.getAppRole(entity.roles);
  //   return {
  //     ...entity,
  //     _name: entity.login,
  //     _roles: appRole,
  //     _search: `${entity.login} ${entity.email} ${entity.firstName} ${entity.lastName}`
  //   };
  // }
  //
  // override toRadarModel(entity: AppUser): UserDto {
  //   const roles = this.getRadarRoles(entity._roles);
  //   return {...entity, langKey: null, roles, authorities: []};
  // }
  //
  // private getRadarRoles(appRoles: AppRole | null): RoleDto[] {
  //   if (!appRoles) return [];
  //   const roles: RoleDto[] = [];
  //   if (appRoles._sysAdmin) {
  //     roles.push({authorityName: ROLES.SYS_ADMIN});
  //   }
  //   if (appRoles._organizationAdmin) {
  //     appRoles._organizations?.forEach((organization) => {
  //       roles.push({
  //         authorityName: ROLES.ORGANIZATION_ADMIN,
  //         organizationName: organization.name,
  //         organizationId: +organization.id!
  //       });
  //     })
  //   }
  //   if (appRoles._projectAdmin) {
  //     appRoles._projects?.forEach((project) => {
  //       roles.push({
  //         authorityName: ROLES.PROJECT_ADMIN,
  //         projectName: project.name,
  //         projectId: +project.id!});
  //     })
  //   }
  //   return roles;
  // }
  //
  // private getAppRole(roles: RoleDto[] | null = []): AppRole {
  //   const defaultAppRole: AppRole = {
  //     _sysAdmin: null, _organizationAdmin: null, _projectAdmin: null, _organizations: null, _projects: null
  //   };
  //
  //   if (roles === null) return defaultAppRole;
  //
  //   return roles.reduce((acc: AppRole, role: RoleDto) => {
  //     const authorityName = role.authorityName ?? role.authority?.name;
  //     if (authorityName === ROLES.SYS_ADMIN) {
  //       acc._sysAdmin = true;
  //     } else if (authorityName === ROLES.ORGANIZATION_ADMIN) {
  //       const organizationId = role.organizationId ?? role.organization?.id ?? '';
  //       const organizationName = role.organizationName ?? role.organization?.name ?? '';
  //       acc._organizationAdmin = true;
  //       acc._organizations = acc._organizations || [];
  //       acc._organizations.push({ id: Number(organizationId), name: organizationName });
  //     } else if (authorityName === ROLES.PROJECT_ADMIN) {
  //       const projectId = role.projectId ?? role.project?.id ?? '';
  //       const projectName = role.projectName ?? role.project?.projectName ?? '';
  //       acc._projectAdmin = true;
  //       acc._projects = acc._projects || [];
  //       acc._projects.push({id: Number(projectId), projectName: projectName});
  //     }
  //     return acc;
  //   }, defaultAppRole);
  // }
}

