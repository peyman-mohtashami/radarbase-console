import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

import {AppRole, AppUser, RadarRole, RadarUser} from "../models/user";
import {Observable} from "rxjs";
import {Params} from '@angular/router';
import {map, tap} from 'rxjs/operators';
import {DEFAULT_PAGE_SIZE} from '../../../consts/entities';

@Injectable({providedIn: 'root'})
export class PermissionService {
  private http = inject(HttpClient);

  private readonly resourceUrl = 'api/users';
  total = 0;

  private toAppModel(entity: RadarUser): AppUser {
    const appRole = this.getAppRole(entity.roles);
    return {
      ...entity,
      _name: entity.login,
      _roles: appRole,
      _search: `${entity.login} ${entity.email} ${entity.firstName} ${entity.lastName}`
    };
  }

  private toRadarModel(entity: AppUser): RadarUser {
    const roles = this.getRadarRoles(entity._roles);
    return {...entity, _roles: undefined, langKey: undefined, roles, authorities: []};
  }

  private getRadarRoles(appRoles: AppRole | undefined): RadarRole[] {
    if (!appRoles) return [];
    const roles: any[] = [];
    if (appRoles._sysAdmin) {
      roles.push({authorityName: 'ROLE_SYS_ADMIN'});
    }
    if (appRoles._organizationAdmin) {
      appRoles._organizations?.forEach((organization: any) => {
        roles.push({
          authorityName: 'ROLE_ORGANIZATION_ADMIN',
          organizationName: organization.name,
          organizationId: organization.id
        });
      })
    }
    if (appRoles._projectAdmin) {
      appRoles._projects?.forEach((project: any) => {
        roles.push({authorityName: 'ROLE_PROJECT_ADMIN', projectName: project.projectName, projectId: project.id});
      })
    }
    return roles;
  }

  private getAppRole(roles: RadarRole[] = []) {
    return roles?.reduce((acc: AppRole, role: RadarRole) => {
      const authorityName = role.authorityName ?? role.authority.name;
      if (authorityName === 'ROLE_SYS_ADMIN') {
        acc._sysAdmin = true;
      } else if (authorityName === 'ROLE_ORGANIZATION_ADMIN') {
        const organizationId = role.organizationId ?? role.organization.id;
        const organizationName = role.organizationName ?? role.organization.name;
        acc._organizationAdmin = true;
        acc._organizations = acc._organizations || [];
        acc._organizations.push({ id: organizationId, name: organizationName });
      } else if (authorityName === 'ROLE_PROJECT_ADMIN') {
        const projectId = role.projectId ?? role.project.id;
        const projectName = role.projectName ?? role.project.projectName;
        acc._projectAdmin = true;
        acc._projects = acc._projects || [];
        acc._projects.push({id: projectId, name: projectName});
      }
      return acc;
    }, {})
  }

  getAll(): Observable<AppUser[]> {
    return this.http.get<RadarUser[]>(`${this.resourceUrl}?includeProvenance=false`)
      .pipe(
        map((entities) =>
          entities.map((entity) => this.toAppModel(entity))
        )
      );
  }

  // getWithQuery(queryParams?: Params | string): Observable<AppUser[]> {
  //   const {params} = this.convertParamsToHttpParams(queryParams as Params);
  //   return this.http.get<RadarUser[]>(this.resourceUrl, {
  //     params,
  //     observe: 'response',
  //   }).pipe(
  //     tap(
  //       (res) => {
  //         this.total = +(
  //           res.headers.get('x-total-count') ||
  //           res.body?.length.toString() ||
  //           '0'
  //         )
  //       }
  //     ),
  //     map((res) => {
  //       return (res.body || []).map((entity) => this.toAppModel(entity));
  //     })
  //   );
  // }

  add(entity: AppUser): Observable<AppUser> {
    return this.http.post<RadarUser>(this.resourceUrl, this.toRadarModel(entity))
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  getByKey(key: number | string): Observable<AppUser> {
    return this.http.get<RadarUser>(`${this.resourceUrl}/${encodeURIComponent(key)}`)
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  update(update: AppUser): Observable<AppUser> {
    return this.http.put<RadarUser>(this.resourceUrl, this.toRadarModel(update))
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  delete(entity: AppUser): Observable<void> {
    return this.http.delete<void>(
      `${this.resourceUrl}/${encodeURIComponent(entity._name)}`
    );
  }

  // private convertParamsToHttpParams(queryParams: Params): {
  //   params: HttpParams;
  //   parentEntityName: string;
  // } {
  //   let params = new HttpParams();
  //   params = params.append(
  //     'size',
  //     queryParams?.['pageSize'] || DEFAULT_PAGE_SIZE
  //   );
  //   params = params.append('page', queryParams?.['pageIndex'] || '0');
  //   if (
  //     queryParams?.['sortField'] &&
  //     queryParams['sortField'] !== '' &&
  //     queryParams?.['sortOrder'] &&
  //     queryParams['sortOrder'] !== ''
  //   ) {
  //     params = params.append(
  //       'sort',
  //       queryParams['sortField'] + ',' + queryParams['sortOrder']
  //     );
  //   } else {
  //     params = params.append('sort', 'id' + ',' + 'desc');
  //   }
  //   // params = this.convertFilterParamsToHttpParams(params, queryParams);
  //   return {params, parentEntityName: queryParams?.['parentEntityName']};
  // }

  // private convertFilterParamsToHttpParams(
  //   params: HttpParams,
  //   queryParams?: Params
  // ) {
  //   if (queryParams?.['login'] && queryParams['login'] !== '') {
  //     params = params.append('login', queryParams['login']);
  //   }
  //   if (queryParams?.['email'] && queryParams['email'] !== '') {
  //     params = params.append('email', queryParams['email']);
  //   }
  //   return params;
  // }
}
