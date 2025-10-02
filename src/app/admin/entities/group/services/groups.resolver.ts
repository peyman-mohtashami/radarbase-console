import {inject, Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
} from '@angular/router';
import { Observable } from "rxjs";
import { GroupService } from './group.service';
import { AppGroup } from "../models/group";

@Injectable({ providedIn: 'root' })
export class GroupsResolver implements Resolve<AppGroup[]> {
  private entityService = inject(GroupService);

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<AppGroup[]> | Promise<AppGroup[]> | AppGroup[] {
    const projectName = route.parent?.parent?.params['projectId'];
    console.log('!!!Class: GroupsResolver, Function: resolve, Line 19 projectName' , projectName);
    return this.entityService.getAll(projectName);
  }
}
