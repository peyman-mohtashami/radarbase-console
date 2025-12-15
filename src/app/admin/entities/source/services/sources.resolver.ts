import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from "rxjs";

import { AppSource } from "../models/source";
import {SourceService} from './source.service';
import {AppProject} from '../../project/models/project';

@Injectable({ providedIn: 'root' })
export class SourcesResolver implements Resolve<AppSource[]> {
  private entityService = inject(SourceService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppSource[]> {
    const currentProject: AppProject = route.parent?.parent?.data['entity'];
    return this.entityService.getWithQuery(route.queryParams, currentProject.projectName);
  }
}
