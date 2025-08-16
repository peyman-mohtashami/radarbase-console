import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { RevisionService } from './revision.service';
import { QueryParams } from '@ngrx/data';
import { AppRevision } from "../models/revision";

@Injectable()
export class RevisionsResolver implements Resolve<AppRevision[]> {
  constructor(private entityService: RevisionService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    state: RouterStateSnapshot
  ):
    | Observable<AppRevision[]>
    | Promise<AppRevision[]>
    | AppRevision[] {
    const params: QueryParams = { ...route.queryParams };
    const parentEntityName: string = route.parent?.parent?.params['id'];
    console.log(parentEntityName);
    if (parentEntityName) {
      params['parentEntityName'] = parentEntityName;
    }
    return this.entityService.getWithQuery(params);
  }
}
