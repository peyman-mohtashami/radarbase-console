import {inject, Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
} from '@angular/router';
import { Observable } from "rxjs";
import { GroupService } from './group.service';
import { AppGroup } from "../models/group";
import {AppProject} from '../../project/models/project';
import {SelectedEntitiesService} from '../../../services/selected-entities.service';

@Injectable({ providedIn: 'root' })
export class GroupListResolver implements Resolve<AppGroup[]> {
  private entityService = inject(GroupService);
  private selectedEntitiesService = inject(SelectedEntitiesService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppGroup[]> {
    this.selectedEntitiesService.selectedSubject.set(undefined);
    this.selectedEntitiesService.selectedClient.set(undefined);

    const project: AppProject | undefined = this.selectedEntitiesService.selectedProject();
    return this.entityService.getWithQuery(route.queryParams, project?.projectName);
  }
}
