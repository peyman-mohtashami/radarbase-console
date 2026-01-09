import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import {Observable} from 'rxjs';

import {SourceDataService} from './source-data.service';
import {AppSourceData} from "../models/source-data";
import {SelectedEntities, SelectedEntitiesService} from '../../../../services/selected-entities.service';
import {tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class SourceDataListResolver implements Resolve<AppSourceData[]> {
  private entityService = inject(SourceDataService);
  private selectedEntitiesService = inject(SelectedEntitiesService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppSourceData[]> {
    return this.entityService.getWithQuery(route.queryParams).pipe(
      tap(() => {
        this.selectedEntitiesService.clearSelected([SelectedEntities.ORGANIZATION, SelectedEntities.PROJECT, SelectedEntities.SUBJECT, SelectedEntities.CLIENT]);
      })
    );
  }
}
