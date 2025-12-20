import {Injectable} from '@angular/core';
import {HttpParams} from "@angular/common/http";

import {AppRole, AppUser, RadarRole, RadarUser} from "../models/user";
import {Observable} from "rxjs";
import {Params} from '@angular/router';
import {map, tap} from 'rxjs/operators';
import {ROLES} from "../../../../shared/enums/roles";
import {BaseEntityService} from '../../../services/base-entity.service';
import {environment} from '../../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class UserService extends BaseEntityService<AppUser, RadarUser> {
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
    const roles: any[] = [];
    if (appRoles._sysAdmin) {
      roles.push({authorityName: ROLES.SYS_ADMIN});
    }
    if (appRoles._organizationAdmin) {
      appRoles._organizations?.forEach((organization: any) => {
        roles.push({
          authorityName: ROLES.ORGANIZATION_ADMIN,
          organizationName: organization.name,
          organizationId: organization.id
        });
      })
    }
    if (appRoles._projectAdmin) {
      appRoles._projects?.forEach((project: any) => {
        roles.push({authorityName: ROLES.PROJECT_ADMIN, projectName: project.projectName, projectId: project.id});
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
      const authorityName = role.authorityName ?? role.authority.name;
      if (authorityName === ROLES.SYS_ADMIN) {
        acc._sysAdmin = true;
      } else if (authorityName === ROLES.ORGANIZATION_ADMIN) {
        const organizationId = role.organizationId ?? role.organization.id;
        const organizationName = role.organizationName ?? role.organization.name;
        acc._organizationAdmin = true;
        acc._organizations = acc._organizations || [];
        acc._organizations.push({ id: organizationId, _name: organizationName });
      } else if (authorityName === ROLES.PROJECT_ADMIN) {
        const projectId = role.projectId ?? role.project.id;
        const projectName = role.projectName ?? role.project.projectName;
        acc._projectAdmin = true;
        acc._projects = acc._projects || [];
        acc._projects.push({id: projectId, _name: projectName});
      }
      return acc;
    }, defaultAppRole);
  }

  getAll(): Observable<AppUser[]> {
    return this.http.get<RadarUser[]>(`${environment.apiUrl}api/users?includeProvenance=false`)
      .pipe(
        map((entities) =>
          entities.map((entity) => this.toAppModel(entity))
        )
      );
  }

  override getWithQuery(queryParams: Params): Observable<AppUser[]> {
    const {params} = this.convertParamsToHttpParams(queryParams as Params);
    return this.http.get<RadarUser[]>(this.getResourceUrl(), {
      params,
      observe: 'response',
    }).pipe(
      tap(
        (res) => {
          // this.total = +(
          //   res.headers.get('x-total-count') ||
          //   res.body?.length.toString() ||
          //   '0'
          // )
          this.total.set(+(
            res.headers.get('x-total-count') ||
            res.body?.length.toString() ||
            '0'
          ))
        }
      ),
      map((res) => {
        return (res.body || []).map((entity) => this.toAppModel(entity));
      })
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
    return params;
  }

  sendActivationEmail(entity: AppUser): Observable<void> {
    return this.http.post<void>('/managementportal/api/account/reset-activation/init', entity.login);
  }
}
