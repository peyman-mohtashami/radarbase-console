import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import {Observable} from 'rxjs';

import { SubjectService } from './subject.service';
import { AppSubject } from "../models/subject";
import {SelectedEntitiesService} from '../../../services/selected-entities.service';

@Injectable({ providedIn: 'root' })
export class SubjectListResolver implements Resolve<AppSubject[]> {
  private entityService = inject(SubjectService);
  private selectedEntitiesService = inject(SelectedEntitiesService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppSubject[]> {
    this.selectedEntitiesService.selectedSubject.set(undefined);
    this.selectedEntitiesService.selectedClient.set(undefined);

    this.entityService.clearCache();

    const project = this.selectedEntitiesService.selectedProject();
    return this.entityService.getWithQuery(route.queryParams, project?.projectName)
  }
}
