import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { LogService } from './log.service';
import { AppLog } from "../models/log";

@Injectable({ providedIn: 'root' })
export class LogsResolver implements Resolve<AppLog[]> {
  constructor(private entityService: LogService) {}

  resolve(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    route: ActivatedRouteSnapshot,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    state: RouterStateSnapshot
  ): Observable<AppLog[]> | Promise<AppLog[]> | AppLog[] {
    return this.entityService.getWithQuery();
  }
}
