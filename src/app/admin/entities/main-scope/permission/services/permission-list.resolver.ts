import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve,} from '@angular/router';
import {Observable} from 'rxjs';
import {AppUser} from "../../user/models/user";
import {PermissionService} from './permission.service';

@Injectable({providedIn: 'root'})
export class PermissionListResolver implements Resolve<AppUser[]> {
  private entityService = inject(PermissionService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppUser[]> {
    const organizationId = route.paramMap.get('organizationId');
    const projectId = route.paramMap.get('projectId');
    return this.entityService.getWithQuery(route.queryParams, organizationId ?? undefined, projectId ?? undefined);
  }
}
