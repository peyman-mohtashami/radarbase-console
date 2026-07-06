import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve,} from '@angular/router';
import {Observable} from "rxjs";

import {AppSource} from "../models/source";
import {SourceService} from './source.service';

@Injectable({ providedIn: 'root' })
export class SourceListResolver implements Resolve<AppSource[]> {
  private entityService = inject(SourceService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppSource[]> {

    this.entityService.clearCache();

    const projectId = route.paramMap.get('projectId');
    return this.entityService.getWithQuery(route.queryParams, projectId ?? undefined);
  }
}
