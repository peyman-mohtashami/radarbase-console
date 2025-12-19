import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable} from "rxjs";
import { AppProject } from "../models/project";
import {ProjectService} from "./project.service";
import {AppOrganization} from '../../organization/models/organization';
import {getCurrentOrganization} from '../../../services/util';

@Injectable({ providedIn: 'root' })
export class ProjectListResolver implements Resolve<AppProject[]> {
  private entityService = inject(ProjectService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppProject[]> {
    const organization: AppOrganization | undefined = getCurrentOrganization(route);
    return this.entityService.getWithQuery(route.queryParams, organization?.name);
  }
}
