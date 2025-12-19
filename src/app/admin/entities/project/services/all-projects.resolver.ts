import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable} from "rxjs";
import { AppProject } from "../models/project";
import {ProjectService} from "./project.service";
import {AppOrganization} from '../../organization/models/organization';

@Injectable({ providedIn: 'root' })
export class AllProjectsResolver implements Resolve<AppProject[]> {
  private entityService = inject(ProjectService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppProject[]> {
    const organization: AppOrganization | undefined = route.data['organization'] ?? route.parent?.parent?.data['organization'];
    return this.entityService.getWithQuery(undefined, organization?.name);
  }
}
