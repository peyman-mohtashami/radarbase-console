import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from "rxjs";

import {ConfigService} from './config.service';
import {AppConfig} from "../models/config";

@Injectable({ providedIn: 'root' })
export class ConfigListResolver implements Resolve<AppConfig[]> {
  private entityService = inject(ConfigService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppConfig[]> {
    this.entityService.clearCache();

    const clientId = route.paramMap.get('clientId');
    const projectId = route.paramMap.get('projectId');
    const subjectId = route.paramMap.get('subjectId');
    return this.entityService.getWithQuery(
      route.queryParams,
      clientId ?? undefined,
      projectId ?? undefined,
      subjectId ?? undefined,
    );
  }
}
