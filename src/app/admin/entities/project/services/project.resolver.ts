import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AppProject } from "../models/project";
import {ProjectService} from "./project.service";

@Injectable({ providedIn: 'root' })
export class ProjectResolver implements Resolve<AppProject> {
  private entityService = inject(ProjectService);

  resolve(
    route: ActivatedRouteSnapshot,
  ): Observable<AppProject> | Promise<AppProject> | AppProject {
    const projectId = route.paramMap.get('id');
    return this.entityService.getByKey(projectId as string);
  }
}
