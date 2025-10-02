import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from "rxjs";

import { AppSource } from "../models/source";
import {SourceService} from './source.service';

@Injectable({ providedIn: 'root' })
export class SourcesResolver implements Resolve<AppSource[]> {
  private entityService = inject(SourceService);

  resolve(
    route: ActivatedRouteSnapshot,
  ):
    | Observable<AppSource[]>
    | Promise<AppSource[]>
    | AppSource[] {
    const projectName = route.parent?.parent?.params['projectId'];
    return this.entityService.getWithQuery(projectName, route.queryParams)
  }
}
