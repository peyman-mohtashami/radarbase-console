import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve,} from '@angular/router';
import {Observable} from "rxjs";

import {AppSource} from "../models/source";
import {SourceService} from './source.service';
import {SelectedEntities, SelectedEntitiesService} from '../../../../services/selected-entities.service';
import {tap} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SourceListResolver implements Resolve<AppSource[]> {
  private entityService = inject(SourceService);
  private selectedEntitiesService = inject(SelectedEntitiesService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppSource[]> {

    this.entityService.clearCache();

    const project = this.selectedEntitiesService.getSelected().project();
    return this.entityService.getWithQuery(route.queryParams, project?.projectName).pipe(
      tap(() => {
        this.selectedEntitiesService.clearSelected([SelectedEntities.SUBJECT, SelectedEntities.CLIENT]);
      })
    );
  }
}
