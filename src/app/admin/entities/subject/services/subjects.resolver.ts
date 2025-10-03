import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import {Observable} from 'rxjs';

import { SubjectService } from './subject.service';
import { AppSubject } from "../models/subject";
import {AppProject} from '../../project/models/project';

@Injectable({ providedIn: 'root' })
export class SubjectsResolver implements Resolve<AppSubject[]> {
  private entityService = inject(SubjectService);

  resolve(
    route: ActivatedRouteSnapshot,
  ):
    | Observable<AppSubject[]>
    | Promise<AppSubject[]>
    | AppSubject[] {
    const currentProject: AppProject = route.parent?.parent?.data['entity'];
    return this.entityService.getWithQuery(currentProject.projectName, route.queryParams)
  }
}
