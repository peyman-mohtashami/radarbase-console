import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve,} from '@angular/router';
import {Observable} from "rxjs";
import {GroupService} from './group.service';
import {AppGroup} from "../models/group";
import {AppProject} from '../../../main-scope/project/models/project';
import {SelectedEntities, SelectedEntitiesService} from '../../../../services/selected-entities.service';
import {tap} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GroupListResolver implements Resolve<AppGroup[]> {
  private entityService = inject(GroupService);
  private selectedEntitiesService = inject(SelectedEntitiesService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppGroup[]> {

    const project: AppProject | undefined = this.selectedEntitiesService.getSelected().project()
    return this.entityService.getWithQuery(route.queryParams, project?.projectName).pipe(
      tap(() => {
        this.selectedEntitiesService.clearSelected([SelectedEntities.SUBJECT, SelectedEntities.CLIENT]);
      })
    );
  }
}
