import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { concatMap, Observable, tap } from 'rxjs';
import { QueryParams } from '@ngrx/data';

import { SubjectService } from './subject.service';
import { select, Store } from "@ngrx/store";
import { project } from '../../../store/admin.selectors';
import { filter, mergeMap } from "rxjs/operators";
import { AppSubject } from "../models/subject";

@Injectable({ providedIn: 'root' })
export class SubjectsResolver implements Resolve<AppSubject[]> {
  constructor(private entityService: SubjectService, private store: Store) {
    console.log(5, "SubjectsResolver constructor")
  }

  resolve(
    route: ActivatedRouteSnapshot,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    state: RouterStateSnapshot
  ):
    | Observable<AppSubject[]>
    | Promise<AppSubject[]>
    | AppSubject[] {
    console.log(5, "SubjectsResolver resolve")
    return this.store.pipe(
      select(project),
      filter((project) => !!project),
      mergeMap(() => this.entityService.getWithQuery(route.queryParams)),
      tap(entities => console.log(5, "SubjectsResolver resolve entities", entities)
        // )
        // return this.entityService.getWithQuery(route.queryParams).pipe(tap(entities => console.log(3, "GroupsResolver resolve entities", entities)
      ));
    // const params: QueryParams = { ...route.queryParams };
    // const parentEntityName: string = route.parent?.parent?.params['id'];
    // if (parentEntityName) {
    //   params['parentEntityName'] = parentEntityName;
    // }
    // return this.store.select(project).pipe(
    //   filter((p) => !!p),
    //   tap((p) => console.log(p)),
    //   concatMap(() => this.entityService.getWithQuery(route.queryParams))
    //
    //
    // );
    // return this.entityService.getWithQuery(route.queryParams).pipe(tap(entities => console.log(5, "SubjectsResolver resolve entities", entities)));
  }
}
