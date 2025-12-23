import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from "rxjs";

import {ConfigService} from './config.service';
import {AppConfig} from "../models/config";
import {getSelectedClient, getSelectedProject, getSelectedSubject} from '../../../services/util';

@Injectable({ providedIn: 'root' })
export class ConfigListResolver implements Resolve<AppConfig[]> {
  private entityService = inject(ConfigService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppConfig[]> {
    this.entityService.clearCache();
    return this.entityService.getWithQuery(
      route.queryParams,
      getSelectedClient(route)!.clientId,
      getSelectedProject(route)?.projectName,
      getSelectedSubject(route)?.login
    );
  }
}
