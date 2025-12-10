import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';

import {LogService} from './log.service';
import {AppLog} from "../models/log";

@Injectable({providedIn: 'root'})
export class LogsResolver implements Resolve<AppLog[]> {
  private entityService = inject(LogService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppLog[]> {
    return this.entityService.getWithQuery(route.queryParams);
  }
}
