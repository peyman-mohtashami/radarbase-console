import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { ConfigService } from './config.service';
import {AppConfig} from "../models/config";

@Injectable({ providedIn: 'root' })
export class ConfigResolver implements Resolve<AppConfig> {
  constructor(private entityService: ConfigService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    state: RouterStateSnapshot
  ): Observable<AppConfig> | Promise<AppConfig> | AppConfig {
    return this.entityService.getByKey(route.params['id']);
  }
}
