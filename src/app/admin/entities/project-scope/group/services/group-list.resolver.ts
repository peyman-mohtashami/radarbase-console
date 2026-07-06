import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve,} from '@angular/router';
import {Observable} from "rxjs";
import {GroupService} from './group.service';
import {AppGroup} from "../models/group";

@Injectable({ providedIn: 'root' })
export class GroupListResolver implements Resolve<AppGroup[]> {
  private entityService = inject(GroupService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppGroup[]> {

    const projectId = route.paramMap.get('projectId');
    return this.entityService.getWithQuery(route.queryParams, projectId ?? undefined);
  }
}
