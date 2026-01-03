import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {AppSourceType} from "../models/source-type";
import {SourceTypeService} from './source-type.service';
import {SelectedEntities, SelectedEntitiesService} from '../../../../services/selected-entities.service';

@Injectable({providedIn: 'root'})
export class SourceTypeListResolver implements Resolve<AppSourceType[]> {
  private entityService = inject(SourceTypeService);
  private selectedEntitiesService = inject(SelectedEntitiesService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppSourceType[]> {
    this.selectedEntitiesService.clearSelected([SelectedEntities.ORGANIZATION, SelectedEntities.PROJECT, SelectedEntities.SUBJECT, SelectedEntities.CLIENT]);
    // this.entityService.clearCache();
    return this.entityService.getWithQuery(route.queryParams);
  }
}
