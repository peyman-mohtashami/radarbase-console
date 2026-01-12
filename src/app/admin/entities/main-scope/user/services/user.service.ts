import {inject, Injectable} from '@angular/core';

import {AppRole, AppUser, RadarRole, RadarUser} from "../models/user";
import {Observable, of} from "rxjs";
import {Params} from '@angular/router';
import {map, tap} from 'rxjs/operators';
import {ROLES} from "../../../../../shared/enums/roles";
import {BaseEntityService} from '../../../../base-entities/services/base-entity.service';
import {environment} from '../../../../../../environments/environment';
import {UserConfigService} from './user-config.service';
import {HttpParams} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class UserService extends BaseEntityService<AppUser, RadarUser> {
  override configService = inject(UserConfigService);

  override getResourceUrl(): string {
    return `${environment.apiUrl}api/users`;
  }

  override toAppModel(entity: RadarUser): AppUser {
    const appRole = this.getAppRole(entity.roles);
    return {
      ...entity,
      _name: entity.login,
      _roles: appRole,
      _search: `${entity.login} ${entity.email} ${entity.firstName} ${entity.lastName}`
    };
  }

  override toRadarModel(entity: AppUser): RadarUser {
    const roles = this.getRadarRoles(entity._roles);
    return {...entity, langKey: null, roles, authorities: []};
  }

  private getRadarRoles(appRoles: AppRole | null): RadarRole[] {
    if (!appRoles) return [];
    const roles: RadarRole[] = [];
    if (appRoles._sysAdmin) {
      roles.push({authorityName: ROLES.SYS_ADMIN});
    }
    if (appRoles._organizationAdmin) {
      appRoles._organizations?.forEach((organization) => {
        roles.push({
          authorityName: ROLES.ORGANIZATION_ADMIN,
          organizationName: organization._name,
          organizationId: +organization.id
        });
      })
    }
    if (appRoles._projectAdmin) {
      appRoles._projects?.forEach((project) => {
        roles.push({
          authorityName: ROLES.PROJECT_ADMIN,
          projectName: project._name,
          projectId: +project.id});
      })
    }
    return roles;
  }

  private getAppRole(roles: RadarRole[] | null = []): AppRole {
    const defaultAppRole: AppRole = {
      _sysAdmin: null, _organizationAdmin: null, _projectAdmin: null, _organizations: null, _projects: null
    };

    if (roles === null) return defaultAppRole;

    return roles.reduce((acc: AppRole, role: RadarRole) => {
      const authorityName = role.authorityName ?? role.authority?.name;
      if (authorityName === ROLES.SYS_ADMIN) {
        acc._sysAdmin = true;
      } else if (authorityName === ROLES.ORGANIZATION_ADMIN) {
        const organizationId = role.organizationId ?? role.organization?.id ?? '';
        const organizationName = role.organizationName ?? role.organization?.name ?? '';
        acc._organizationAdmin = true;
        acc._organizations = acc._organizations || [];
        acc._organizations.push({ id: organizationId, _name: organizationName });
      } else if (authorityName === ROLES.PROJECT_ADMIN) {
        const projectId = role.projectId ?? role.project?.id ?? '';
        const projectName = role.projectName ?? role.project?.projectName ?? '';
        acc._projectAdmin = true;
        acc._projects = acc._projects || [];
        acc._projects.push({id: projectId, _name: projectName});
      }
      return acc;
    }, defaultAppRole);
  }

  override getWithQuery(queryParams?: Params): Observable<AppUser[]> {
    const {
      pageIndex = 0,
      pageSize = 10,
      sortField = 'id',
      sortOrder = 'desc',
      ...filter
    } = queryParams ?? {};

    const process = (entities: AppUser[]) => {
      const filteredEntities = this.getFilteredEntities(entities, filter);
      const sortedEntities = this.applySorting(filteredEntities, {sortField, sortOrder});
      return this.applyPagination(sortedEntities, {pageSize, pageIndex});
    };

    if (this.CACHE_ENABLED && this.cacheLoaded) {
      this.total.set(this.cache.length);
      return of(queryParams ? process(this.cache) : this.cache);
    }

    // const url = queryParams ? `${environment.apiUrl}api/users` :`${environment.apiUrl}api/users?includeProvenance=false`;
    const url = `${environment.apiUrl}api/users?includeProvenance=false`;

    return this.http.get<RadarUser[]>(url).pipe(
      map((entities) => this.customFilter(entities)),
      map((entities) => entities.map((entity) => this.toAppModel(entity))),
      tap((entities) => {
        this.cache = entities;
        this.cacheLoaded = true;
        this.total.set(entities.length);
      }),
      map((entities) => queryParams ? process(entities) : entities)
    );
  }

  override getByKey(key: number | string): Observable<AppUser> {
    return this.http.get<RadarUser>(`${this.getResourceUrl()}/${encodeURIComponent(key)}`)
      .pipe(
        map((entity) => this.toAppModel(entity)),
        // tap((entity) => {
        //   this.cache = [entity];
        // })
      );
  }

  override convertFilterParamsToHttpParams(
    params: HttpParams,
    queryParams?: Params
  ) {
    if (queryParams?.['login'] && queryParams['login'] !== '') {
      params = params.append('login', queryParams['login']);
    }
    if (queryParams?.['email'] && queryParams['email'] !== '') {
      params = params.append('email', queryParams['email']);
    }
    if (queryParams?.['authority'] && queryParams['authority'] !== '') {
      params = params.append('authority', queryParams['authority']);
    }
    // if (
    //   queryParams &&
    //   queryParams['dateOfBirth.is'] &&
    //   queryParams['dateOfBirth.is'] !== ''
    // ) {
    //   if (isValid(parse(queryParams['dateOfBirth.is'], 'yyyy-MM-dd', new Date()))) {
    //     params = params.append('dateOfBirth.is', queryParams['dateOfBirth.is']);
    //   }
    // }
    // if (
    //   queryParams &&
    //   queryParams['enrollmentDate.from'] &&
    //   queryParams['enrollmentDate.from'] !== ''
    // ) {
    //   params = params.append(
    //     'enrollmentDate.from',
    //     queryParams['enrollmentDate.from']
    //   );
    // }
    // if (
    //   queryParams &&
    //   queryParams['enrollmentDate.to'] &&
    //   queryParams['enrollmentDate.to'] !== ''
    // ) {
    //   params = params.append(
    //     'enrollmentDate.to',
    //     queryParams['enrollmentDate.to']
    //   );
    // }
    // if (queryParams?.['groupId'] && queryParams['groupId'] !== '') {
    //   params = params.append('groupId', queryParams['groupId']);
    // }
    return params;
  }

  sendActivationEmail(entity: AppUser): Observable<void> {
    return this.http.post<void>('/managementportal/api/account/reset-activation/init', entity.login);
  }
}
