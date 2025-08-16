import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { RevisionService } from './revision.service';
import { AppRevision } from "../models/revision";

@Injectable({ providedIn: 'root' })
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
    return this.entityService.getWithQuery(route.queryParams);
  }
}
