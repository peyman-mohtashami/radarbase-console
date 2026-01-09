import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from "rxjs";
import {AppOrganization} from "../models/organization";
import {OrganizationService} from "./organization.service";
import {SelectedEntities, SelectedEntitiesService} from '../../../../services/selected-entities.service';
import {tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class OrganizationListResolver implements Resolve<AppOrganization[]> {
  private entityService = inject(OrganizationService);
  private selectedEntitiesService = inject(SelectedEntitiesService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppOrganization[]> {
    return this.entityService.getWithQuery(route.queryParams).pipe(
      tap(() => {
        this.selectedEntitiesService.clearSelected([SelectedEntities.ORGANIZATION, SelectedEntities.PROJECT, SelectedEntities.SUBJECT, SelectedEntities.CLIENT]);
      })
    );
  }
}
