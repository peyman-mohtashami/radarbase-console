import {inject, Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
} from '@angular/router';
import { Observable } from "rxjs";
import { GroupService } from './group.service';
import { AppGroup } from "../models/group";
import {AppProject} from '../../project/models/project';

@Injectable({ providedIn: 'root' })
export class GroupsResolver implements Resolve<AppGroup[]> {
  private entityService = inject(GroupService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppGroup[]> {
    const currentProject: AppProject | undefined = route.parent?.parent?.data['entity'];
    return this.entityService.getWithQuery(route.queryParams, currentProject?.projectName);
  }
}
