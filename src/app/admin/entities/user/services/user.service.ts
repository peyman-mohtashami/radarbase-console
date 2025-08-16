import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { BaseEntityService } from '../../../services/base.entity.service';
// import {RadarRole, RadarUser} from "@rb/models";
import {AppUser} from "../models/user";
import {Observable} from "rxjs";
import {RadarUser} from '../../../../shared/models/radar-users.model';
import {RadarRole} from '../../../../shared/models/auth.model';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseEntityService<
  RadarUser,
  AppUser
> {
  public override resourceUrl = 'api/users';

  constructor(http: HttpClient) {
    super(http);
  }

  sendActivationEmail(entity: AppUser): Observable<void> {
    console.log(entity);
    return this.http.post<void>('api/account/reset-activation/init', entity.login);
  }

  override toAppModel(entity: RadarUser): AppUser {
    const organizations = this.getOrganizationsWithAdminRole(entity);
    const projects = this.getProjectsWithAdminRole(entity);
    const roles = {
      _sysAdmin: this.isSysAdmin(entity),
      _organizationAdmin: !!organizations && organizations.length > 0,
      _projectAdmin: !!projects && projects.length > 0,
      _organizations: organizations,
      _projects: projects,
    };
    return { ...entity, name: entity.login, _roles: roles };
  }
  override toRadarModel(entity: AppUser): RadarUser {
    console.log('Class: UserDataService, Function: toRadarModel, Line 39 entity' , entity);
    const roles: RadarRole[] = [];
    if (entity._roles?._sysAdmin) {
      roles.push({
        authorityName: 'ROLE_SYS_ADMIN',
      });
    } else {
      if (entity._roles?._organizationAdmin) {
        entity._roles._organizations.forEach((organization: any) => {
          roles.push({
            authorityName: 'ROLE_ORGANIZATION_ADMIN',
            projectName: null,
            projectId: null,
            organizationName: organization.name,
            organizationId: organization.id ? +organization.id : null,
          });
        });
      }
      if (entity._roles?._projectAdmin) {
        entity._roles._projects?.forEach((project: any) => {
          roles.push({
            authorityName: 'ROLE_PROJECT_ADMIN',
            projectName: project.name,
            projectId: project.id ? +project.id : null,
            organizationName: null,
            organizationId: null,
          });
        });
      }
    }
    console.log('Class: UserDataService, Function: toRadarModel, Line 69 entity._roles' , entity._roles);
    // delete entity._roles;
    const { ['_roles']: _roles, ...user } = entity;
    // return { ...entity, roles, _roles: undefined };
    return { ...user, roles };
  }

  isSysAdmin(entity: RadarUser): boolean {
    const roles = entity.roles?.filter(
      (r) => r.role === 'SYS_ADMIN' || r.authorityName === 'ROLE_SYS_ADMIN'
    );
    return !!roles && roles?.length > 0;
  }

  getOrganizationsWithAdminRole(entity: RadarUser) {
    return (
      entity?.roles
        ?.filter(
          (r) =>
            r.authorityName === 'ROLE_ORGANIZATION_ADMIN' ||
            r.authority?.name === 'ROLE_ORGANIZATION_ADMIN'
        )
        .map((r) => {
          return {
            name: r.organizationName || r.organization?.name,
            id: r.organizationId || (r.organization ? r.organization.id : ''),
          };
        }) || []
    );
  }

  getProjectsWithAdminRole(entity: RadarUser) {
    return (
      entity.roles
        ?.filter(
          (r) =>
            r.authorityName === 'ROLE_PROJECT_ADMIN' ||
            r.authority?.name === 'ROLE_PROJECT_ADMIN'
        )
        .map((r) => {
          return {
            name: r.projectName || r.project?.projectName,
            id: r.projectId || (r.project ? r.project.id : ''),
          };
        }) || []
    );
  }
}
