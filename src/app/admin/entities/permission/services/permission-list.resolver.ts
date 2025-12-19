import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve,} from '@angular/router';
import {Observable} from 'rxjs';
import {AppUser} from "../../user/models/user";
import {PermissionService} from './permission.service';
import {getCurrentOrganization, getCurrentProject} from '../../../services/util';

@Injectable({providedIn: 'root'})
export class PermissionListResolver implements Resolve<AppUser[]> {
  private entityService = inject(PermissionService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppUser[]> {
    const organization = getCurrentOrganization(route);
    const project = getCurrentProject(route);

    return this.entityService.getWithQuery(route.queryParams, organization, project);
  }
}
