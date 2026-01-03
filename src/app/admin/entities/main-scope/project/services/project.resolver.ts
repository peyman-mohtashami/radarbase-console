import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve,} from '@angular/router';
import {Observable} from 'rxjs';
import {AppProject} from "../models/project";
import {ProjectService} from "./project.service";
import {SelectedEntities, SelectedEntitiesService} from '../../../../services/selected-entities.service';
import {tap} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProjectResolver implements Resolve<AppProject> {
  private entityService = inject(ProjectService);
  private selectedEntitiesService = inject(SelectedEntitiesService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppProject> {
    const projectId = route.paramMap.get('id');
    return this.entityService.getByKey(projectId as string).pipe(
      tap(project => this.selectedEntitiesService.setSelected(SelectedEntities.PROJECT, project))
    );
  }
}
