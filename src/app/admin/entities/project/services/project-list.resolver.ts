import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve,} from '@angular/router';
import {ProjectStore} from './project.store';

@Injectable({providedIn: 'root'})
export class ProjectListResolver implements Resolve<void> {
  private store = inject(ProjectStore);

  async resolve(route: ActivatedRouteSnapshot) {
    await this.store.getAll();
    this.store.applyQueryParams(route.queryParams);
  }
}
