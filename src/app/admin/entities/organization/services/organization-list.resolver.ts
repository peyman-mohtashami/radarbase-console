import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {OrganizationStore} from './organization.store';

@Injectable({providedIn: 'root'})
export class OrganizationListResolver implements Resolve<void> {
  private store = inject(OrganizationStore);

  async resolve(route: ActivatedRouteSnapshot) {
    await this.store.getAll();
    this.store.applyQueryParams(route.queryParams);
  }
}
