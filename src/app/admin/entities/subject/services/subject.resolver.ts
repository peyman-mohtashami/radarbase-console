import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, tap } from "rxjs";

// import { RadarSubjectDef } from '@rb/models';
import { SubjectService } from './subject.service';
// import { AdminActions } from "../../../store/action.types";
// import { Store } from "@ngrx/store";
import { AppSubject } from "../models/subject";

@Injectable({ providedIn: 'root' })
export class SubjectResolver implements Resolve<AppSubject> {
  constructor(private entityService: SubjectService,
              // private store: Store
  ) {
    console.log(50, "SubjectResolver constructor")
  }

  resolve(
    route: ActivatedRouteSnapshot,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    state: RouterStateSnapshot
  ): Observable<AppSubject> | Promise<AppSubject> | AppSubject {
    console.log(50, "SubjectResolver resolve")
    return this.entityService.getByKey(route.params['id'])
    // return this.entityService.getByKey(route.params['id']).pipe(
    //   tap(entity => console.log(50, "SubjectResolver resolve entity", entity)),
    //   tap((entity) => {
    //       this.store.dispatch(
    //         AdminActions.subjectSelected({ selectedSubject: entity })
    //       );
    //     })
    // );
  }
}
