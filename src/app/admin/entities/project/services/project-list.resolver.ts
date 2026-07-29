import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve,} from '@angular/router';
import {ProjectStore} from './project.store';
import {OrganizationStore} from '../../organization/services/organization.store';

@Injectable({providedIn: 'root'})
export class ProjectListResolver implements Resolve<void> {
  private projectStore = inject(ProjectStore);
  private organizationStore = inject(OrganizationStore);

  async resolve(route: ActivatedRouteSnapshot) {
    const organization = this.organizationStore.selected();
    const res = await this.projectStore.getWithQuery(route.queryParams);
    if (res) this.projectStore.selected.set(null);
  }
}
