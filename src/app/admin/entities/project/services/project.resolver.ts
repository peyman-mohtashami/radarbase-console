import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router,} from '@angular/router';
import {AppProject} from "../models/project";
import {ProjectStore} from './project.store';

@Injectable({ providedIn: 'root' })
export class ProjectResolver implements Resolve<AppProject | null> {
  private store = inject(ProjectStore);
  private router = inject(Router);

  async resolve(route: ActivatedRouteSnapshot): Promise<AppProject | null> {
    const projectId = route.paramMap.get('projectId')!;
    await this.store.getByKey(projectId);

    const project = this.store.selected();
    //TODO
    // if (!project) await this.router.navigate(['/admin/organizations', organization, 'projects']);
    return project;
  }
}
