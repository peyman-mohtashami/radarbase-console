import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';

import {LogService} from './log.service';
import {AppLog} from "../models/log";
import {SelectedEntitiesService} from '../../../../services/selected-entities.service';

@Injectable({providedIn: 'root'})
export class LogListResolver implements Resolve<AppLog[]> {
  private entityService = inject(LogService);
  private selectedEntitiesService = inject(SelectedEntitiesService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppLog[]> {
    this.selectedEntitiesService.clearAllSelected();
    return this.entityService.getWithQuery(route.queryParams);
  }
}
