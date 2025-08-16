import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppProject } from "../models/project";
import {ProjectService} from "./project.service";
import {AdminActions} from "../../../store/action.types";
import {tap} from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class ProjectResolver implements Resolve<AppProject> {
  constructor(
    // private router: Router,
    private entityService: ProjectService,
    private store: Store
  ) {
    console.log(20, "ProjectResolver constructor")
  }

  resolve(
    route: ActivatedRouteSnapshot,
  ): Observable<AppProject> | Promise<AppProject> | AppProject {
    return this.entityService.getByKey(route.params['id']).pipe(
        tap((entity) => {
          this.store.dispatch(
            AdminActions.projectSelected({ selectedProject: entity })
          );
        })
    );

    // console.log(20, "ProjectResolver resolve")
    //
    // return this.entityService.loaded$.pipe(
    //   mergeMap((loaded) => {
    //     if (!loaded) {
    //       return this.entityService.getAll();
    //     } else {
    //       return this.entityService.entities$;
    //     }
    //   }),
    //   map(
    //     (entities) =>
    //       entities.filter((e) => e.projectName === route.params['id'])[0]
    //   ),
    //   tap(entity => console.log(20, "ProjectResolver resolve entity", entity)),
    //   tap((entity) => {
    //     // this.store.dispatch(
    //     //   AdminActions.organizationSelected({
    //     //     selectedOrganization: entity.organization as RadarOrganizationDef,
    //     //   })
    //     // );
    //     this.store.dispatch(
    //       AdminActions.projectSelected({ selectedProject: entity })
    //     );
    //   }),
    //   first()
    // );
  }
}
