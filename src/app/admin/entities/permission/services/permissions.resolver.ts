import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve,} from '@angular/router';
import {Observable} from 'rxjs';
import {AppUser} from "../../user/models/user";
import {UserService} from "../../user/services/user.service";
import {PermissionService} from './permission.service';
import {AppProject} from '../../project/models/project';
import {AppOrganization} from '../../organization/models/organization';

@Injectable({providedIn: 'root'})
export class PermissionsResolver implements Resolve<AppUser[]> {
  private entityService = inject(PermissionService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppUser[]> {
    const currentOrganization: AppOrganization = route.parent?.parent?.data['organization'] ?? route.parent?.parent?.parent?.parent?.data['organization'];
    const currentProject: AppProject = route.parent?.parent?.data['entity']

    return this.entityService.getWithQuery(route.queryParams, currentOrganization, currentProject);
  }
}
