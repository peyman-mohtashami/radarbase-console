import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve,} from '@angular/router';
import {Observable} from 'rxjs';

import {SubjectService} from './subject.service';
import {AppSubject} from "../models/subject";

@Injectable({ providedIn: 'root' })
export class SubjectListResolver implements Resolve<AppSubject[]> {
  private entityService = inject(SubjectService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppSubject[]> {

    this.entityService.clearCache();

    const projectId = route.paramMap.get('projectId');
    return this.entityService.getWithQuery(route.queryParams, projectId ?? undefined);
  }
}
