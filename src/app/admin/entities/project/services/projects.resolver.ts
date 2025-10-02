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
export class ProjectsResolver implements Resolve<AppProject[]> {
  private entityService = inject(ProjectService);

  resolve(route: ActivatedRouteSnapshot):
    | Observable<AppProject[]>
    | Promise<AppProject[]>
    | AppProject[] {
    console.log('Class: ProjectsResolver, Function: resolve, Line 19 route.data' , route.data);
    const organization: AppOrganization = route.data['organization'];
    // Find the closest ancestor that actually carries organizationId in its own params
    // let cursor: ActivatedRouteSnapshot | null = route;
    // while (cursor && !('organizationId' in cursor.params)) {
    //   cursor = cursor.parent;
    // }
    // const organizationId = cursor?.paramMap.get('organizationId') ?? undefined;
    return this.entityService.getAll(organization.name); //organizationId);
  }
}
