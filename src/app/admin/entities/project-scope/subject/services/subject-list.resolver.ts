import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve,} from '@angular/router';
import {Observable} from 'rxjs';

import {SubjectService} from './subject.service';
import {AppSubject} from "../models/subject";
import {SelectedEntities, SelectedEntitiesService} from '../../../../services/selected-entities.service';
import {tap} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SubjectListResolver implements Resolve<AppSubject[]> {
  private entityService = inject(SubjectService);
  private selectedEntitiesService = inject(SelectedEntitiesService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppSubject[]> {

    this.entityService.clearCache();

    const project = this.selectedEntitiesService.getSelected().project();
    return this.entityService.getWithQuery(route.queryParams, project?.projectName).pipe(
      tap(() => {
        this.selectedEntitiesService.clearSelected([SelectedEntities.SUBJECT, SelectedEntities.CLIENT]);
      })
    )
  }
}
