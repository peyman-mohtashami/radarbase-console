import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { RevisionService } from './revision.service';
import { AppRevision } from "../models/revision";

@Injectable({ providedIn: 'root' })
export class RevisionsResolver implements Resolve<AppRevision[]> {
  private entityService = inject(RevisionService);

  resolve(
    route: ActivatedRouteSnapshot,
  ):
    | Observable<AppRevision[]>
    | Promise<AppRevision[]>
    | AppRevision[] {
    console.log('Class: RevisionsResolver, Function: resolve, Line 21 ' , );
    return this.entityService.getWithQuery(route.queryParams);
  }
}
