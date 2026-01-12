import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve,} from '@angular/router';
import {Observable} from "rxjs";
import {AppProject} from "../models/project";
import {ProjectService} from "./project.service";
import {AppOrganization} from '../../organization/models/organization';
import {SelectedEntities, SelectedEntitiesService} from '../../../../services/selected-entities.service';
import {tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ProjectListResolver implements Resolve<AppProject[]> {
  private entityService = inject(ProjectService);
  private selectedEntitiesService = inject(SelectedEntitiesService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppProject[]> {
    const organization: AppOrganization | undefined = this.selectedEntitiesService.getSelected().organization();
    const organizationInRoute = route.pathFromRoot.find(route => route.data['organization']);
    return this.entityService.getWithQuery(route.queryParams, organizationInRoute ? organization?._name : undefined).pipe(
      tap(() => {
        if (!organizationInRoute) {
          this.selectedEntitiesService.clearSelected([SelectedEntities.ORGANIZATION, SelectedEntities.PROJECT, SelectedEntities.SUBJECT, SelectedEntities.CLIENT]);
        } else {
          this.selectedEntitiesService.clearSelected([SelectedEntities.PROJECT]);
        }
      })
    );
  }
}
