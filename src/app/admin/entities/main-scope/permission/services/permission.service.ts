import {inject, Injectable} from '@angular/core';

import {Observable} from "rxjs";
import {Params} from '@angular/router';
import {map, tap} from 'rxjs/operators';
import {AppUser, RadarUser} from '../../user/models/user';
import {AppOrganization} from '../../organization/models/organization';
import {AppProject} from '../../project/models/project';
import {UserService} from '../../user/services/user.service';
import {UserConfigService} from '../../user/services/user-config.service';

@Injectable({providedIn: 'root'})
export class PermissionService extends UserService {
  override configService = inject(UserConfigService);

  override getWithQuery(queryParams: Params, currentOrganization?: AppOrganization, currentProject?: AppProject): Observable<AppUser[]> {
    const {params} = this.convertParamsToHttpParams(queryParams as Params);
    return this.http.get<RadarUser[]>(this.getResourceUrl(), {
      params,
      observe: 'response',
    }).pipe(
      tap(
        (res) => {
          this.total.set(+(
            res.headers.get('x-total-count') ||
            res.body?.length.toString() ||
            '0'
          ))
        }
      ),
      map((res) => {
        const entities = (res.body || []).map((entity) => this.toAppModel(entity));
        return this.getUsersWithPermission(entities, currentOrganization, currentProject)
      })
    );
  }

  private getUsersWithPermission(
    entities: AppUser[],
    currentOrganization?: AppOrganization,
    currentProject?: AppProject
  ): AppUser[] {
    return entities.filter(e => {
      if (e._roles?._sysAdmin) {
        return true;
      }
      if (currentOrganization) {
        if (e._roles?._organizationAdmin) {
          const organization = e._roles._organizations?.find(o =>
            o._name === currentOrganization?.name);
          if (organization) {
            return true;
          }
        }
      }
      if (currentProject) {
        if (e._roles?._projectAdmin) {
          const project = e._roles._projects?.find(p =>
            p._name === currentProject?.projectName);
          if (project) {
            return true;
          }
        }
      }
      return false;
    });
  }
}
