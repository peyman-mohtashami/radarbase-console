import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve,} from '@angular/router';
import {Observable} from "rxjs";
import {AppProject} from "../models/project";
import {ProjectService} from "./project.service";

@Injectable({providedIn: 'root'})
export class ProjectListResolver implements Resolve<AppProject[]> {
  private entityService = inject(ProjectService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppProject[]> {
    const organizationId = route.paramMap.get('organizationId');
    return this.entityService.getWithQuery(route.queryParams, organizationId ?? undefined);
  }
}
