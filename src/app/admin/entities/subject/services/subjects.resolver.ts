import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import {Observable} from 'rxjs';

import { SubjectService } from './subject.service';
import { AppSubject } from "../models/subject";

@Injectable({ providedIn: 'root' })
export class SubjectsResolver implements Resolve<AppSubject[]> {
  private entityService = inject(SubjectService);

  resolve(
    route: ActivatedRouteSnapshot,
  ):
    | Observable<AppSubject[]>
    | Promise<AppSubject[]>
    | AppSubject[] {
    const projectName = route.parent?.parent?.params['projectId'];
    console.log('Class: SubjectsResolver, Function: resolve, Line 22 projectName' , projectName);
    return this.entityService.getWithQuery(projectName, route.queryParams)
  }
}
