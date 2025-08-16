import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, tap } from "rxjs";

import { SourceService } from './source.service';
import { select, Store } from "@ngrx/store";
import { project } from "../../../store/admin.selectors";
import { filter, mergeMap } from "rxjs/operators";
import { AppSource } from "../models/source";

@Injectable({ providedIn: 'root' })
export class SourcesResolver implements Resolve<AppSource[]> {
  constructor(private entityService: SourceService, private store: Store) {
    console.log(6, "SourcesResolver constructor")
  }

  resolve(
    route: ActivatedRouteSnapshot,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    state: RouterStateSnapshot
  ):
    | Observable<AppSource[]>
    | Promise<AppSource[]>
    | AppSource[] {
    console.log(6, "SourcesResolver resolve")
    return this.store.pipe(
      select(project),
      filter((project) => !!project),
      mergeMap(() => this.entityService.getWithQuery(route.queryParams)),
      tap(entities => console.log(6, "SourcesResolver resolve entities", entities))
    );
    // return this.entityService.getWithQuery(route.queryParams).pipe(
    //   tap(entities => console.log(6, "SourcesResolver resolve entities", entities))
    // );
  }
}
