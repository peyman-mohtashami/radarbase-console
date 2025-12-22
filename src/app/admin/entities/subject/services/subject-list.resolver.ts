import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import {Observable} from 'rxjs';

import { SubjectService } from './subject.service';
import { AppSubject } from "../models/subject";
import {getSelectedProject} from '../../../services/util';

@Injectable({ providedIn: 'root' })
export class SubjectListResolver implements Resolve<AppSubject[]> {
  private entityService = inject(SubjectService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppSubject[]> {
    const project = getSelectedProject(route);
    return this.entityService.getWithQuery(route.queryParams, project?.projectName)
  }
}
