import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve,} from '@angular/router';
import {Observable} from "rxjs";
import {AppProject} from "../models/project";
import {ProjectService} from "./project.service";
import {AppOrganization} from '../../organization/models/organization';
import {SelectedEntities, SelectedEntitiesService} from '../../../../services/selected-entities.service';

@Injectable({ providedIn: 'root' })
export class ProjectListResolver implements Resolve<AppProject[]> {
  private entityService = inject(ProjectService);
  private selectedEntitiesService = inject(SelectedEntitiesService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppProject[]> {
    const organizationInRoute = route.pathFromRoot.find(route => route.data['organization']);
    if (!organizationInRoute) {
      this.selectedEntitiesService.clearSelected([SelectedEntities.ORGANIZATION, SelectedEntities.PROJECT, SelectedEntities.SUBJECT, SelectedEntities.CLIENT]);
    }
    this.selectedEntitiesService.clearSelected([SelectedEntities.PROJECT]);
    const organization: AppOrganization | undefined = this.selectedEntitiesService.getSelected().organization();
    return this.entityService.getWithQuery(route.queryParams, organization?._name);
  }
}
