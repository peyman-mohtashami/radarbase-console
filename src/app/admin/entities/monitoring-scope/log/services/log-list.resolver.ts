import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';

import {LogService} from './log.service';
import {AppLog} from "../models/log";
import {SelectedEntities, SelectedEntitiesService} from '../../../../services/selected-entities.service';
import {tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class LogListResolver implements Resolve<AppLog[]> {
  private entityService = inject(LogService);
  private selectedEntitiesService = inject(SelectedEntitiesService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppLog[]> {
    return this.entityService.getWithQuery(route.queryParams).pipe(
      tap(() => {
        this.selectedEntitiesService.clearSelected([SelectedEntities.ORGANIZATION, SelectedEntities.PROJECT, SelectedEntities.SUBJECT, SelectedEntities.CLIENT]);
      })
    );
  }
}
