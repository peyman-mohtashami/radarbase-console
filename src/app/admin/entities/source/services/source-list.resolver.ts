import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from "rxjs";

import { AppSource } from "../models/source";
import {SourceService} from './source.service';
import {getSelectedProject} from '../../../services/util';

@Injectable({ providedIn: 'root' })
export class SourceListResolver implements Resolve<AppSource[]> {
  private entityService = inject(SourceService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppSource[]> {
    const project = getSelectedProject(route)
    return this.entityService.getWithQuery(route.queryParams, project?.projectName);
  }
}
