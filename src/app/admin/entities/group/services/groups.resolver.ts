import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, tap } from "rxjs";
import { GroupService } from './group.service';
import { select, Store } from "@ngrx/store";
import { filter, mergeMap } from "rxjs/operators";
import { project } from "../../../store/admin.selectors";
import { AppGroup } from "../models/group";

@Injectable({ providedIn: 'root' })
export class GroupsResolver implements Resolve<AppGroup[]> {
  constructor(private entityService: GroupService, private store: Store) {
    console.log(3, "GroupsResolver constructor")
  }

  //!
  resolve(
    route: ActivatedRouteSnapshot,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    state: RouterStateSnapshot
  ): Observable<AppGroup[]> | Promise<AppGroup[]> | AppGroup[] {
    console.log(3, "GroupsResolver resolve")
    return this.store.pipe(
      select(project),
      filter((project) => !!project),
      mergeMap(() => this.entityService.getWithQuery(route.queryParams)),
      tap(entities => console.log(3, "GroupsResolver resolve entities", entities)
    // )
    // return this.entityService.getWithQuery(route.queryParams).pipe(tap(entities => console.log(3, "GroupsResolver resolve entities", entities)
    ));
  }
}
