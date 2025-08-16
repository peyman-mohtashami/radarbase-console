import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, tap } from "rxjs";
// import { first, mergeMap } from 'rxjs/operators';
// import { ProjectEntityService } from '../store/services/project.entity.service';
import { AppProject } from "../models/project";
import {ProjectService} from "./project.service";

@Injectable({ providedIn: 'root' })
export class ProjectsResolver implements Resolve<AppProject[]> {
  // constructor(private entityService: ProjectEntityService) {
  constructor(private entityService: ProjectService) {
    console.log(2, "ProjectsResolver constructor")
  }

  resolve(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    route: ActivatedRouteSnapshot,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    state: RouterStateSnapshot
  ):
    | Observable<AppProject[]>
    | Promise<AppProject[]>
    | AppProject[] {
    return this.entityService.getWithQuery(route.queryParams);

  //   console.log(2, "ProjectsResolver resolve")
  //
  //   return this.entityService.loaded$.pipe(
  //     mergeMap((loaded) => {
  //       if (!loaded) {
  //         return this.entityService.getAll();
  //       } else {
  //         return this.entityService.entities$;
  //       }
  //     }),
  //     tap(entities => console.log(2, "ProjectsResolver resolve entities", entities)),
  //     first()
  //   );
  }
}
