import {inject, Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
} from '@angular/router';
import { Observable } from "rxjs";
import { GroupService } from './group.service';
import { AppGroup } from "../models/group";
import {AppProject} from '../../project/models/project';
import {getCurrentProject} from '../../../services/util';

@Injectable({ providedIn: 'root' })
export class GroupFullListResolver implements Resolve<AppGroup[]> {
  private entityService = inject(GroupService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppGroup[]> {
    const project: AppProject | undefined = getCurrentProject(route);
    return this.entityService.getWithQuery(undefined, project?.projectName);
  }
}
