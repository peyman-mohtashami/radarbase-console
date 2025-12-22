import {inject, Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
} from '@angular/router';
import { Observable } from "rxjs";
import { GroupService } from './group.service';
import { AppGroup } from "../models/group";
import {AppProject} from '../../project/models/project';
import {getSelectedProject} from '../../../services/util';

@Injectable({ providedIn: 'root' })
export class GroupListResolver implements Resolve<AppGroup[]> {
  private entityService = inject(GroupService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppGroup[]> {
    const project: AppProject | undefined = getSelectedProject(route);
    return this.entityService.getWithQuery(route.queryParams, project?.projectName);
  }
}
