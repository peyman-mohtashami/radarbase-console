import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve,} from '@angular/router';
import {Observable} from 'rxjs';
import {AppUser} from "../../user/models/user";
import {PermissionService} from './permission.service';
import {SelectedEntitiesService} from '../../../../services/selected-entities.service';

@Injectable({providedIn: 'root'})
export class PermissionListResolver implements Resolve<AppUser[]> {
  private entityService = inject(PermissionService);
  private selectedEntitiesService = inject(SelectedEntitiesService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppUser[]> {
    const organization = this.selectedEntitiesService.selectedOrganization();
    const project = this.selectedEntitiesService.selectedProject();

    return this.entityService.getWithQuery(route.queryParams, organization, project);
  }
}
