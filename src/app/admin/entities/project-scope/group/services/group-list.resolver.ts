import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve,} from '@angular/router';
import {Observable} from "rxjs";
import {GroupService} from './group.service';
import {AppGroup} from "../models/group";
import {AppProject} from '../../../main-scope/project/models/project';
import {SelectedEntities, SelectedEntitiesService} from '../../../../services/selected-entities.service';

@Injectable({ providedIn: 'root' })
export class GroupListResolver implements Resolve<AppGroup[]> {
  private entityService = inject(GroupService);
  private selectedEntitiesService = inject(SelectedEntitiesService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppGroup[]> {
    this.selectedEntitiesService.clearSelected([SelectedEntities.SUBJECT, SelectedEntities.CLIENT]);

    const project: AppProject | undefined = this.selectedEntitiesService.getSelected().project()
    console.log('Class: GroupListResolver, Function: resolve, Line 22 project' , project);
    return this.entityService.getWithQuery(route.queryParams, project?.projectName);
  }
}
