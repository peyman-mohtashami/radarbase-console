import {inject, Injectable, signal} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {Params} from '@angular/router';
import {execute} from '../../../shared/utils/store-helpers';
import {UserService} from '../../user/services/user.service';
import {AppUser, UserDto} from '../../user/models/user';
import {UserStore} from '../../user/services/user.store';

@Injectable({providedIn: 'root'})
export class PermissionStore {
  private api = inject(UserService);
  private userStore = inject(UserStore)
  // private configService = inject(SubjectConfigService);

  readonly items = signal<AppUser[]>([]);
  readonly selected = signal<AppUser | null>(null);
  readonly total = signal<number>(0);
  readonly loading = signal(false);
  readonly error = signal<Error | null>(null);

  queryParams = signal<Params | undefined>(undefined);

  async getWithQuery(queryParams: Params): Promise<boolean> {
    this.queryParams.set(queryParams);
    return await execute({
      loading: this.loading,
      error: this.error,
      action: async () => {
        const response = await firstValueFrom(this.api.getWithQuery(queryParams));
        const subjects = (response.body ?? []).map((dto: UserDto) => this.userStore.toAppModel(dto));
        const total = response.headers.get('X-Total-Count');
        this.items.set(subjects);
        this.total.set(total ? +total : 0);
      },
    });
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

