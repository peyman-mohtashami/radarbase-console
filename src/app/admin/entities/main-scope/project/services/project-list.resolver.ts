import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable} from "rxjs";
import { AppProject } from "../models/project";
import {ProjectService} from "./project.service";
import {AppOrganization} from '../../organization/models/organization';
import {SelectedEntitiesService} from '../../../../services/selected-entities.service';

@Injectable({ providedIn: 'root' })
export class ProjectListResolver implements Resolve<AppProject[]> {
  private entityService = inject(ProjectService);
  private selectedEntitiesService = inject(SelectedEntitiesService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppProject[]> {
    const organizationInRoute = route.pathFromRoot.find(route => route.data['organization']);
    if (!organizationInRoute) {
      this.selectedEntitiesService.clearAllSelected();
    }
    const organization: AppOrganization | undefined = this.selectedEntitiesService.selectedOrganization();
    return this.entityService.getWithQuery(route.queryParams, organization?._name);
  }
}
